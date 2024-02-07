/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.css";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/UI/InputComponent/InputComponent";
import TextAuth from "../../components/UI/TextAuth/TextAuth";
import { useNavigate } from "react-router-dom";

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
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const handleRegister = (data) => {
    console.log(data);
    const { username, email, password } = data;

    const userData = {
      username,
      email,
      password,
      todo: [],
    };

    fetch("https://json-server-liskalk.vercel.app/users", {
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
          navigate("/");
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
      <TextAuth h1="Register Now" h3="to be a part of the list world." />

      <form
        onSubmit={handleSubmit(handleRegister)}
        className={styles.formContainer}
      >
        <InputComponent
          label="Username"
          name="username"
          placeholder="Enter your chosen username"
          control={control}
        />

        {errors?.username?.message !== undefined && (
          <p>{errors?.username?.message}</p>
        )}

        <InputComponent
          label="E-mail address"
          placeholder="Enter your best e-mail"
          name="email"
          control={control}
        />

        {errors?.email?.message !== undefined && (
          <p>{errors?.email?.message}</p>
        )}

        <InputComponent
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          name="password"
          control={control}
        />

        {errors?.password?.message !== undefined && (
          <p>{errors?.password?.message}</p>
        )}

        <ButtonComponent type="submit" color="#FF9F1C">
          Register
        </ButtonComponent>
      </form>
    </section>
  );
};

export default Signup;
