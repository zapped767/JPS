import {apiService} from "@/lib/services";

export interface PackageService {
    getPackages: () => Promise<any>;
    getPackageById: (id: string) => Promise<any>;
    createPackage: (data: any) => Promise<any>;
    updatePackage: (id: string, data: any) => Promise<any>;
    deletePackage: (id: string) => Promise<any>;
    searchPackages: (query: string, filters?: any) => Promise<any>;
    getPopularPackages: () => Promise<any>;
}

/**
 * Packages Service
 */
export const packageService: PackageService = {
    // Get all packages
    getPackages: () => apiService.get("/packages"),

    // Get package by ID
    getPackageById: (id: string) => apiService.get(`/package/${id}`),

    // Create new package
    createPackage: (data: any) => apiService.post("/packages", data),

    // Update package
    updatePackage: (id: string, data: any) =>
        apiService.put(`/packages/${id}`, data),

    // Delete package
    deletePackage: (id: string) => apiService.delete(`/packages/${id}`),

    // Search packages
    searchPackages: (query: string, filters?: any) =>
        apiService.get(`/packages/search?q=${encodeURIComponent(query)}`, {
            params: filters,
        }),

    // Get Popular Package
    getPopularPackages: () => apiService.get("package/popular"),
};
