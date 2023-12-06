import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/course.service";
function PostCourseComponment({ currentUser, data, setData }) {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [message, setMessage] = useState("");

  const handlePost = () => {
    CourseService.post({ title, description, price })
      .then((res) => {
        setData([...data, res.data.saveCourse]);
        window.alert("建立成功，將導向至所有課程");
        navigate("/profile");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };
  return (
    <>
      {currentUser.user._id == 0 && (
        <div style={{ padding: "3rem" }}>沒有權限，請先登入</div>
      )}
      {currentUser.user._id != 0 && (
        <div className="container w-50 mt-3">
          {message && <div className="text-danger">{message}</div>}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              課程名稱
            </label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              課程內容
            </label>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              課程價格
            </label>
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="d-grid justify-content-md-end">
            <button onClick={handlePost} className="btn btn-primary ">
              建立課程
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCourseComponment;
