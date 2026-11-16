
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Extract user information from common API response formats
const getUserFromResponse = (response) => {
    return (
        response.user ||
        response.data?.user ||
        response.data?.data?.user ||
        response.data?.data ||
        null
    );
};

// REGISTER
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/register", userData);

            return {
                user: getUserFromResponse(response.data),
                message: response.data.message || "Registration successful"
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", loginData);

            return {
                user: getUserFromResponse(response.data),
                message: response.data.message || "Login successful"
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        message: null
    },

    reducers: {
        clearAuthMessages: (state) => {
            state.error = null;
            state.message = null;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.message = null;
        }
    },

    extraReducers: (builder) => {
        builder

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = Boolean(action.payload.user);
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearAuthMessages, logout } = authSlice.actions;

export default authSlice.reducer;
