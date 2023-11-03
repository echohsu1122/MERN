import { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/auth.service";

const RegisterCompoment = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaasword] = useState("");
  const [message, setMessage] = useState("");
  const handleRegister = async () => {
    try {
      await AuthService.register(username, email, password);

      window.alert("註冊成功，請重新登入");
      navigator("/login");
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  return (
    <div style={{ padding: "3rem" }} className="row">
      {message && (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
      <div className="col-6">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            使用者名稱
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="您的姓名"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            信箱
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            密碼
          </label>
          <input
            onChange={(e) => setPaasword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <button onClick={handleRegister} className="btn btn-primary">
          註冊
        </button>
      </div>
    </div>
  );
};

export default RegisterCompoment;
