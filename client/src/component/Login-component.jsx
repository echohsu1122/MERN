import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import googleLogo from "../assets/google.png";

const LoginCompoment = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("將重新導向至首頁");
      navigate("/");
      navigate(0);
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  const handleGoogleLogin = () => {
    try {
      AuthService.googleLogin();
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  return (
    <div className="container" style={{ padding: "3rem" }}>
      <div className="row row-cols-2">
        <div className="col-6">
          {message && <div className="alert alert-danger">{message}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              輸入信箱
            </label>
            <input
              onChange={handleEmail}
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="form-label">
              輸入密碼
            </label>
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              id="password"
            />
          </div>

          <div className="d-grid gap-2 d-block">
            <Link>忘記密碼 ?</Link>
            <button onClick={handleLogin} className="btn btn-primary">
              登入
            </button>
          </div>
        </div>{" "}
        <div className="col-6">
          <p>或是用其他方式登入</p>
          <div>
            <button onClick={handleGoogleLogin} className="btn btn-dark">
              <img src={googleLogo} style={{ width: "52px" }} className="p-2" />
              使用Google登入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCompoment;
