import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import APIsFunctions from './apis/apis_functions';
import EditEmployee from './edit_employee';
// import ListEmployee from './list_employee';
// import { CSSTransition } from 'react-transition-group';

import axios from "axios";
const UserAPIs = "http://localhost:8080/api/user"



class employee_card extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  name: '',
                  id: '',
                  age: '',
                  address: '',
                  phoneNumber: '',
                  new_users: [],
                  data: ['Name: ' + props.name, 'Age: ' + props.age, ' Id: ' + props.id, 'Address: ' + props.address, 'Phone Number: ' + props.phoneNumber]
            }
      }
      /*-----------------------Edit user function-----------------------*/
      editUser = (name, id, age, address, phoneNumber) => {
            this.setState({
                  name: name,
                  id: id,
                  age: age,
                  address: address,
                  phoneNumber: phoneNumber,
            });
      }
      /*-----------------------Delete user function-----------------------*/
      deleteUser = (id, name) => {
            confirmAlert({
                  title: `Delete User`,
                  message: `Are you sure you want to delete ${name}.`,
                  buttons: [
                        {
                              label: 'Yes',
                              onClick: () => {
                                    axios.delete(UserAPIs + '/' + id)
                                          .then(() => {
                                                return APIsFunctions.getAllUsers().then(
                                                      res => {
                                                            this.setState({
                                                                  new_users: res.data
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
                  <div className="employee-card-container">
                        <div className="employee-card flex-center flex-column">
                              <FaUserCircle className='avatar white-color' />
                              <div className='card-data'>
                                    {this.state.data.map((employee, index) => (<p key={index} className='white-color'>{employee}</p>))}
                              </div>
                              <div className='card-buttons'>
                                    <Link role="button" to="/edit-employee" className='circle-btn white-color'
                                          onClickCapture={() => this.editUser(
                                                this.props.name,
                                                this.props.id,
                                                this.props.age,
                                                this.props.address,
                                                this.props.phoneNumber
                                          )}>
                                          <MdModeEditOutline /></Link>
                                    <button className='circle-btn white-color' onClickCapture={() => this.deleteUser(this.props.id, this.props.name)}><MdDelete /></button>
                              </div>
                              <div className='white-glow' />
                        </div>
                        <div className='display-none'>
                              <EditEmployee
                                    edit_name={this.state.name}
                                    edit_id={this.state.id}
                                    edit_age={this.state.age}
                                    edit_address={this.state.address}
                                    edit_phoneNumber={this.state.phoneNumber}
                              />
                        </div>
                  </div >
            )
      }
}

export default employee_card;