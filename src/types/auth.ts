export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

export interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}