import type { LoginRequest, RegisterRequest, AuthResponse, AuthTokens } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || result.error || `HTTP error! status: ${response.status}`);
            }

            // Backend returns { status, message, data }, we want the data
            return result.status === 'success' && result.data ? result.data : result;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('An unexpected error occurred');
        }
    }

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        return this.makeRequest<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        return this.makeRequest<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        return this.makeRequest<AuthResponse>('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
        });
    }

    async logout(): Promise<void> {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            throw new Error('No access token found');
        }

        await this.makeRequest<void>('/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    }

    // Local storage helpers
    saveTokens(tokens: AuthTokens): void {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    getTokens(): AuthTokens | null {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
            return { accessToken, refreshToken };
        }

        return null;
    }

    clearTokens(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    // JWT token validation helpers
    isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }

    isAccessTokenValid(): boolean {
        const token = this.getAccessToken();
        return token ? !this.isTokenExpired(token) : false;
    }
}

export const authService = new AuthService();