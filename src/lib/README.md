# API Setup Documentation

This directory contains the API configuration and service functions for the Zephyratech website.

## Files Overview

### `api.ts`

- Axios instance configuration with base URL and default headers
- Request interceptor for adding authentication tokens
- Response interceptor for error handling and logging
- Automatic token management for 401 errors

### `queryClient.ts`

- React Query client configuration
- Default options for queries and mutations
- Retry logic and caching strategies
- Error handling configuration

### `services.ts`

- Generic API service functions (GET, POST, PUT, PATCH, DELETE)
- Specific service functions for different features:
    - `tourService` - Tour management
    - `packageService` - Package management
    - `userService` - User profile and bookings
    - `authService` - Authentication
    - `contactService` - Contact form handling

## Usage

### Basic Query Usage

```tsx
import { useTours } from "@/hooks/useApi";

const MyComponent = () => {
  const { data: tours, isLoading, error } = useTours();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {tours?.map((tour) => (
        <div key={tour.id}>{tour.name}</div>
      ))}
    </div>
  );
};
```

### Mutation Usage

```tsx
import { useCreateTour } from "@/hooks/useApi";

const CreateTourForm = () => {
  const createTour = useCreateTour({
    onSuccess: (data) => {
      console.log("Tour created:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = (formData) => {
    createTour.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={createTour.isPending}>
        {createTour.isPending ? "Creating..." : "Create Tour"}
      </button>
    </form>
  );
};
```

### Custom Query with Options

```tsx
import { useApiQuery } from "@/hooks/useApi";

const MyComponent = () => {
  const { data, isLoading } = useApiQuery(
    ["custom-data", userId],
    () => apiService.get(`/custom-endpoint/${userId}`),
    {
      enabled: !!userId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  // component logic
};
```

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Features

- **Automatic Token Management**: Tokens are automatically added to requests and cleared on 401 errors
- **Error Handling**: Comprehensive error handling with logging and user-friendly messages
- **Caching**: Intelligent caching with configurable stale times
- **Retry Logic**: Automatic retry for failed requests with exponential backoff
- **TypeScript Support**: Full TypeScript support with proper typing
- **DevTools**: React Query DevTools available in development mode

## Available Hooks

### Tour Hooks

- `useTours()` - Get all tours
- `useTour(id)` - Get tour by ID
- `useSearchTours(query, filters)` - Search tours
- `useCreateTour()` - Create new tour
- `useUpdateTour()` - Update tour
- `useDeleteTour()` - Delete tour

### Package Hooks

- `usePackages()` - Get all packages
- `usePackage(id)` - Get package by ID
- `usePackagesByCategory(category)` - Get packages by category
- `useCreatePackage()` - Create new package
- `useUpdatePackage()` - Update package
- `useDeletePackage()` - Delete package

### User Hooks

- `useUserProfile()` - Get user profile
- `useUserBookings()` - Get user bookings
- `useUpdateProfile()` - Update user profile
- `useCreateBooking()` - Create booking
- `useCancelBooking()` - Cancel booking

### Auth Hooks

- `useLogin()` - User login
- `useRegister()` - User registration
- `useLogout()` - User logout
- `useForgotPassword()` - Forgot password
- `useResetPassword()` - Reset password

### Contact Hooks

- `useSendMessage()` - Send contact message
- `useContactMessages()` - Get contact messages (admin)
- `useMarkMessageAsRead()` - Mark message as read
