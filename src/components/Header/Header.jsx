import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login/loginSlice";

const Header = () => {
  const navigate = useNavigate();
  const loginId = useSelector((state) => state.login.currentLogin);
  const dispatch = useDispatch();

  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    dispatch(loginActions.handleSetCurrentLogin(""));
    dispatch(loginActions.handleSetCurrentUsername(""));
  };

  return (
    <header>
      <img src="" alt="icon" />
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>

      {!loginId ? (
        <>
          <button onClick={() => handleNavigate("login")}>Login</button>
          <button onClick={() => handleNavigate("signup")}>Register</button>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
  );
};

export default Header;
