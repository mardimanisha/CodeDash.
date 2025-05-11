"use client";
import { getSupabaseClient } from "./supabaseClient";

/**
 * Uploads a file to Supabase Storage and returns its public URL.
 *
 * @param file - The file to be uploaded.
 * @param userId - The current authenticated user's ID.
 * @returns The public URL of the uploaded file.
 */
export async function uploadFile(file: File, userId: string): Promise<string> {
  const supabase = getSupabaseClient();
  const timestamp = Date.now();
  const path = `${userId}/${timestamp}-${file.name}`;

  // Upload file to 'qr-files' bucket
  const { error: uploadError } = await supabase.storage
    .from("qr-files")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Error uploading file:", uploadError.message);
    throw new Error("File upload failed");
  }

  // Get the public URL (no error returned from getPublicUrl)
  const { publicUrl } = supabase.storage
    .from("qr-files")
    .getPublicUrl(path).data;

  if (!publicUrl) {
    throw new Error("Failed to retrieve public URL");
  }

  return publicUrl;
}
