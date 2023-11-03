import { useEffect, useState } from "react";
import CartlistComponent from "./Cartlist-component";
import CartService from "../../services/cart.service";

export default function CartCompoment({
  currentUser,
  cartlist,
  cartDetail,
  onDelete,
}) {
  let [sum, setSum] = useState(0);

  useEffect(() => {
    const getSum = () => {
      let count = 0;
      if (cartDetail.length != 0) {
        cartDetail.map((c) => {
          count += Number(c.price);
        });
        setSum(count);
      }
    };

    getSum();
  }, [cartDetail]);

  async function handleClick() {
    const response = await CartService.enroll();
    console.log(response);
  }

  let textContext;
  if (!currentUser) {
    textContext = <div style={{ padding: "3rem" }}>沒有權限</div>;
  } else {
    if (cartlist.length == 0) {
      textContext = (
        <div style={{ padding: "3rem" }}>
          <h3 className="my-3">購物車:</h3>
          <p>沒有商品</p>
        </div>
      );
    }
  }

  return (
    <div className="container">
      {textContext && textContext}
      {!textContext && cartDetail && (
        <div>
          <CartlistComponent cartDetail={cartDetail} onDelete={onDelete} />
          <h6>總金額:{sum}</h6>
          <button onClick={handleClick} className="btn btn-primary">
            註冊課程
          </button>
        </div>
      )}
    </div>
  );
}
