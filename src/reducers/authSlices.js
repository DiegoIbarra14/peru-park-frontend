import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginService from "../Services/LoginService";
import { history } from "../history";

const initialState = {
    authenticated: JSON.parse(localStorage.getItem("authenticated")) || false,
    accesos: JSON.parse(localStorage.getItem("accesos")) || null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    loading: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authenticated = false;
            state.accesos = null;
            state.token = null;
            localStorage.removeItem("accesos");
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            history.navigate('/login');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.fulfilled, (state, { payload: { data } }) => {
                console.log("dasa", data)
                localStorage.setItem("token", JSON.stringify(data.token));
                localStorage.setItem("id", JSON.stringify(data.id));
                localStorage.setItem("accesos", JSON.stringify(data?.rol?.accesos));
                state.authenticated = true; // Cambia authenticated a true si el login es exitoso
                state.accesos = data?.rol?.accesos;
                state.token = data?.token;
                state.loading = false;
               
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const signInUser = createAsyncThunk('signInUser', async (body, { rejectWithValue }) => {
    try {
        const response = await LoginService.login(body)
        return response
    } catch (error) {
        return rejectWithValue(err.response.data);
    }
    return;
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
