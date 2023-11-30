import axios from "axios";

// const API_URL = "https://mern-api-nu-nine.vercel.app/course/";
const API_URL = "http://localhost:8080/course/";
let token;
if (localStorage.getItem("user")) {
  token = JSON.parse(localStorage.getItem("user")).token;
} else {
  token = "";
}

class CourseService {
  post({ title, description, price }) {
    console.log("建立課程");
    console.log(token);
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getCourse() {
    return axios.get(API_URL);
  }
  getProfile(_id, { title, description, price }) {
    return axios.get(
      API_URL + _id,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  patchCourse(_id, { title, description, price }) {
    return axios.patch(
      API_URL + _id,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  deleteCourse(_id) {
    return axios.delete(API_URL + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CourseService();
