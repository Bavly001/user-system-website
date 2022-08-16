import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FiArrowLeft } from 'react-icons/fi';

import APIsFunctions from './apis/apis_functions';
import Loader from './Loader/loader';
import EmployeeCard from './employee_card';

import axios from "axios";
const UserAPIs = "http://localhost:8080/api/user"

class edit_employee extends Component {

  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      name: '',
      id: '',
      age: '',
      address: '',
      phoneNumber: ''
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

  /*-------------------------------------------------------------------/Get employee/-------------------------------------------------------------------*/
  // Get employee ID

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps)
  //   console.log(nextState)
  //   return true;
  // }


  // // UNSAFE_componentWillReceiveProps(nextProps) {
  // //   console.log(nextProps.edit_name);
  // //   console.log(nextProps.edit_id);
  // //   console.log(nextProps.edit_age);
  // //   console.log(nextProps.edit_address);
  // //   console.log(nextProps.edit_phoneNumber);


  // //   if (nextProps.edit_id !== undefined) {
  // //     axios
  // //       .get(UserAPIs + '/' + nextProps.edit_id)
  // //       // .then(res => this.setState({
  // //       //   name: res.data.name,
  // //       //   id: nextProps.edit_id,
  // //       //   age: res.data.age,
  // //       //   address: res.data.address,
  // //       //   phoneNumber: res.data.phoneNumber
  // //       // }))
  // //     this.setState({
  // //       name: nextProps.edit_name,
  // //       id: nextProps.edit_id,
  // //       age: nextProps.edit_age,
  // //       address: nextProps.edit_address,
  // //       phoneNumber: nextProps.edit_phoneNumber
  // //     })
  // //   }
  // //   else console.log('waiting to edit ...')

  // //   // axios.get(APIsFunctions + '/' + 105).then(res => console.log(res));


  // //   // if (this.props !== undefined) {
  // //   //   axios
  // //   //   .get(UserAPIs + '/' + nextProps.edit_id)
  // //   //   .then(res => this.setState({
  // //   //     name: res.data.name,
  // //   //     id:nextProps.edit_id,
  // //   //     age: res.data.age,
  // //   //     address: res.data.address,
  // //   //     phoneNumber: res.data.phoneNumber
  // //   //   }))
  // //   // }
  // //   // else console.log('waiting for edit');
  // //   // axios
  // //   //   .get(UserAPIs + '/' + nextProps.edit_id)
  // //   //   .then(res => this.setState({
  // //   //     name:res.data.name,
  // //   //     id:nextProps.edit_id,
  // //   //     age:res.data.age,
  // //   //     address:res.data.address,
  // //   //     phoneNumber:res.data.phoneNumber
  // //   //   }))
  // // }

  // // Get employee data
  // // shouldComponentUpdate(nextProps) {
  // //   console.log(nextProps.edit_id);
  // //   return true;
  // // }

  // // UNSAFE_componentWillMount() {
  // //   console.log(this.state);
  // // }

  // // componentDidUpdate() {
  // //   console.log(this.props.edit_id);
  // //   console.log(this.state);
  // // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.props.edit_id);
  //   console.log(this.state);
  //   prevState = this.state;
  //   console.log(prevState)
  //   // console.log(prevState);
  //   // this.setState({
  //   //   name: this.state.name,
  //   //     id: this.state.id,
  //   //     age: this.state.age,
  //   //     address: this.state.address,
  //   //     phoneNumber: this.state.phoneNumber
  //   // })

  // }
  // // static getDerivedStateFromProps(props, state) {
  // //   if (props.edit_id !== state.id){
  // //     return {
  // //       id: props.edit_id,
  // //       name:props.edit_name
  // //     }
  // //   }

  // //   return null;
  // // }

  // // UNSAFE_componentWillMount() {
  //   //   axios
  //   //     .get(UserAPIs + '/' + this.state.id)
  //   //     .then(res => this.setState({
  //     //       name: res.data.name,
  //     //       age: res.data.age,
  //     //       address: res.data.address,
  //     //       phoneNumber: res.data.phoneNumber
  //     //     }))
  //     // }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps);
  //   console.log(nextState);
  //   // this.setState({id: nextProps.id})

  //   // console.log(nextState.id);
  //   if (nextState.id === nextProps.edit_id) return false;
  //   else return true;
  // }


  static getDerivedStateFromProps(props, state) {
    console.log(props.edit_id)
    if (props.edit_id === state.id) return null;
    return {
      id: props.edit_id
    };

  }

  /*-------------------------------------------------------------------/Edit employee function/-------------------------------------------------------------------*/
  addEmployee = (e) => {
    const message = document.getElementById('message');
    e.preventDefault();

    if (this.checkValidity()) {
      const employee_data = {
        ...this.state,
      };

      APIsFunctions.addUser(employee_data)

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

  render() {
    console.log(this.state);
    return (
      <div className='employee-route employee-route flex-center flex-column'>
        <Loader />
        <form className='employee-form flex-center flex-column'>
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
          <Link to={"/list-employees"} className='circle-btn white-color'><FiArrowLeft /></Link>
          <Link to={"/"} className='circle-btn white-color'><HiHome /></Link>
        </div>
      </div>
    )
  }
}

export default edit_employee;