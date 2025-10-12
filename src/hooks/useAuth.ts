import { useAppSelector, useAppDispatch } from './redux';
import type { LoginRequest, RegisterRequest } from '../types/auth';
import { loginUser, registerUser, logoutUser, clearError } from '../store/authSlice';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, tokens, isLoading, error, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    const login = async (credentials: LoginRequest) => {
        const result = await dispatch(loginUser(credentials));
        return result;
    };

    const register = async (userData: RegisterRequest) => {
        const result = await dispatch(registerUser(userData));
        return result;
    };

    const logout = async () => {
        await dispatch(logoutUser());
    };

    const clearAuthError = () => {
        dispatch(clearError());
    };

    return {
        user,
        tokens,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        clearAuthError,
    };
};