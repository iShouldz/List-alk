import { createSlice } from "@reduxjs/toolkit";
const initialTodoState = { todoList: [] };

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {

    }
})

export default todoSlice;
export const todoActions = todoSlice.actions;