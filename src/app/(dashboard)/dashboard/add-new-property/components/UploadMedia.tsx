"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadMedia() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const files = Array.from(input.files || []);
    if (!files.length) return;

    setIsLoading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      try {
        let token: string | null = localStorage.getItem("authToken");

        if (!token) {
          const cookieMatch = document.cookie
            .split(";")
            .map((c) => c.trim())
            .find((c) => c.startsWith("token="));

          token = cookieMatch ? cookieMatch.split("=")[1] : null;
        }

        const formData = new FormData();
        formData.append("images", file, file.name);

        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE ?? "http://159.223.92.101:3008";

        const res = await fetch(`${API_BASE}/api/images/upload-single`, {
          method: "POST",
          headers,
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text().catch(() => "");
          console.error("Upload failed:", errorText);
          continue;
        }

        const json = await res.json();

        const finalUrl =
          json?.data?.publicUrl ??
          json?.data?.public_url ??
          json?.data?.imageUrl ??
          json?.data?.image_url ??
          json?.data?.url ??
          json?.url ??
          null;

        if (finalUrl && typeof finalUrl === "string") {
          newUrls.push(finalUrl);
        }
      } catch (err) {
        console.error("Image upload error:", err);
      }
    }

    setUploadedUrls((prev) => [...prev, ...newUrls]);
    setIsLoading(false);

    e.target.value = "";
  };

  const removeImage = (url: string) => {
    setUploadedUrls((prev) => prev.filter((img) => img !== url));
  };

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Upload Media</h5>

      <div className="tp-dashboard-new-um">
        <div className="tp-dashboard-new-um-content">
          <span className="upload-btn">
            <input
              id="tp-dashboard-new-um-file-input"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={handleUpload}
              disabled={isLoading}
            />

            <label htmlFor="tp-dashboard-new-um-file-input">
              {isLoading ? "Uploading..." : "Add Photos"}
            </label>
          </span>

          <p>
            Add photos to get 5X more responses.
            <br /> 90% tenants contact on properties with photos.
          </p>
        </div>

        <input
          type="hidden"
          id="uploaded-images-input"
          name="uploadedImages"
          value={JSON.stringify(uploadedUrls)}
          readOnly
        />

        <div className="tp-dashboard-new-um-img-box d-flex">
          {uploadedUrls.map((img, index) => (
            <div key={img} className="tp-dashboard-new-um-img">
              <Image
                src={img}
                alt={`uploaded-image-${index + 1}`}
                unoptimized
                width={800}
                height={600}
              />

              <button type="button" onClick={() => removeImage(img)}>
                <i className="fal fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}