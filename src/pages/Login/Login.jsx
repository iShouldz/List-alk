/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login/loginSlice";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      } else {
        console.log("erro");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label>
          E-mail address
          <input type="text" name="email" id="email" {...register("email")} />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            id="password"
            {...register("password")}
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Login;
