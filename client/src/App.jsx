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

  const getCartList = async () => {
    if (currentUser.user._id != 0) {
      console.log(currentUser.user._id);
      try {
        let response = await CartService.getCart(currentUser.user._id);
        console.log(response);
        setCartlist(response.data.cartlist);
        setCartDetail(response.data.cartDetail);
        setEnrollDetail(response.data.enrollDetail);
        setEnrolllist(response.data.enrolllist);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const getData = async () => {
    try {
      let response = await CourseService.getCourse();
      // console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getcurrentUser = async () => {
      if (!localStorage.getItem("user")) {
        try {
          let response = await AuthService.getGoogleUser();
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (e) {
          console.log(e);
        }
      }
      setCurrentUser(AuthService.getCurrentUser());
    };
    getcurrentUser();
  }, [currentUser]);
  if (currentUser.user._id != 0) {
    getCartList();
    getData();
  }
  function handleChange(card) {
    setData(
      data.map((c) => {
        if (c.id == card.id) {
          return card;
        } else {
          return c;
        }
      })
    );
  }
  async function handleDelete(id) {
    try {
      await CartService.deleteCartCourse(id);
      setCartDetail(
        cartDetail.filter((c) => {
          return c._id != id;
        })
      );
      setCartlist(
        cartlist.filter((c) => {
          return c != id;
        })
      );
    } catch (e) {
      console.log(e.response.data);
    }
  }
  async function handleAddCourse(id) {
    try {
      let response = await CartService.addToCart(id);
      console.log(response);
      setCartlist([...cartlist, id]);
      window.alert("商品加入成功");
    } catch (e) {
      console.log(e);
    }
  }
  /*
  console.log("課程資料");
  console.log(data);
  console.log("現在使用者");*/
  console.log(currentUser); /*
  console.log("現在使用者購物車列表");
  console.log(cartlist);
  console.log("現在使用者購物車明細");
  console.log(cartDetail);
  console.log("現在使用者註冊列表");
  console.log(enrolllist);
  console.log("現在使用者註冊明細");
  console.log(enrollDetail);
  */
  console.log("進入app");
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
          <Route path="login" element={<LoginCompoment />} />
          <Route
            path="course"
            element={
              <CourseCompoment
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                data={data}
                setData={setData}
                cartlist={cartlist}
                enrolllist={enrolllist}
                onAddCourse={handleAddCourse}
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
                onChange={handleChange}
              />
            }
          />
          <Route
            path="postCourse"
            element={<PostCourseComponment currentUser={currentUser} />}
          />
          <Route
            path="enroll"
            element={
              <EnrollComponment
                currentUser={currentUser}
                enrollDetail={enrollDetail}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartCompoment
                currentUser={currentUser}
                cartlist={cartlist}
                cartDetail={cartDetail}
                onDelete={handleDelete}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
