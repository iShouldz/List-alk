import pedro from "../../assets/pedro_souza2.jpg";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import styles from "./styles.module.css";

const About = () => {
  const HandleLinkedin = () => {
    const url = `https://www.linkedin.com/in/pedro-souza-385794241/`;

    window.open(url, "_blank");
  };

  const handleGithub = () => {
    const url = "https://github.com/iShouldz";
    window.open(url, "_blank");
  };

  return (
    <section className={styles.aboutContainer}>
      <h1>About</h1>

      <img src={pedro} alt="" />

      <div className={styles.textContainer}>
        <h2>Pedro Souza</h2>
        <h3>Front-end developer</h3>

        <p>
          I hope you liked this system. I maked this for a challenge in a React
          & Next.js course. Let`s go, follow me on Github and linkedin.
        </p>
      </div>

      <div className={styles.btnContainer}>
        <ButtonComponent color="#0072b1" onClick={HandleLinkedin}>
          Linkedin
        </ButtonComponent>

        <ButtonComponent color="#FF9F1C" onClick={handleGithub}>
          Github
        </ButtonComponent>
      </div>
    </section>
  );
};

export default About;
