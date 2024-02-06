import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login/loginSlice";
import styles from "./styles.module.css";
import pencil from "../../assets/pencil.svg";
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
    <header className={styles.headerContainer}>
      <img src={pencil} alt="icon" />

      <div className={styles.linksContainer}>
        <Link to="/" id={styles.links}>
          Home
        </Link>
        <Link to="/about" id={styles.links}>
          About
        </Link>
        {loginId && <Link to="/dashboard">Dashboard</Link>}
      </div>

      {!loginId ? (
        <div className={styles.btnContainer}>
          <button onClick={() => handleNavigate("login")} id={styles.btnLogin}>
            Login
          </button>
          <button
            onClick={() => handleNavigate("signup")}
            id={styles.btnRegister}
          >
            Register
          </button>
        </div>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
  );
};

export default Header;
