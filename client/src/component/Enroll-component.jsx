export default function EnrollComponment({
  currentUser,
  enrollDetail,
  initUserData,
}) {
  console.log("進入enroll");
  console.log(enrollDetail);

  initUserData();

  return (
    <div className="container">
      <div className="row">
        {currentUser.user._id == 0 && (
          <div style={{ padding: "3rem" }}>沒有權限，請先登入</div>
        )}
        {currentUser.user._id != 0 && enrollDetail.length == 0 && (
          <div style={{ padding: "3rem" }}>目前沒有註冊的課程</div>
        )}

        {currentUser && enrollDetail.length != 0 && (
          <div>
            您已經建立的課程:
            {enrollDetail.map((d) => (
              <div key={d._id} className="card m-3" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱:</h5>
                  <p className="card-text">{d.title}</p>
                  <h5 className="mt-2">課程內容:</h5>
                  <p className="card-text">{d.description}</p>
                  <button className="btn btn-primary">開始上課</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
