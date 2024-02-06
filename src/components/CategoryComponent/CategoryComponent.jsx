/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup
  .object({
    select: yup.string().required(),
  })
  .required();

const CategoryComponent = ({ valueSelected='filmes' }) => {
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const indexArray = useSelector((state) => state.todo.todoArraySelected);
  const [selected, setSelected] = useState(valueSelected)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitSelect = (data) => {
    console.log(data);
    const { select } = data;
    fetch(`http://localhost:3000/users/${currentLogin}`)
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        user.todo[indexArray].category = select;

        return fetch(`http://localhost:3000/users/${currentLogin}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo: user.todo }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Erro:", error));
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSelect)}
      className={styles.formSelect}
    >
      <label id={styles.label}>Category:</label>
      <select
        name="choice"
        className={styles.selectComponent}
        {...register("select", { required: true })}
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        <option value="filmes">Filmes</option>
        <option value="musicas">Músicas</option>
        <option value="livros">Livros</option>
        <option value="series">Séries</option>
        <option value="viagens">Viagens</option>
        <option value="receitas">Receitas</option>
        <option value="exercicios">Exercícios</option>
        <option value="hobbies">Hobbies</option>
      </select>

      <button type="submit">submit</button>
    </form>
  );
};

export default CategoryComponent;
