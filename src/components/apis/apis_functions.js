import React, { Component } from "react";
import EmployeeCard from '../employee_card';
import axios from "axios";

const UserAPIs = "http://localhost:8080/api/user"

class apis_functions extends Component {

  add_user(employee) {
    axios.post(UserAPIs, employee);
  }

  getAllUsers() {
    return (
      <div>
        {axios.get(UserAPIs + "/all").map((employee, index) => (<EmployeeCard
          key={index}
          name={employee.name}
          id={employee.id}
          age={employee.age}
          address={employee.address}
          phoneNumber={employee.phoneNumber}
        />))}
      </div>
    )
  }

  updateUser(id, employee){
    axios.post(UserAPIs + "/" + id, employee);
  }

  delUser = (id) => {
    axios.delete(UserAPIs + "/" + id)
  }
}

export default apis_functions;