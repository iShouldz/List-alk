import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login/loginSlice";
import styles from "./styles.module.css";
import pencil from "../../assets/pencil.svg";
import ButtonComponent from "../UI/ButtonComponent/ButtonComponent";
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
        {loginId && (
          <Link to="/dashboard" id={styles.links}>
            Dashboard
          </Link>
        )}
      </div>

      {!loginId ? (
        <div className={styles.btnContainer}>
          <ButtonComponent
            onClick={() => handleNavigate("login")}
            color="#FFE8D6"
          >
            Login
          </ButtonComponent>
          <ButtonComponent
            onClick={() => handleNavigate("signup")}
            color="#FFBF68"
          >
            Register
          </ButtonComponent>
        </div>
      ) : (
        <>
          <ButtonComponent onClick={handleLogout} color="#FFBF68">
            Logout
          </ButtonComponent>
        </>
      )}
    </header>
  );
};

export default Header;
