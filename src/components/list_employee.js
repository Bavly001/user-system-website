import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
// import { TransitionGroup } from 'react-transition-group'
import AddEmployee from './add_employee';
import APIsFunctions from './apis/apis_functions';
import Loader from './Loader/loader';
import EditEmployee from './edit_employee';


import { FaUserCircle } from 'react-icons/fa';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




class list_employee extends Component {
  constructor() {
    super();
    this.state = {
      type: 'number',
      search_by: '( id )',
      users: [],
    }
  }

  /*-------------------------------------------------------------------/Get All Users/-------------------------------------------------------------------*/
  componentDidMount() {
    APIsFunctions.getAllUsers().then(res => this.setState({ users: res.data }));
    // APIsFunctions.getAllUsers().then(res => console.log(res.data));
    // APIsFunctions.getAllUsers().then(res => console.log(this.state.users));
  }

  /*-------------------------------------------------------------------/Keep Tracking Updates/-------------------------------------------------------------------*/
  trackingUpdates = (array) => {
    this.setState({ users: array });
    console.log('done');
  }
  /*-------------------------------------------------------------------/Start search functions/-------------------------------------------------------------------*/
  /*-----------------------Changing search type-----------------------*/
  changeType = (e) => {
    this.setState({ type: e.target.value })
    if (e.target.value === 'number') this.setState({ search_by: '( id )' });
    else this.setState({ search_by: '( name )' });
  }

  /*-----------------------Search filter-----------------------*/
  handleChange = (e) => {
    document.querySelectorAll('.employee-card-container').forEach((employeeCard) => {
      const search_term = e.target.value.toLowerCase();
      const employee_name = '' + employeeCard.querySelector('.employee-card').querySelector('.card-data').querySelector("p:first-child").innerHTML.replace("Name: ", '').toLowerCase();
      const employee_id = '' + employeeCard.querySelector('.employee-card').querySelector('.card-data').querySelector("p:nth-child(3)").innerHTML.replace("Id: ", '');


      if (this.state.type === 'text') {
        if (employee_name.indexOf(search_term) !== -1 || search_term === '') employeeCard.style.display = 'block';
        else employeeCard.style.display = 'none';
      }
      else {
        if (employee_id.indexOf(search_term) !== -1) employeeCard.style.display = 'block';
        else employeeCard.style.display = 'none';
      }
    })

  }
  /*-------------------------------------------------------------------/End search functions/-------------------------------------------------------------------*/

  /*-----------------------Delete user function-----------------------*/
  deleteUser = (id, name) => {
    confirmAlert({
      title: `Delete User`,
      message: `Are you sure you want to delete ${name}.`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            APIsFunctions.delUser(id)
              .then(() => {
                return APIsFunctions.getAllUsers().then(
                  res => {
                    this.setState({
                      users: res.data
                    });
                  }
                )
              });
          }
        },
        {
          label: 'No'
        }
      ]
    });
  }


  render() {
    return (
      <div className="list flex-center flex-column">
        <Loader />
        <div className="list-header flex-center flex-column">
          <h1 className="title flex-center">Employees List
            <Link to={"/"} className='circle-btn white-color'><HiHome /></Link>
          </h1>

          <div className="list-search">
            <select
              className='search-bar'
              id='search-by'
              onChange={this.changeType}>
              <option value="number" name="id">Id</option>
              <option value="text" name="name">Name</option>
            </select>
            <input
              className='search-bar'
              placeholder={'Search by ' + this.state.search_by}
              type={this.state.type}
              onChange={this.handleChange}
            />
          </div>



        </div>
        <div className='users-list flex-center'>
          {this.state.users.length > 0 ?
            this.state.users.map((employee, index) => (
              <div className="employee-card-container" key={index}>
                <div className="employee-card flex-center flex-column">
                  <FaUserCircle className='avatar white-color' />
                  {(
                    <div key={index} className='card-data'>
                      <p className='white-color'>Name: {employee.name}</p>
                      <p className='white-color'>Id:{employee.id}</p>
                      <p className='white-color'>Age: {employee.age}</p>
                      <p className='white-color'>Address: {employee.address}</p>
                      <p className='white-color'>Phone no.:{employee.phoneNumber}</p>
                    </div>
                  )}
                  <div className='card-buttons'>
                    <Link role="button" to="/edit-employee" className='circle-btn white-color'
                      onClickCapture={() => new EditEmployee().getUser(
                        employee.name,
                        employee.id,
                        employee.age,
                        employee.address,
                        employee.phoneNumber
                      )}
                    >
                      <MdModeEditOutline />
                    </Link>


                    <button className='circle-btn white-color' onClickCapture={() => this.deleteUser(employee.id, employee.name)}><MdDelete /></button>
                  </div>
                  <div className='white-glow' />
                </div>
              </div >
            ))
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default list_employee;