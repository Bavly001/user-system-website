import axios from "axios";

const UserAPIs = "http://localhost:8080/api/user"

class APIsFunctions {

  addUser(employee) {
    return axios.post(UserAPIs, employee);
  }

  getAllUsers() {
    return axios.get(UserAPIs + "/all");
  }

  updateUser(employee) {
    return axios.put(UserAPIs, employee);
  }

  delUser = (id) => {
    return axios.delete(UserAPIs + "/" + id)
  }
}

export default new APIsFunctions();