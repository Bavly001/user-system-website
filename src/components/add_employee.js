import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FiArrowLeft } from 'react-icons/fi';

import APIsFunctions from './apis/apis_functions';
import Loader from './Loader/loader';





class add_employee extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      age: '',
      address: '',
      phoneNumber: ''
    }
  }

  /*-------------------------------------------------------------------/Add employee function/-------------------------------------------------------------------*/
  addEmployee = (e) => {
    e.preventDefault();
    const employee_data = {
      ...this.state,
    };

    APIsFunctions.addUser(employee_data)

    this.setState({
      name: '',
      age: '',
      address: '',
      phoneNumber: ''
    })

    console.log("user added successfully");
    const message = document.getElementById('message');
    message.innerHTML = 'Employee is added successfully';
    message.className = 'changes-saved'
    message.style.opacity = '1';
    setInterval(() => { message.style.opacity = '0'; }, 5000);

  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className='employee-route employee-route flex-center flex-column'>
        <Loader />
        <form onSubmit={this.addEmployee} className='employee-form flex-center flex-column'>
          <h1 className='title white-color'>Add Employee</h1>

          <input
            type='text'
            placeholder='Employee Name'
            required
            maxLength="14"
            name="name"
            autoComplete="off"
            className='form-field white-color'
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type='number'
            placeholder='Employee Age'
            required
            min="1"
            max="999"
            onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
            name="age"
            autoComplete="off"
            className='form-field white-color'
            value={this.state.age}
            onChange={this.handleChange}
          />

          <input
            type='text'
            placeholder='Employee Address'
            required
            name="address"
            autoComplete="off"
            className='form-field white-color'
            value={this.state.address}
            onChange={this.handleChange}
          />

          <input
            type='text'
            placeholder='Employee Phone Number'
            required
            maxLength="11"
            name="phoneNumber"
            autoComplete="off"
            className='form-field white-color'
            value={this.state.phoneNumber}
            onChange={this.handleChange}
          />

          <input
            type='submit'
            onClick={this.addEmployee}
            name="submit"
            className='form-field white-color'
          />

          <p id='message' className='empty-field-waring'></p>
        </form>
        <div className='back-buttons'>
          <Link to={"/list-employees"} className='circle-btn white-color'><FiArrowLeft /></Link>
          <Link to={"/"} className='circle-btn white-color'><HiHome /></Link>
        </div>
      </div>
    )
  }
}

export default add_employee;