/* eslint-disable no-unused-vars */
import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import AddComponent from "../../components/AddComponent/AddComponent";
import HeaderListDetail from "../../components/HeaderListDetail/HeaderListDetail";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import styles from "./styles.module.css";
import { todoActions } from "../../store/todo/todoSlice";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import { useNavigate } from "react-router-dom";

const TodoDetails = () => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const todoSelected = useSelector((state) => state.todo.todoSelected);
  const currentLogin = useSelector((state) => state.login.currentLogin);
  const indexArray = useSelector((state) => state.todo.todoArraySelected);

  // const { id } = useParams();
  // const todoId = parseInt(id);

  // useEffect(() => {
  //   // dispatch(todoActions.handleGetTodoDetails(todoId));
  //   setIsFetching(false);
  // }, [dispatch]);

  const deleteItem = (index) => {
    fetch(`https://json-server-liskalk.vercel.app/users/${currentLogin}`)
      .then((response) => response.json())
      .then((user) => {
        user.todo[indexArray].todoItems.splice(index, 1);
        console.log(user);
        return fetch(`https://json-server-liskalk.vercel.app/users/${currentLogin}`, {
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

  const handleDeleteList = () => {
    const itemId = todoSelected.id 
    fetch(`https://json-server-liskalk.vercel.app/users/${currentLogin}`)
      .then(response => response.json())
      .then(user => {
        const index = user.todo.findIndex(item => item.id === itemId);
        if (index !== -1) {
          user.todo.splice(index, 1);
    
          fetch(`https://json-server-liskalk.vercel.app/users/${currentLogin}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: user.todo }),
          })
          .then(response => response.json())
          .then(data => {
            navigate("/dashboard")
            console.log('Item excluído com sucesso:', data);
          })
          .catch(error => console.error('Erro ao excluir item:', error));
        } else {
          console.error('Item não encontrado');
        }
      })
      .catch(error => console.error('Erro ao obter dados do usuário:', error));
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <AddComponent />
                <CategoryComponent valueSelected={todoSelected.category} />
              </div>

              <section className={styles.btnContainer}>
                <ButtonComponent color="#FF1C1CA8" onClick={handleDeleteList}>
                  {todoSelected.name === "Dummy list"
                    ? "Cancel"
                    : "Delete list"}
                </ButtonComponent>
                <ButtonComponent
                  color="#FF9F1C"
                  form="categoryForm"
                  type="submit"
                  // }
                >
                  Save list
                </ButtonComponent>
              </section>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default TodoDetails;
