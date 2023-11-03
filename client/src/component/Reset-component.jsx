import { useState } from "react";
import { useNavigate } from "react-router";
import authService from "../../services/auth.service";
const ResetCompoment = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  const handleReset = async () => {
    try {
      await authService.sendEmail(email);
      window.alert("會員密碼認證信已送出，將導向至首頁");
      navigate("/login");
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  return (
    <div style={{ padding: "3rem" }} className="container">
      {message && <p className="text-danger">{message}</p>}
      <div className="mb-3 col-6">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          輸入註冊信箱
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>

      <button onClick={handleReset} className="btn btn-primary">
        確認
      </button>
    </div>
  );
};
export default ResetCompoment;
