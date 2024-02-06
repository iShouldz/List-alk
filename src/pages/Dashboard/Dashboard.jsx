import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { todoActions } from "../../store/todo/todoSlice";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import TextAuth from "../../components/UI/TextAuth/TextAuth";
import styles from './styles.module.css'

const Dashboard = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailsTodo = (todoObj, index) => {
    console.log(todoObj);
    dispatch(todoActions.handleSelectedTodo(todoObj));
    dispatch(todoActions.handleIndexArray(index));
    navigate(`/todo/${todoObj.id}`);
  };

  useEffect(() => {
    handleUpdateTodoState();
    setIsFetching(false);
  }, []);

  const handleUpdateTodoState = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${currentLogin}`
      );
      const users = await response.json();
      if (users.todo !== undefined) {
        dispatch(todoActions.handleUpdateTodoList(users.todo));
      } else {
        console.log("erro");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    //
  };

  const handleNewTodo = () => {
    const newList = {
      name: "Dummy list",
      description: "Dummy description",
      todoItems: ["This is a new list"],
      category: "",
      id: Math.random(),
    };
    console.log(currentLogin);

    fetch(`http://localhost:3000/users/${currentLogin}`)
      .then((response) => response.json())
      .then((user) => {
        user.todo.push(newList);
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
      .then((data) => console.log(data))
      .catch((error) => console.error("Erro:", error));
    dispatch(todoActions.handleSelectedTodo(newList));
    navigate(`/todo/${newList.id}`);
  };

  return (
    <>
      {!isFetching && (
        <section className={styles.dashboardContainer}>
          <TextAuth h1="Your lists" h3="All in one place" />
         
         {/*filtro */}
          {todoList.length === 0 ? (
            <h2>Nothing to show, create a new list!</h2>
          ) : (
            <section className={styles.todoItensContainer}>
              {todoList.map((todoObj, index) => {
                return (
                  <ButtonComponent
                    width="322px"
                    height="68px"
                    color="#D9D9D961"
                    className={styles.TodoItem}
                    key={todoObj.listName}
                    onClick={() => handleDetailsTodo(todoObj, index)}
                  >
                    {todoObj.name}
                  </ButtonComponent>
                );
              })}
            </section>
          )}

          <ButtonComponent onClick={handleNewTodo} color="#FF9F1C">
            Add new list
          </ButtonComponent>
        </section>
      )}
    </>
  );
};

export default Dashboard;
