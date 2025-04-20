import { Status } from "./dashboard/enum";

export interface ApiResponse<T> {
    status: 'Success' | 'Error';
    data?: T;
    error?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface Filters {
    status?: Status; sortBy?: string; sortOrder?: SortOrder
}