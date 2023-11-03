export default function CartlistComponent({ onDelete, cartDetail }) {
  return (
    <div style={{ paddingTop: "3rem" }}>
      {cartDetail &&
        cartDetail.map((d, index) => (
          <div key={index} className="row mb-4 ">
            <div className="border d-flex p-3">
              <div className="me-auto align-self-center">
                <h5>課程名稱: {d.title}</h5>
              </div>
              <div className="align-self-center mx-3">
                <h5>課程價格:{d.price}</h5>
              </div>
              <button
                data-id={d._id}
                type="button"
                className="btn-close "
                onClick={() => {
                  onDelete(d._id);
                }}
              ></button>
            </div>
          </div>
        ))}
    </div>
  );
}
