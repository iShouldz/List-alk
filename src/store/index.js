import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todoSlice";
import loginSlice from "./login/loginSlice";
const store = configureStore({
    reducer: { todo: todoSlice.reducer, login: loginSlice.reducer },
});

export default store;