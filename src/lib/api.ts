import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig,} from "axios";
import {getDefaultStore} from "jotai";
import {isLoggedInAtom} from "./atoms";

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const setAuthToken = (token?: string) => {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
};

if (typeof window !== "undefined") {
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
        setAuthToken(existingToken);
    }
}

//  Request  interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
            console.log(config.url);
            if (token && config.url !== "/auth") {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                delete config.headers.Authorization;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const {status} = error.response;

            if (status === 401 && typeof window !== "undefined") {
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
                setAuthToken();
                // Update login status atom
                const store = getDefaultStore();
                store.set(isLoggedInAtom, false);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
