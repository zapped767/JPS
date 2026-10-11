import type {NextApiRequest, NextApiResponse} from "next";
import formidable from "formidable";
import {promises as fs} from "fs";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

// Disable default body parser to handle file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

interface UploadResponse {
    success: boolean;
    url?: string;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UploadResponse>
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({success: false, error: "Method not allowed"});
    }

    try {
        // Get R2 credentials from environment variables
        // Note: In Next.js, server-side env vars don't need NEXT_PUBLIC_ prefix
        // But since these are VITE_ prefixed, we'll check both
        const accountId =
            process.env.VITE_R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
        const accessKeyId =
            process.env.VITE_R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
        const secretAccessKey =
            process.env.VITE_R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
        const bucketName =
            process.env.VITE_R2_BUCKET_NAME || process.env.R2_BUCKET_NAME;
        const cdnUrl = process.env.VITE_R2_CDN || process.env.R2_CDN;

        if (
            !accountId ||
            !accessKeyId ||
            !secretAccessKey ||
            !bucketName ||
            !cdnUrl
        ) {
            return res.status(500).json({
                success: false,
                error: "R2 credentials are not configured",
            });
        }

        // Parse form data using formidable
        const form = formidable({
            maxFileSize: 10 * 1024 * 1024, // 10MB limit
            keepExtensions: true,
        });

        const [fields, files] = await form.parse(req);
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const fileName = Array.isArray(fields.fileName)
            ? fields.fileName[0]
            : fields.fileName;
        const folder = Array.isArray(fields.folder)
            ? fields.folder[0]
            : fields.folder;

        if (!file) {
            return res
                .status(400)
                .json({success: false, error: "No file provided"});
        }

        // Initialize S3 client for R2
        const s3Client = new S3Client({
            region: "auto",
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
        });

        // Read file buffer
        const fileBuffer = await fs.readFile(file.filepath);
        const contentType = file.mimetype || "image/jpeg";
        const finalFileName =
            fileName || `${folder}/${Date.now()}-${file.originalFilename || "image"}`;

        // Upload to R2
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: finalFileName,
            Body: fileBuffer,
            ContentType: contentType,
        });

        await s3Client.send(command);

        // Clean up temporary file
        await fs.unlink(file.filepath);

        return res.status(200).json({
            success: true,
            url: finalFileName,
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Upload failed",
        });
    }
}
