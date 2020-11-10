import axios from "axios";
import callApi from './../../utils/apiCaller';


class AuthService {
    
  login(username, password) {
    return callApi("Login", "POST", {
        userName: username,
        password: password,
      })
        .then((response => {
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
         }));
        }
  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();