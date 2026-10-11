import api from "./api";

// Types for API responses
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Generic API service functions
export const apiService = {
    // GET request
    get: async <T = any>(url: string, config?: any): Promise<T> => {
        const response = await api.get<ApiResponse<T>>(url, config);
        return response.data.data;
    },

    // POST request
    post: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
        try {
            const response = await api.post<ApiResponse<T>>(url, data, config);
            return response.data.data;
        } catch (error: any) {
            // Re-throw the error so React Query can handle it
            throw error;
        }
    },

    // PUT request
    put: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
        const response = await api.put<ApiResponse<T>>(url, data, config);
        return response.data.data;
    },

    // PATCH request
    patch: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
        const response = await api.patch<ApiResponse<T>>(url, data, config);
        return response.data.data;
    },

    // DELETE request
    delete: async <T = any>(url: string, config?: any): Promise<T> => {
        const response = await api.delete<ApiResponse<T>>(url, config);
        return response.data.data;
    },
};

// Specific service functions for your application
export const tourService = {
    // Get all tours
    getTours: () => apiService.get("/tours"),

    // Get tour by ID
    getTourById: (id: string) => apiService.get(`/tours/${id}`),

    // Create new tour
    createTour: (data: any) => apiService.post("/tours", data),

    // Update tour
    updateTour: (id: string, data: any) => apiService.put(`/tours/${id}`, data),

    // Delete tour
    deleteTour: (id: string) => apiService.delete(`/tours/${id}`),

    // Search tours
    searchTours: (query: string, filters?: any) =>
        apiService.get(`/tours/search?q=${encodeURIComponent(query)}`, {
            params: filters,
        }),
};

export const packageService = {
    // Get all packages
    getPackages: () => apiService.get("/packages"),

    // Get package by ID
    getPackageById: (slug: string) => apiService.get(`/package/${slug}`),

    // Get packages by category
    getPackagesByCategory: (category: string) =>
        apiService.get(`/packages/category/${category}`),

    // Search packages with pagination
    searchPackages: (page: number = 0, size: number = 10, filters?: any) =>
        apiService.post(`/package/search?page=${page}&size=${size}`, {
            params: filters,
        }),

    // Create new package
    createPackage: (data: any) => apiService.post("/packages", data),

    // Update package
    updatePackage: (id: string, data: any) =>
        apiService.put(`/packages/${id}`, data),

    // Delete package
    deletePackage: (id: string) => apiService.delete(`/packages/${id}`),

    // Get popular packages
    getPopularPackages: () => apiService.get("package/popular"),
};

export const userService = {
    // Get user profile
    getProfile: () => apiService.get("/user/profile"),

    // Update user profile
    updateProfile: (data: any) => apiService.put("/user/profile", data),

    // Get user bookings
    getBookings: () => apiService.get("/user/bookings"),

    // Create booking
    createBooking: (data: any) => apiService.post("/user/bookings", data),

    // Cancel booking
    cancelBooking: (id: string) => apiService.delete(`/user/bookings/${id}`),
};

export const authService = {
    // Login
    login: (credentials: { email: string; password: string }) =>
        apiService.post("/auth/login", credentials),

    // Basic login (username/password) -> POST /auth
    loginWithUsername: (credentials: { username: string; password: string }) =>
        apiService.post("/auth", credentials),

    // Register
    register: (userData: any) => apiService.post("/auth/register", userData),

    // Logout
    logout: () => apiService.post("/auth/logout"),

    // Refresh token
    refreshToken: () => apiService.post("/auth/refresh"),

    // Forgot password
    forgotPassword: (email: string) =>
        apiService.post("/auth/forgot-password", {email}),

    // Reset password
    resetPassword: (token: string, password: string) =>
        apiService.post("/auth/reset-password", {token, password}),
};

export const contactService = {
    // Send contact message
    sendMessage: (data: {
        name: string;
        email: string;
        message: string;
        subject?: string;
    }) => apiService.post("/contact", data),

    // Get contact messages (admin only)
    getMessages: () => apiService.get("/contact/messages"),

    // Mark message as read
    markAsRead: (id: string) => apiService.patch(`/contact/messages/${id}/read`),
};

export const bookingService = {
    // Get booking by ID/reference
    getBookingById: (id: string) => apiService.get(`/book/${id}/ref`),

    // Create booking (/book)
    createBooking: (data: any) => apiService.post("/book", data),

    //create day tour booking (/book/day-tour)
    createDayTourBooking: (data: any) => apiService.post("/book/day-tour", data),
};

export const reviewService = {
    // Submit review
    submitReview: (data: { star: number; experience: string; image?: string }) =>
        apiService.post("/review", data),
};

export const inquiryService = {
    // Submit inquiry
    submitInquiry: (data: {
        fullName: string;
        email: string;
        mobileNumber: string;
        travelType: string;
        travelCategory: string;
        numberOfDays: number | undefined;
        preferredActivities: string | undefined;
        additionalNotes: string | undefined;
    }) => apiService.post("/inquiry", data),

    // Subscribe to newsletter
    subscribe: (email: string) =>
        apiService.post(`/inquiry/subscribe?email=${encodeURIComponent(email)}`),
};

export const partnershipInquiryService = {
    // Submit partnership inquiry
    submitInquiry: (data: {
        companyName: string;
        yourName: string | undefined;
        email: string;
        phoneNumber: string | undefined;
        country: string | undefined;
        partnershipType: string | undefined;
        partnershipNeeds: string | undefined;
    }) => apiService.post("/partnership-inquiry", data),
};

export const blogsService = {
    // Get all blogs
    getBlogs: () => apiService.get("/blogs-and-news"),

    // Get blog by ID
    getBlogById: (id: string) => apiService.get(`/blogs-and-news/${id}`),

    // Get blog by slug
    getBlogBySlug: (slug: string) => apiService.get(`/blogs-and-news/view-blog/${slug}`),

};

export const dayTourService = {
    // Get all day tours
    getDayTours: () => apiService.get("/day-tour"),

    // Get day tour by slug
    getDayTourBySlug: (slug: string) => apiService.get(`/day-tour/${slug}`),

    // Get popular day tours
    getPopularDayTours: () => apiService.get("day-tour/popular"),
};
