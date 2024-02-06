import imageHome from "../../assets/homeImage.png";
import styles from  './styles.module.css'

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <div>
        <h1 id={styles.h1}>LIST ALK</h1>
        <p id={styles.p}>Your Ultimate Destination for Cataloging Life's Favorites</p>
      </div>

      <img src={imageHome} alt="A man with a notebook thinking" />
    </section>
  );
};

export default Home;
