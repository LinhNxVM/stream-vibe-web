import { authService } from './authService';
import { store } from '../store';
import { refreshToken, clearAuth } from '../store/authSlice';

class ApiClient {
    private async makeRequest<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        let accessToken = authService.getAccessToken();

        // Check if access token is expired and refresh if needed
        if (accessToken && authService.isTokenExpired(accessToken)) {
            try {
                await store.dispatch(refreshToken()).unwrap();
                accessToken = authService.getAccessToken();
            } catch (error) {
                // If refresh fails, clear auth and redirect to login
                store.dispatch(clearAuth());
                throw new Error('Session expired. Please log in again.');
            }
        }

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(url, config);
        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                // Token is invalid, clear auth
                store.dispatch(clearAuth());
                throw new Error('Authentication failed. Please log in again.');
            }
            throw new Error(result.message || result.error || `HTTP error! status: ${response.status}`);
        }

        // Backend returns { status, message, data }, we want the data
        return result.status === 'success' && result.data ? result.data : result;
    }

    async get<T>(endpoint: string): Promise<T> {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        return this.makeRequest<T>(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        return this.makeRequest<T>(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: unknown): Promise<T> {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        return this.makeRequest<T>(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        return this.makeRequest<T>(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
    }
}

export const apiClient = new ApiClient();