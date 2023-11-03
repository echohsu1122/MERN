import axios from "axios";
const API_URL = "http://localhost:8080/cart";
let token;
if (localStorage.getItem("user")) {
  token = JSON.parse(localStorage.getItem("user")).token;
} else {
  token = "";
}
class CartService {
  /*CART Data*/
  //使用者id
  //http://localhost:8080/cart/:id
  getCart(_id) {
    return axios.get(`${API_URL}/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
  //課程id
  addToCart(_id) {
    return axios.post(
      `${API_URL}/${_id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  deleteCartCourse(_id) {
    return axios.patch(
      `${API_URL}/${_id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  enrollCourse() {
    return axios.post(
      `${API_URL}/enroll`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
export default new CartService();
