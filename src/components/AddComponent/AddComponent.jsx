/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { todoActions } from "../../store/todo/todoSlice";

const schema = yup
  .object({
    newItem: yup.string().required(),
  })
  .required();

const AddComponent = ({ actionButton }) => {
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const indexArray = useSelector((state) => state.todo.todoArraySelected);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitAdd = (data) => {
    const { newItem } = data;
    

    fetch(`http://localhost:3000/users/${currentLogin}`)
      .then((response) => response.json())
      .then((user) => {
        user.todo[indexArray].todoItems.push(newItem);
        console.log(user);
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
        console.log(data.todo[indexArray])
        dispatch(todoActions.handleUpdateTodoList(data.todo));
        dispatch(todoActions.handleSelectedTodo(data.todo[indexArray]));
      })
      .catch((error) => console.error("Erro:", error));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleSubmitAdd)}>
        <label>
          New item
          <input type="text" {...register("newItem")} />
        </label>

        <button>Cancel</button>
        <button>Save list</button>
      </form>
    </section>
  );
};

export default AddComponent;
