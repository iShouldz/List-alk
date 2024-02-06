import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import AddComponent from "../../components/AddComponent/AddComponent";
import HeaderListDetail from "../../components/HeaderListDetail/HeaderListDetail";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import styles from "./styles.module.css";
import { todoActions } from "../../store/todo/todoSlice";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";

const TodoDetails = () => {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const todoSelected = useSelector((state) => state.todo.todoSelected);
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const indexArray = useSelector((state) => state.todo.todoArraySelected);


  // const { id } = useParams();
  // const todoId = parseInt(id);

  useEffect(() => {
    // dispatch(todoActions.handleGetTodoDetails(todoId));
    setIsFetching(false);
  }, [dispatch]);

  const deleteItem = (index) => {
    fetch(`http://localhost:3000/users/${currentLogin}`)
      .then((response) => response.json())
      .then((user) => {
        user.todo[indexArray].todoItems.splice(index, 1);
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
    <>
      {!isFetching && (
        <section>
          <HeaderListDetail
            title={todoSelected.name}
            description={todoSelected.description}
          />

          <section className={styles.detailsContainer}>
            <div className={styles.todoItemContainer}>
              {todoSelected.todoItems.map((item, index) => {
                return (
                  <ButtonComponent
                    width="322px"
                    height="68px"
                    color="#D9D9D961"
                    key={item}
                    onClick={() => deleteItem(index)}
                  >
                    {item}
                  </ButtonComponent>
                );
              })}
            </div>

            <AddComponent />
            <CategoryComponent valueSelected={todoSelected.category} />
          </section>
        </section>
      )}
    </>
  );
};

export default TodoDetails;
