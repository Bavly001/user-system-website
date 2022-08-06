import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
// import { TransitionGroup } from 'react-transition-group'

import EmployeeCard from './employee_card';
import APIsFunctions from './apis/apis_functions';
import Loader from './Loader/loader';



class list_employee extends Component {
  constructor() {
    super();
    this.state = {
      type: 'number',
      search_by: '( id )',
      users: []
    }
  }

  /*-------------------------------------------------------------------/Get All Users/-------------------------------------------------------------------*/
  componentDidMount() {
    APIsFunctions.getAllUsers().then(res => { this.setState({ users: res.data }) });
  }
  
  /*-------------------------------------------------------------------/Component Keep Tracking Updates/-------------------------------------------------------------------*/
  UNSAFE_componentWillUpdate() {
    APIsFunctions.getAllUsers().then(res => { this.setState({ users: res.data }) });
    return true;
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


  render() {
    return (
      <div className="list">
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



          <div>
            {this.state.users.length > 0 ?
              this.state.users.map((employee, index) => (<EmployeeCard
                key={index}
                name={employee.name}
                id={employee.id}
                age={employee.age}
                address={employee.address}
                phoneNumber={employee.phoneNumber}
              />))
              :
              null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default list_employee;