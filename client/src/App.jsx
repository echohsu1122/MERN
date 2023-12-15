import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import CourseService from "../services/course.service";
import CartService from "../services/cart.service";
import Layout from "./component/Layout";
import HomeCompoment from "./component/Home-component";
import LoginCompoment from "./component/Login-component";
import RegisterCompoment from "./component/Register-component";
import ResetCompoment from "./component/Reset-component";
import PostCourseComponment from "./component/PostCourse-component";
import ProfileCompoment from "./component/Profile-component";
import CourseCompoment from "./component/Course-component";
import CartCompoment from "./component/Cart-component";
import EnrollComponment from "./component/Enroll-component";

function App() {
  let guest = { user: { _id: 0, username: "guest" } };

  let [currentUser, setCurrentUser] = useState(guest);
  let [data, setData] = useState([]);
  let [cartlist, setCartlist] = useState([]);
  let [cartDetail, setCartDetail] = useState([]);
  let [enrolllist, setEnrolllist] = useState([]);
  let [enrollDetail, setEnrollDetail] = useState([]);
  let [isLoad, setIsLoad] = useState(false);
  const initUserData = async () => {
    let response = await CartService.getCart(currentUser.user._id);
    // console.log(response.data.user);
    if (response.status == 200) {
      setEnrolllist(response.data.user.enrolllist.map((c) => c._id));
      setCartlist(response.data.user.cartlist.map((c) => c._id));
      setCartDetail(response.data.user.cartlist.map((c) => c));
      setEnrollDetail(response.data.user.enrolllist.map((c) => c));
    }
  };
  async function getGooler() {
    let response = await AuthService.getGoogleUser();
    if (response.data.loginSuccess) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
    } else {
      setCurrentUser(guest);
    }
  }

  async function getUser() {
    try {
      if (AuthService.getCurrentUser() == null) {
        // console.log("確認google 登入");
        getGooler();
      } else if (AuthService.getCurrentUser() != null) {
        setCurrentUser(AuthService.getCurrentUser());
      }
    } catch (e) {
      console.log(e);
    }
  }
  let loadtime;
  const getData = async () => {
    try {
      const start = Date.now();
      setIsLoad(true);
      let response = await CourseService.getCourse();
      console.log(response);
      const finish = Date.now();
      loadtime = (finish - start) / 1000;
      setData(response.data);
      setIsLoad(false);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(loadtime);
  useEffect(() => {
    getUser();
    getData();
    if (currentUser.user._id != 0) {
      initUserData();
    }
  }, [currentUser.user._id]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              cartlist={cartlist}
            />
          }
        >
          {" "}
          <Route index element={<HomeCompoment />} />
          <Route
            path="login"
            element={<LoginCompoment setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="course"
            element={
              <CourseCompoment
                currentUser={currentUser}
                data={data}
                cartlist={cartlist}
                setCartDetail={setCartDetail}
                setCartlist={setCartlist}
                enrolllist={enrolllist}
                isLoad={isLoad}
                loadtime={loadtime}
              />
            }
          />
          <Route path="register" element={<RegisterCompoment />} />
          <Route path="reset" element={<ResetCompoment />} />
          <Route
            path="profile"
            element={
              <ProfileCompoment
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                data={data}
                setData={setData}
              />
            }
          />
          <Route
            path="postCourse"
            element={
              <PostCourseComponment
                currentUser={currentUser}
                data={data}
                setData={setData}
              />
            }
          />
          <Route
            path="enroll"
            element={
              <EnrollComponment
                currentUser={currentUser}
                enrollDetail={enrollDetail}
                initUserData={initUserData}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartCompoment
                currentUser={currentUser}
                cartlist={cartlist}
                setCartlist={setCartlist}
                cartDetail={cartDetail}
                setCartDetail={setCartDetail}
                setEnrollDetail={setEnrollDetail}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
