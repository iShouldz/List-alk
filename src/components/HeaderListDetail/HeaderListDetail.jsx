/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import styles from './styles.module.css'

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),

  })
  .required();

const HeaderListDetail = ({ title, description }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const currentLogin = useSelector((state) => state.login.currentLogin);
  const indexArray = useSelector((state) => state.todo.todoArraySelected);

  const handleUpdateHeader = (data) => {
    const {name, description} = data
    console.log(data)
    fetch(`https://json-server-liskalk.vercel.app/users/${currentLogin}`)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      user.todo[indexArray].name = name;
      user.todo[indexArray].description = description;
      return fetch(`https://json-server-liskalk.vercel.app/users/${currentLogin}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({todo: user.todo }),
      });
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

    })
    .catch((error) => console.error("Erro:", error));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(handleUpdateHeader)();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateHeader)} className={styles.HeaderListDetail}>
      <input type="text" placeholder={title} {...register("name")} id={styles.title} onKeyPress={handleKeyPress} />

      <input type="text" placeholder={description} {...register("description")} id={styles.description} onKeyPress={handleKeyPress}/>

      {/* <button type="submit">Change</button> */}
    </form>
  );
};

export default HeaderListDetail;
