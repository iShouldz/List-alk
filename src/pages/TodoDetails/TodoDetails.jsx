import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import AddComponent from "../../components/AddComponent/AddComponent";
import HeaderListDetail from "../../components/HeaderListDetail/HeaderListDetail";
import ButtonComponent from "../../components/UI/ButtonComponent/ButtonComponent";
import styles from "./styles.module.css";

const TodoDetails = () => {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const todoSelected = useSelector((state) => state.todo.todoSelected);
  // const { id } = useParams();
  // const todoId = parseInt(id);

  useEffect(() => {
    // dispatch(todoActions.handleGetTodoDetails(todoId));
    setIsFetching(false);
  }, [dispatch]);

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
              {todoSelected.todoItems.map((item) => {
                return (
                  <ButtonComponent
                    width="322px"
                    height="68px"
                    color="#D9D9D961"
                    key={item}
                  >
                    {item}
                  </ButtonComponent>
                );
              })}
            </div>

            <AddComponent />
          </section>
        </section>
      )}
    </>
  );
};

export default TodoDetails;
