import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { todoActions } from "../../store/todo/todoSlice";

const Dashboard = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailsTodo = (todoObj) => {
    console.log(todoObj)
    dispatch(todoActions.handleSelectedTodo(todoObj))
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
      console.log(users.todo);
      if (users.todo !== undefined) {
        console.log("entrou");
        dispatch(todoActions.handleUpdateTodoList(users.todo));
      } else {
        console.log("erro");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    //
  };

  return (
    <>
      {!isFetching && (
        <>
          <section>
            <h1>Your lists</h1>
            <p>All in one place</p>
          </section>

          {todoList.length === 0 ? (
            <h2>Nothing to show, create a new list!</h2>
          ) : (
            todoList.map((todoObj) => {
              return (
                <button
                  key={todoObj.listName}
                  onClick={() => handleDetailsTodo(todoObj)}
                >
                  {todoObj.name}
                </button>
              );
            })
          )}

          <button onClick={() => navigate("/newTodo")}>Add new list</button>
        </>
      )}
    </>
  );
};

export default Dashboard;
