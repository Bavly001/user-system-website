import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FiArrowLeft } from 'react-icons/fi';

import APIsFunctions from './apis/apis_functions';
import Footer from './footer';

class edit_employee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
      age: '',
      address: '',
      phoneNumber: '',
      visible: false
    }
  }

  /*-------------------------------------------------------------------/Check validity function/-------------------------------------------------------------------*/
  checkValidity = () => {
    const name = this.state.name;
    const age = this.state.age;
    const address = this.state.address;
    const phoneNumber = this.state.phoneNumber;

    if (name === '' || age === '' || address === '' || phoneNumber === '') return false;
    else if (!name.match(/ /g) || name.match(/ /g).length > 1 || name.indexOf(' ') <= 0 || /\d/.test(name)) return false;
    else if (!/\d/.test(phoneNumber) || phoneNumber.includes(' ') || phoneNumber.length < 11) return false;
    else return true;
  }

  /*-------------------------------------------------------------------/Edit employee function/-------------------------------------------------------------------*/
  editEmployee = (e) => {
    const message = document.getElementById('message');
    e.preventDefault();

    if (this.checkValidity()) {
      const employee_data = {
        ...this.state,
      };

      APIsFunctions.addUser(employee_data);

      console.log("user edited successfully");
      message.innerHTML = 'Employee is edited successfully';
      message.className = 'changes-saved'
      message.style.opacity = '1';
      setInterval(() => { message.style.opacity = '0'; }, 7000);
    }

    else {
      message.innerHTML = 'Please enter a valid data';
      message.className = 'empty-field-waring'
      message.style.opacity = '1';
      setInterval(() => { message.style.opacity = '0'; }, 7000);
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate() {
    if (this.state.id !== this.props.id)
      this.setState({
        name: this.props.name,
        id: this.props.id,
        age: this.props.age,
        address: this.props.address,
        phoneNumber: this.props.phoneNumber,
        visible: this.props.visible
      });
  }

  render() {
    return (
      <div className={this.props.className} >
        <div className='employee-route employee-route flex-center flex-column' id='edit-employee'>
          <form onSubmit={this.editEmployee} className='employee-form flex-center flex-column'>
            <h1 className='title white-color'>Edit Employee</h1>
            <input
              type='text'
              placeholder='Employee Name (First Name and Last Name only)'
              required
              maxLength="25"
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
              id="phoneNumber"
            />
            <input
              type='submit'
              required
              name="submit"
              value="Save Changes"
              className='form-field white-color'
            />
            <p className='white-color delete-btn'>Delete employee</p>
            <p id='message'></p>
          </form>
          <div className='back-buttons'>
            <button className='circle-btn white-color' onClickCapture={() => window.location.reload(true)}><FiArrowLeft /></button>
            <Link to={"/"} className='circle-btn white-color'><HiHome /></Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default edit_employee;