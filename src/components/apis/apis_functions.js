import axios from "axios";

const UserAPIs = "http://localhost:8080/api/user"

class APIsFunctions {

  addUser(employee) {
    axios.post(UserAPIs, employee);
  }

  getAllUsers() {
    return axios.get(UserAPIs + "/all");
  }

  updateUser(id, employee) {
    axios.put(UserAPIs + "/" + id, employee);
  }

  delUser = (id) => {
    axios.delete(UserAPIs + "/" + id)
  }
}

export default new APIsFunctions();