/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { todoActions } from "../../store/todo/todoSlice";
import InputComponent from "../../components/UI/InputComponent/InputComponent";
import styles from "./styles.module.css";
import ButtonComponent from "../UI/ButtonComponent/ButtonComponent";
import check from "../../assets/check.svg";

const schema = yup
  .object({
    newItem: yup.string().required(),
  })
  .required();

const AddComponent = ({ actionButton }) => {
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const indexArray = useSelector((state) => state.todo.todoArraySelected);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
        console.log(data.todo[indexArray]);
        dispatch(todoActions.handleUpdateTodoList(data.todo));
        dispatch(todoActions.handleSelectedTodo(data.todo[indexArray]));
      })
      .catch((error) => console.error("Erro:", error));
  };

  return (
    <section className={styles.AddComponent}>
      <form
        onSubmit={handleSubmit(handleSubmitAdd)}
        className={styles.formContainer}
      >
        <InputComponent
          name="newItem"
          label="New item: "
          placeholder="Enter your another item your list"
          border="2px solid #FF9F1C5E"
          type="text"
          control={control}
        />
        {/* <ButtonComponent color="#FF1C1CA8">
          Cancel
        </ButtonComponent> */}
        <ButtonComponent color="#FF9F1C" width="59px" height="54px" marginBottom ='3px'>
          <img src={check} />
        </ButtonComponent>
      </form>
    </section>
  );
};

export default AddComponent;
