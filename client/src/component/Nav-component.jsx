import { Link } from "react-router-dom";
import authService from "../../services/auth.service";

function NavComponent({ currentUser, setCurrentUser, cartlist }) {
  const handleLogout = () => {
    authService.logout();
    authService.googleLogout();
    window.alert("登出成功，將導向至首頁");
    setCurrentUser(null);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" to="#">
            去上課
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/course">
                  所有課程
                </Link>
              </li>
              {currentUser.user._id == 0 && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    註冊
                  </Link>
                </li>
              )}
              {currentUser.user._id == 0 && (
                <li className="nav-item">
                  <Link className="nav-link" aria-disabled="true" to="/login">
                    登入
                  </Link>
                </li>
              )}
              {currentUser.user._id != 0 && (
                <li className="nav-item">
                  <Link
                    onClick={handleLogout}
                    className="nav-link"
                    aria-disabled="true"
                    to="/"
                  >
                    登出
                  </Link>
                </li>
              )}
              {currentUser.user._id != 0 && (
                <li className="nav-item">
                  <Link className="nav-link" aria-disabled="true" to="/profile">
                    {currentUser.user.username}
                  </Link>
                </li>
              )}
              {currentUser.user._id != 0 && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-disabled="true"
                    to="/postCourse"
                  >
                    成為講師
                  </Link>
                </li>
              )}
              {currentUser.user._id != 0 && (
                <li className="nav-item">
                  <Link className="nav-link" aria-disabled="true" to="/enroll">
                    你的學習
                  </Link>
                </li>
              )}

              {currentUser.user._id != 0 && (
                <li className="nav-item">
                  <Link
                    className="nav-link position-relative"
                    aria-disabled="true"
                    to="/cart"
                  >
                    購物車
                    <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger">
                      {cartlist && cartlist.length}
                    </span>
                  </Link>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavComponent;
