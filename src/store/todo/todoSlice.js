import { createSlice } from "@reduxjs/toolkit";
const initialTodoState = {
    todoList: [], todoSelected: {}, todoArraySelected: 0
};
// 1 - atualizar todoList pelo meu todo, sempre q eu for para dashboard
// 2- 

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        handleIndexArray(state, action) {
            state.todoArraySelected = action.payload
        },
        handleUpdateTodoList(state, action) {
            state.todoList = action.payload
        },
        handleSelectedTodo(state, action) {
            state.todoSelected = action.payload
        }
    }
})

export default todoSlice;
export const todoActions = todoSlice.actions;