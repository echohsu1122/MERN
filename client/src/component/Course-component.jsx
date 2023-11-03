export default function CourseCompoment({
  data,
  cartlist,
  enrolllist,
  onAddCourse,
}) {
  return (
    <div className="container">
      <div className="row">
        {data.length == 0 && (
          <div style={{ padding: "3rem" }}>目前沒有課程</div>
        )}
        {data &&
          data.map((d) => (
            <div
              key={d._id}
              data-id={d._id}
              className="card m-3"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">課程名稱:</h5>
                <p>{d.title}</p>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  課程內容
                </h6>
                <p className="card-text">{d.description}</p>
                <p className="card-text">價格:{d.price}</p>
                <div className="d-grid justify-md-end">
                  <button
                    key={d._id}
                    data-id={d._id}
                    onClick={() => {
                      onAddCourse(d._id);
                    }}
                    className={
                      enrolllist.includes(d._id)
                        ? "btn btn-success"
                        : cartlist.includes(d._id)
                        ? "btn btn-secondary"
                        : "btn btn-primary"
                    }
                    disabled={
                      cartlist.includes(d._id) || enrolllist.includes(d._id)
                    }
                  >
                    {enrolllist.includes(d._id)
                      ? "開始上課"
                      : cartlist.includes(d._id)
                      ? "立即結帳"
                      : "加入購物車"}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
