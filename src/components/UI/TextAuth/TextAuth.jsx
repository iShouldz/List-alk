/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

const TextAuth = ({ h1, h3 }) => {
  return (
    <section className={styles.textRegister}>
      <h1>{h1}</h1>
      <h3>{h3}</h3>
    </section>
  );
};

export default TextAuth;
