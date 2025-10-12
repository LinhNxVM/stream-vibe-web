import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import { authService } from '../services/authService';

const initialState: AuthState = {
    user: null,
    tokens: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

// Async thunks
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterRequest, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { auth: AuthState };
            const refreshToken = state.auth.tokens?.refreshToken;

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await authService.refreshToken(refreshToken);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Token refresh failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await authService.logout();
        } catch (error) {
            // Continue with logout even if API call fails
            console.warn('Logout API call failed:', error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearAuth: (state) => {
            state.user = null;
            state.tokens = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setTokens: (state, action: PayloadAction<AuthResponse['tokens']>) => {
            state.tokens = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.tokens = action.payload.tokens;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.tokens = action.payload.tokens;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            // Refresh Token
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.tokens = action.payload.tokens;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.user = null;
                state.tokens = null;
                state.isAuthenticated = false;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.tokens = null;
                state.isAuthenticated = false;
                state.error = null;
            });
    },
});

export const { clearError, clearAuth, setTokens } = authSlice.actions;
export default authSlice.reducer;