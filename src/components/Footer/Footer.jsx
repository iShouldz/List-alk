import styles from "./styles.module.css";
import pencil from "../../assets/pencil.svg";
import facebook from "../../assets/Facebook.svg";
import instagram from "../../assets/Instagram.svg";
import twitter from "../../assets/Twitter.svg";
import linkedin from "../../assets/Linkedin.svg";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.logo}>
        <img src={pencil} alt="logo app" />

        <h1>LISTALK</h1>
      </div>

      <div className={styles.middleFooter}>
        <div className={styles.middleSuperior}>
          <p>Concept</p>
          <p>Blog</p>
          <p>Contact us</p>
        </div>

        <div className={styles.middleInferior}>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookies Settings</p>
        </div>
      </div>

      <div className={styles.social}>
        <img src={facebook} alt="" />
        <img src={instagram} alt="" />
        <img src={twitter} alt="" />
        <img src={linkedin} alt="" />
      </div>
    </footer>
  );
};

export default Footer;
