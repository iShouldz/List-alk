import { createSlice } from "@reduxjs/toolkit";
const initialLoginState = {currentLogin: '', currentUsername: ''};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        handleSetCurrentLogin(state, actions){
            state.currentLogin = actions.payload
        },
        handleSetCurrentUsername(state, actions){
            state.currentUsername = actions.payload
        }
    }
})

export default loginSlice;
export const loginActions = loginSlice.actions;