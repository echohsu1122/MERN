import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartlistComponent from "./Cartlist-component";
import CartService from "../../services/cart.service";

export default function CartCompoment({
  currentUser,
  cartlist,
  cartDetail,
  setCartlist,
  setCartDetail,
}) {
  let [sum, setSum] = useState(0);
  let navigate = useNavigate();
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
  // console.log(cartDetail);
  async function handleClick() {
    try {
      await CartService.enrollCourse();
      //console.log(response);
      window.alert("恭喜註冊成功");
      navigate("/enroll");
    } catch (e) {
      console.log(e);
    }
  }
  // console.log(cartlist);
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
          <CartlistComponent
            cartlist={cartlist}
            setCartlist={setCartlist}
            cartDetail={cartDetail}
            setCartDetail={setCartDetail}
          />
          <h6>總金額:{sum}</h6>
          <button onClick={handleClick} className="btn btn-primary">
            註冊課程
          </button>
        </div>
      )}
    </div>
  );
}
