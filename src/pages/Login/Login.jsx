/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login/loginSlice";
import InputComponent from "../../components/UI/InputComponent/InputComponent";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import styles from "./styles.module.css";
import TextAuth from "../../components/UI/TextAuth/TextAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const [erroLogin, setErroLogin] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (user) {
        dispatch(loginActions.handleSetCurrentLogin(user.id));
        dispatch(loginActions.handleSetCurrentUsername(user.username));
        navigate("/");
      } else {
        console.log("erro");
        setErroLogin("Erro de credenciais")
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  console.log(errors);
  return (
    <section className={styles.loginContainer}>
      <TextAuth h1="Welcome back!" h3="Your organized world awaits..." />

      <form
        onSubmit={handleSubmit(handleLogin)}
        className={styles.formContainer}
      >
        <InputComponent
          type="text"
          name="email"
          label="E-mail address"
          placeholder="Enter your best e-mail"
          control={control}
        />

        {errors?.email?.message !== undefined && (
          <p>{errors?.email?.message}</p>
        )}
        <InputComponent
          label="Password"
          name="password"
          type="password"
          placeholder="Enter a strong password"
          control={control}
        />
        {errors?.password?.message !== undefined && (
          <p>{errors?.password?.message}</p>
        )}

        <ButtonComponent type="submit" color="#FF9F1C">
          Login
        </ButtonComponent>
        {erroLogin}
      </form>
    </section>
  );
};

export default Login;
