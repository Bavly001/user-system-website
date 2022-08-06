import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';

import APIsFunctions from './apis/apis_functions';
// import { CSSTransition } from 'react-transition-group';



const employee_card = (props) => {

      const data = ['Name: ' + props.name, 'Age: ' + props.age, ' Id: ' + props.id, 'Address: ' + props.address, 'Phone Number: ' + props.phoneNumber]



      return (
            <div className="employee-card-container">
                  <div className="employee-card flex-center flex-column">
                        <FaUserCircle className='avatar white-color' />
                        <div className='card-data'>
                              {data.map((employee, index) => (<p key={index} className='white-color'>{employee}</p>))}
                        </div>
                        <div className='card-buttons'>
                              <button className='circle-btn white-color'><MdModeEditOutline /></button>
                              <button className='circle-btn white-color' onClickCapture={()=> APIsFunctions.delUser(props.id)}><MdDelete /></button>
                        </div>
                        <div className='white-glow' />
                  </div>
            </div>
      )
}

export default employee_card;