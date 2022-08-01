import React, { Component } from 'react';
import ApisFunctions from './apis/apis_functions';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { TransitionGroup } from 'react-transition-group'
import Loader from './Loader/loader';




class list_employee extends Component {
  state = {
    type: 'number',
    search_by: '( id )'
  }


  changeType = (e) => {
    this.setState({ type: e.target.value })
    if (e.target.value === 'number') this.setState({ search_by: '( id )' });
    else this.setState({ search_by: '( name )' });
  }

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


  render() {
    return (
      <div className="list flex-center flex-column">
        <Loader/>
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



        <TransitionGroup
          className="list_employee"
          component="div"
        >
          {/* {new ApisFunctions().getAllUsers()} */}
          < ApisFunctions />

        </TransitionGroup>
      </div>
    )
  }
}

export default list_employee;