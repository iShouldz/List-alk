/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.css";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (data) => {
    console.log(data);
    const { username, email, password } = data;

    const userData = {
      username,
      email,
      password,
      todo: [],
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          console.log("Form submitted successfully");
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
      });
  };

  return (
    <section className={styles.signupContainer}>
      <div className={styles.textRegister}>
        <h1>Register Now</h1>
        <h3>to be a part of the list world.</h3>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className={styles.formContainer}
      >
        <label>
          Username <span>*</span>
          <input
            type="text"
            name="username"
            id="username"
            {...register("username")}
            placeholder="Enter your chosen username"
          />
        </label>

        <label>
          E-mail address <span>*</span>
          <input
            type="text"
            name="email"
            id="email"
            {...register("email")}
            placeholder="Enter your best e-mail"
          />
        </label>

        <label>
          Password <span>*</span>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password")}
            placeholder="Enter a strong password"
          />
        </label>

        <ButtonComponent type="submit" color="#FF9F1C">
          Register
        </ButtonComponent>
      </form>
    </section>
  );
};

export default Signup;
