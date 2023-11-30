import axios from "axios";

const API_URL = "http://localhost:8080/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  /* */
  sendEmail(email) {
    return axios.post(API_URL + "/reset", { email });
  }

  /*GOOGLE LOGIN */
  googleLogin() {
    window.open(API_URL + "/auth/google", "_self");
  }
  //發送get請求少了 { withCredentials: true }->沒辦法經過deserializeUser
  //加了-> 產生cors問題
  //Access-Control-Allow-Origin", "http://localhost:5173" 不能是*
  //even that passport was doing it job with authentication, the session cookie on the front-end was not updating, therefore session on every next request was without updated authentication.
  /*
  getGoogleUser() {
    axios
      .get(API_URL + "/login/success", {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((e) => console.log(e.response));
  }
  */
  getGoogleUser() {
    return axios.get(API_URL + "/login/success", {
      withCredentials: true,
    });
  }
  //改寫一下
  googleLogout() {
    window.open(API_URL + "/logout", "_self");
  }
}

export default new AuthService();
