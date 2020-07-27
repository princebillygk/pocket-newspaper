import CONFIG from '../config/api';
import axios from 'axios';

const api = axios.create(CONFIG);

export interface IApiResponse<T> {
    status: number;
    error: boolean;
    msg: string;
    data: T;
}

export interface IApiPagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}
export default api;