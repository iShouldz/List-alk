/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
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
    console.log(data)
    const {username, email, password} = data

    const userData = {
        username,
        email,
        password,
        todo: [

        ]
    }

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
    <section>
      <form onSubmit={handleSubmit(handleRegister)}>
        <label>
          Username
          <input
            type="text"
            name="username"
            id="username"
            {...register("username")}
          />
        </label>

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

export default Signup;
