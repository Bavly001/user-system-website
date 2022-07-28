import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FiArrowLeft } from 'react-icons/fi';

// import axios from 'axios';

class add_employee extends Component {

  state = {
    name: '',
    age: '',
    address: '',
    phoneNumber: ''
  }

  render() {
    return (
      <div className='employee-route employee-route flex-center flex-column'>
        <form className='employee-form flex-center flex-column'>
          <h1 className='title white-color'>Add Employee</h1>
          <input
            type='text'
            placeholder='Employee Name'
            required
            maxLength="14"
            name="name"
            autoComplete="off"
            className='form-field white-color'
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
          />
          <input
            type='text'
            placeholder='Employee Address'
            required
            name="address"
            autoComplete="off"
            className='form-field white-color'
          />
          <input
            type='text'
            placeholder='Employee Phone Number'
            required
            maxLength="11"
            name="phoneNumber"
            autoComplete="off"
            className='form-field white-color'
          />
          <input
            type='submit'
            required
            name="submit"
            className='form-field white-color'
          />
          <p className='empty-field-waring'>Please fill all fields</p>
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