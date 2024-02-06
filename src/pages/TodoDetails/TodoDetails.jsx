import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComponent from "../../components/AddComponent/AddComponent";
import HeaderListDetail from "../../components/HeaderListDetail/HeaderListDetail";

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

          <HeaderListDetail title={todoSelected.name} description={todoSelected.description}/>

          {todoSelected.todoItems.map((item) => {
            return <p key={item}>{item}</p>;
          })}

          <AddComponent />
        </section>
      )}
    </>
  );
};

export default TodoDetails;
