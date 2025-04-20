
export interface ApiResponse<T> {
    status: 'Success' | 'Error';
    data?: T;
    error?: string;
}