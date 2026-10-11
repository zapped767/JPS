/**
 * Image Upload Service for Cloudflare R2
 * Uses server-side API endpoint to handle uploads securely
 */


/**
 * Upload image to Cloudflare R2
 * @param file - The file to upload
 * @param folder - Optional folder path (e.g., 'reviews', 'experiences')
 * @returns Promise with upload result containing the CDN URL
 */
export const uploadImageToR2 = async (
    file: File,
    folder: string
): Promise<string> => {
    try {
        const ENV = process.env.NEXT_PUBLIC_ENV || process.env.NEXT_PUBLIC_ENV;
        const now = new Date()
        const datePart = now.toISOString().split('T')[0] // YYYY-MM-DD
        const timePart = now.toTimeString().split(' ')[0] // HH:MM:SS
        const fileExtension = file.name.split('.').pop()
        const fileName = `${ENV}/${folder}/${datePart}/${timePart}.${fileExtension}`


        // Create form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("folder", folder);

        // Upload via API endpoint
        const response = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
        });


        let path = fileName;

        if (!response.ok) {
            path = "N/A"
        }

        const data = await response.json();

        if (!data.success) {
            path = "N/A"
        }

        return path;

    } catch (error) {
        return "N/A";
    }
};

/**
 * Upload multiple images
 */
export const uploadMultipleImages = async (
    files: File[],
    folder: string
): Promise<string[]> => {
    const uploadPromises = files.map((file) => uploadImageToR2(file, folder));
    return Promise.all(uploadPromises);
};
