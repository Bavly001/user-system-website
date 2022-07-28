import React, { Component } from "react";
import EmployeeCard from '../employee_card';

class apis_functions extends Component {


  constructor(){
    super();
    console.log('constructor')
  }
  state = {
    employees_data: [
      { name: 'Johny', age: 41, id: -1, phoneNumber: '12756', address: '12ff3456' },
      { name: 'Ali ', age: 41, id: 0, phoneNumber: '12756', address: '12ff3456' },
      { name: 'John', age: 21, id: 1, phoneNumber: '123456', address: '123456' },
      { name: 'Jo', age: 14, id: 2, phoneNumber: '456', address: '3' },
      { name: 'John', age: 21, id: 3, phoneNumber: '123456', address: '123456' }
    ]
  };

  add_user = (employee) => {
    this.state.employees_data.push(employee);
  }

  // getAllUsers = () => (
  //   this.state.employees_data.map((employee, index) => (<EmployeeCard
  //     key={index}
  //     name={employee.name}
  //     id={employee.id}
  //     age={employee.age}
  //     address={employee.address}
  //     phoneNumber={employee.phoneNumber}
  //   />)))

  delUser = (id) => {
    const employee_index = this.state.employees_data.findIndex((employee) => (employee.id === id));
    const delete_employee = this.state.employees_data.splice(employee_index, 1);
    this.setState({ del_employee: delete_employee })
    let { employees_data, del_employee } = this.state;
    employees_data.slice(del_employee);
    console.log(this.state.employees_data)
    console.log(del_employee)
    // const new_array = this.state.employees_data.slice(del_employee)
    // console.log(new_array)

  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return true;
  }

  componentDidMount(){
    console.log('componentDidMount')
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  render() {
    console.log('render')
    return (
      <>
        {
            this.state.employees_data.map((employee, index) => (<EmployeeCard
              key={index}
              name={employee.name}
              id={employee.id}
              age={employee.age}
              address={employee.address}
              phoneNumber={employee.phoneNumber}
            />))
        }
      </>
    );
  }
}

export default apis_functions;