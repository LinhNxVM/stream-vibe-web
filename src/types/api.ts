export interface ApiError {
    message: string;
    status: number;
    field?: string;
}

export interface ApiResponse<T = any> {
    data?: T;
    error?: ApiError;
    success: boolean;
}