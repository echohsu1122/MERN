import { Outlet } from "react-router";
import Nav from "./Nav-component";

const Layout = ({ currentUser, setCurrentUser, cartlist }) => {
  return (
    <>
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        cartlist={cartlist}
      />
      <Outlet />
    </>
  );
};

export default Layout;
