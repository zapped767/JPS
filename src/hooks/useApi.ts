import {useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions,} from "@tanstack/react-query";
import {
    authService,
    blogsService,
    bookingService,
    contactService,
    dayTourService,
    inquiryService,
    packageService,
    reviewService,
    tourService,
    userService,
} from "@/lib/services";

// Generic hooks for API calls
export const useApiQuery = <T = any>(
    queryKey: (string | number)[],
    queryFn: () => Promise<T>,
    options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey,
        queryFn,
        ...options,
    });
};

export const useApiMutation = <TData = any, TVariables = any>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: UseMutationOptions<TData, Error, TVariables>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data, variables, onMutateResult, context) => {
            // Invalidate relevant queries after successful mutation
            queryClient.invalidateQueries();
            options?.onSuccess?.(data, variables, onMutateResult, context);
        },
        ...options,
    });
};

// Tour-related hooks
export const useTours = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["tours"], tourService.getTours, options);
};

export const useTour = (
    id: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["tours", id], () => tourService.getTourById(id), {
        enabled: !!id,
        ...options,
    });
};

export const useSearchTours = (
    query: string,
    filters?: any,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(
        ["tours", "search", query, filters],
        () => tourService.searchTours(query, filters),
        {
            enabled: !!query,
            ...options,
        }
    );
};

export const useCreateTour = (
    options?: UseMutationOptions<any, Error, any>
) => {
    return useApiMutation(tourService.createTour, options);
};

export const useUpdateTour = (
    options?: UseMutationOptions<any, Error, { id: string; data: any }>
) => {
    return useApiMutation(
        ({id, data}) => tourService.updateTour(id, data),
        options
    );
};

export const useDeleteTour = (
    options?: UseMutationOptions<any, Error, string>
) => {
    return useApiMutation(tourService.deleteTour, options);
};

// Package-related hooks
export const usePackages = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["packages"], packageService.getPackages, options);
};

export const usePackage = (
    slug: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(
        ["packages", slug],
        () => packageService.getPackageById(slug),
        {
            enabled: !!slug,
            ...options,
        }
    );
};

export const usePackagesByCategory = (
    category: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(
        ["packages", "category", category],
        () => packageService.getPackagesByCategory(category),
        {
            enabled: !!category,
            ...options,
        }
    );
};

export const useSearchPackages = (
    page: number = 0,
    size: number = 10,
    filters?: any,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(
        ["packages", "search", page, size, filters],
        () => packageService.searchPackages(page, size, filters),
        {
            ...options,
        }
    );
};

export const useCreatePackage = (
    options?: UseMutationOptions<any, Error, any>
) => {
    return useApiMutation(packageService.createPackage, options);
};

export const useUpdatePackage = (
    options?: UseMutationOptions<any, Error, { id: string; data: any }>
) => {
    return useApiMutation(
        ({id, data}) => packageService.updatePackage(id, data),
        options
    );
};

export const useDeletePackage = (
    options?: UseMutationOptions<any, Error, string>
) => {
    return useApiMutation(packageService.deletePackage, options);
};

// User-related hooks
export const useUserProfile = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["user", "profile"], userService.getProfile, options);
};

export const useUserBookings = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["user", "bookings"], userService.getBookings, options);
};

export const useUpdateProfile = (
    options?: UseMutationOptions<any, Error, any>
) => {
    return useApiMutation(userService.updateProfile, options);
};

export const useCreateBooking = (
    options?: UseMutationOptions<any, Error, any>
) => {
    return useApiMutation(userService.createBooking, options);
};

// Booking hooks
export const useBooking = (
    id: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["booking", id], () => bookingService.getBookingById(id), {
        enabled: !!id,
        ...options,
    });
};

export const useBook = (options?: UseMutationOptions<any, Error, any>) => {
    return useApiMutation(bookingService.createBooking, options);
};

export const useBookDayTour = (options?: UseMutationOptions<any, Error, any>) => {
    return useApiMutation(bookingService.createDayTourBooking, options);
};

export const useCancelBooking = (
    options?: UseMutationOptions<any, Error, string>
) => {
    return useApiMutation(userService.cancelBooking, options);
};

// Auth-related hooks
export const useLogin = (
    options?: UseMutationOptions<any, Error, { email: string; password: string }>
) => {
    return useApiMutation(authService.login, options);
};

export const useRegister = (options?: UseMutationOptions<any, Error, any>) => {
    return useApiMutation(authService.register, options);
};

export const useLogout = (options?: UseMutationOptions<any, Error, void>) => {
    return useApiMutation(authService.logout, options);
};

// Basic username/password login to POST /auth
export const useBasicLogin = (
    options?: UseMutationOptions<
        any,
        Error,
        { username: string; password: string }
    >
) => {
    return useApiMutation(authService.loginWithUsername, options);
};

export const useForgotPassword = (
    options?: UseMutationOptions<any, Error, string>
) => {
    return useApiMutation(authService.forgotPassword, options);
};

export const useResetPassword = (
    options?: UseMutationOptions<any, Error, { token: string; password: string }>
) => {
    return useApiMutation(
        ({token, password}) => authService.resetPassword(token, password),
        options
    );
};

// Contact-related hooks
export const useSendMessage = (
    options?: UseMutationOptions<
        any,
        Error,
        { name: string; email: string; message: string; subject?: string }
    >
) => {
    return useApiMutation(contactService.sendMessage, options);
};

export const useContactMessages = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(
        ["contact", "messages"],
        contactService.getMessages,
        options
    );
};

export const useMarkMessageAsRead = (
    options?: UseMutationOptions<any, Error, string>
) => {
    return useApiMutation(contactService.markAsRead, options);
};

/////////////////////////////////////////////////////////////////
// Home Page Hooks
export const usePopularPackages = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(
        ["packages", "popular"],
        packageService.getPopularPackages,
        options
    );
};

// Review-related hooks
export const useSubmitReview = (
    options?: UseMutationOptions<
        any,
        Error,
        { star: number; experience: string; image?: string }
    >
) => {
    return useApiMutation(reviewService.submitReview, options);
};

// Inquiry-related hooks
export const useSubmitInquiry = (
    options?: UseMutationOptions<
        any,
        Error,
        {
            fullName: string;
            email: string;
            mobileNumber: string;
            travelType: string;
            travelCategory: string;
            numberOfDays: number;
            preferredActivities: string;
            additionalNotes: string;
        }
    >
) => {
    return useApiMutation(inquiryService.submitInquiry, options);
};

export const useSubscribe = (
    options?: UseMutationOptions<any, Error, string>
) => {
    return useApiMutation(inquiryService.subscribe, options);
};

// Blogs-related hooks
export const useBlogs = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["blogs"], blogsService.getBlogs, options);
};

export const useBlog = (
    id: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["blogs", id], () => blogsService.getBlogById(id), {
        enabled: !!id,
        ...options,
    });
};

export const useBlogSlug = (
    slug: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["blogs", slug], () => blogsService.getBlogBySlug(slug), {
        ...options,
    });
};

// Day tour related hooks
export const useDayTour = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["day-tour"], dayTourService.getDayTours, options);
};

export const useDayTourSlug = (
    slug: string,
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["day-tour", slug], () => dayTourService.getDayTourBySlug(slug), {
        ...options,
    });
};

export const usePopularDayTours = (
    options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
    return useApiQuery(["day-tour", "popular"], dayTourService.getPopularDayTours, options);
};
