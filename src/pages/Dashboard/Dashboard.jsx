import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { todoActions } from "../../store/todo/todoSlice";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import TextAuth from "../../components/UI/TextAuth/TextAuth";
import filter from "../../assets/Filter.svg";
import styles from "./styles.module.css";

const Dashboard = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const [isFetching, setIsFetching] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
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

  const listaFiltrada = todoList.filter((todoObj) => {
    if (categoriaSelecionada === "all") return todoObj;
    return !categoriaSelecionada || todoObj.category === categoriaSelecionada;
  });

  return (
    <>
      {!isFetching && (
        <section className={styles.dashboardContainer}>
          <div className={styles.headerDashboard}>
            <TextAuth h1="Your lists" h3="All in one place" />

            <div className={styles.filterContainer}>
              <img src={filter} alt="filter icon" />
              <select
                name="choice"
                className={styles.selectComponent}
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
              >
                <option value="all">All</option>
                <option value="filmes">Filmes</option>
                <option value="musicas">Músicas</option>
                <option value="livros">Livros</option>
                <option value="series">Séries</option>
                <option value="viagens">Viagens</option>
                <option value="receitas">Receitas</option>
                <option value="exercicios">Exercícios</option>
                <option value="hobbies">Hobbies</option>
              </select>
            </div>
          </div>

          {listaFiltrada.length === 0 ? (
            <h2>Nothing to show, create a new list!</h2>
          ) : (
            <section className={styles.todoItensContainer}>
              {listaFiltrada.map((todoObj, index) => {
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

          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: '80px' }}>
            <ButtonComponent onClick={handleNewTodo} color="#FF9F1C">
              Add new list
            </ButtonComponent>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
