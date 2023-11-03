import { useState } from "react";
import CourseService from "../../services/course.service";

export default function ProfileCompoment({ currentUser, data, onChange }) {
  let [revise, setRevise] = useState(false);

  const hadleDeletCourse = async (e) => {
    let { id } = e.target.dataset;

    try {
      await CourseService.deleteCourse(id);
      window.alert("課程刪除成功");
    } catch (e) {
      console.log(e);
      window.alert(e);
    }
  };
  const handleReviseCoures = async (e) => {
    let { id } = e.target.dataset;
    let changeData = data.filter((d) => d._id === id);
    let { title, description, price } = changeData[0];

    if (revise) {
      try {
        await CourseService.patchCourse(id, {
          title,
          description,
          price,
        });
        window.alert("修改成功");
      } catch (e) {
        console.log(e.response.data);
      }
    }
    setRevise(!revise);
  };
  /*有加{} 要記得return 沒有加要記得不要放; */
  const currentData = data.filter((d) => d.instructor === currentUser.user._id);

  return (
    <div className="container">
      <div className="row">
        {currentUser.user._id == 0 && (
          <div style={{ padding: "3rem" }}>沒有權限，請先登入</div>
        )}
        {currentUser.user._id != 0 &&
          currentData.length == 0 &&
          currentData.length == 0 && (
            <div style={{ padding: "3rem" }}>目前沒有課程</div>
          )}

        {currentUser && currentData.length != 0 && <div>您已經建立的課程</div>}
        {currentUser &&
          currentData &&
          currentData.map((d) => (
            <div key={d._id} className="card m-3" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">課程名稱:</h5>
                {revise ? (
                  <input
                    onChange={(e) => {
                      onChange({ ...d, title: e.target.value });
                    }}
                    className="form-control "
                    value={d.title}
                  />
                ) : (
                  <p>{d.title}</p>
                )}
                <h5 className="mt-2">課程內容:</h5>
                {revise ? (
                  <textarea
                    onChange={(e) => {
                      onChange({ ...d, description: e.target.value });
                    }}
                    value={d.description}
                    className="form-control"
                    rows="3"
                  ></textarea>
                ) : (
                  <p className="card-text">{d.description}</p>
                )}
                <h5 className="mt-2">課程價格:</h5>
                {revise ? (
                  <input
                    onChange={(e) => {
                      onChange({ ...d, price: e.target.value });
                    }}
                    className="form-control mb-2 "
                    value={d.price}
                  />
                ) : (
                  <p> {d.price}</p>
                )}

                <div className="d-grid d-md-flex justify-content-md-center">
                  <button
                    data-id={d._id}
                    onClick={handleReviseCoures}
                    className="btn btn-primary m-2 "
                  >
                    {revise ? "確認課程" : "修改課程"}
                  </button>
                  <button
                    onClick={hadleDeletCourse}
                    data-id={d._id}
                    className="btn btn-primary m-2  "
                  >
                    刪除課程
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
