import { createSlice } from "@reduxjs/toolkit";
const initialTodoState = {
    todoList: [], todoSelected: {}
};
// 1 - atualizar todoList pelo meu todo, sempre q eu for para dashboard
// 2- 

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        handleGetTodoDetails(state, action) {
            const todoIndex = state.todoList.findIndex(
                (plant) => plant.id === action.payload
            );

            if (todoIndex >= 0) {
                state.todoSelected = state.todoList[todoIndex];
            } else {
                state.todoSelected = false;
            }
        },
        handleUpdateTodoList(state, action){
            state.todoList = action.payload
        },
        handleSelectedTodo(state, action){
            state.todoSelected = action.payload
        }
    }
})

export default todoSlice;
export const todoActions = todoSlice.actions;