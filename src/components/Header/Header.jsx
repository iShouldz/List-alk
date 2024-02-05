import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src="" alt="icon" />
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <button>Login</button>
      <button>Register</button>
    </header>
  );
};

export default Header;
