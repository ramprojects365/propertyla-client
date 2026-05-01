import Image from "next/image";
import image1 from "../../../../../../public/assets/img/listing/home-2/listing-2-1.jpg";

//const uploadedImages = [image1, image2, image3, image4];

export default function UploadMedia() {
  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Upload Media</h5>

      <div className="tp-dashboard-new-um">
        {/* Upload Area */}
        <div className="tp-dashboard-new-um-content">
          <span className="upload-btn">
            <input
              id="tp-dashboard-new-um-file-input"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={async (e) => {
                const input = e.target as HTMLInputElement;
                const files = Array.from(input.files || []);
                if (!files.length) return;

                // Collect uploaded public URLs here
                const uploadedUrls: string[] = [];

                for (const file of files) {
                  try {
                    // Ask your backend for a presigned upload URL for DigitalOcean Spaces.
                    // Your backend should call DO Spaces (S3 compatible) to generate a presigned PUT URL
                    // and return something like { uploadUrl, publicUrl }.
                    let token: string | null = null;
                    if (typeof window !== "undefined") {
                      token = localStorage.getItem("authToken");
                      if (!token) {
                        const cookieMatch = document.cookie
                          .split(";")
                          .map((c) => c.trim())
                          .find((c) => c.startsWith("token="));
                        token = cookieMatch ? cookieMatch.split("=")[1] : null;
                      }
                    }
                    console.log(token);
                    const headers: Record<string, string> = {
                      "Content-Type": "application/json",
                    };
                    if (token) headers.Authorization = `Bearer ${token}`;

                    // send as multipart/form-data like your Python requests example
                    const formData = new FormData();
                    formData.append("images", file, file.name);

                    // remove JSON content-type so the browser can set the multipart boundary
                    const formHeaders = { ...headers };
                    delete formHeaders["Content-Type"];
                    const API_BASE =
                      process.env.NEXT_PUBLIC_API_BASE ??
                      "http://159.223.92.101:3008";
                    const uploadUrl = `${API_BASE}/api/images/upload-single`;
                    const presignRes = await fetch(uploadUrl, {
                      method: "POST",
                      headers: formHeaders,
                      // If your backend uses cookie-based auth, uncomment the next line:
                      // credentials: "include",
                      body: formData,
                    });

                    // Try to detect common shapes: backend returns final public URL, or returns { uploadUrl, publicUrl }, or returns a presigned PUT URL.
                    let finalUrl: string | null = null;

                    try {
                      const contentType =
                        presignRes.headers.get("content-type") || "";

                      if (contentType.includes("application/json")) {
                        const json = await presignRes.json().catch(() => null);
                        console.log(json);
                        // If backend already returned a public URL
                        finalUrl =
                          json?.data?.publicUrl ??
                          json?.data?.public_url ??
                          json?.url ??
                          json?.data?.imageUrl ??
                          json?.data?.image_url ??
                          json?.data?.url ??
                          null;
                        console.log(finalUrl);
                        // If backend returned presigned upload URL (uploadUrl) do the actual PUT
                        const uploadUrl =
                          json?.uploadUrl ??
                          json?.upload_url ??
                          json?.putUrl ??
                          json?.put_url ??
                          null;
                        if (!finalUrl && uploadUrl) {
                          const putRes = await fetch(uploadUrl, {
                            method: "PUT",
                            headers: {
                              "Content-Type":
                                file.type || "application/octet-stream",
                            },
                            body: file,
                          });
                          if (!putRes.ok)
                            throw new Error(
                              "Failed to upload file to presigned URL",
                            );

                          // Many S3/Spaces presigned PUT URLs are public at the same path without the query string
                          finalUrl = uploadUrl.split("?")[0];
                        }
                      } else {
                        // If response is plain text, it might be the public URL
                        const text = (
                          await presignRes.text().catch(() => "")
                        ).trim();
                        if (text && /^https?:\/\//i.test(text)) {
                          finalUrl = text;
                        }
                      }
                    } catch (err) {
                      console.warn("Error handling upload response:", err);
                    }

                    // Fallback: if presignRes was OK but we couldn't detect a URL, try to treat the response as text URL
                    if (!finalUrl && presignRes.ok) {
                      const maybeText = (
                        await presignRes.text().catch(() => "")
                      ).trim();
                      if (maybeText && /^https?:\/\//i.test(maybeText))
                        finalUrl = maybeText;
                    }

                    if (!finalUrl) {
                      console.error(
                        "Could not determine public URL for uploaded file",
                      );
                      continue;
                    }

                    // Save the final URL in the list used later
                    uploadedUrls.push(finalUrl);

                    // Immediately append a preview to the DOM so the user sees the uploaded image without a React state change
                    try {
                      const previewContainer = document.querySelector(
                        ".tp-dashboard-new-um-img-box.d-flex",
                      ) as HTMLElement | null;
                      if (previewContainer) {
                        const wrapper = document.createElement("div");
                        wrapper.className = "tp-dashboard-new-um-img";

                        const imgEl = document.createElement("img");
                        imgEl.src = finalUrl;
                        imgEl.alt = `uploaded-image-${Date.now()}`;

                        const btn = document.createElement("button");
                        btn.type = "button";
                        btn.innerHTML = '<i class="fal fa-trash-alt"></i>';
                        // optional: wire up delete to remove preview and remove from hidden input value
                        btn.addEventListener("click", () => {
                          wrapper.remove();
                          const hiddenEl = document.getElementById(
                            "uploaded-images-input",
                          ) as HTMLInputElement | null;
                          if (hiddenEl && hiddenEl.value) {
                            try {
                              const arr = JSON.parse(
                                hiddenEl.value,
                              ) as string[];
                              const idx = arr.indexOf(finalUrl!);
                              if (idx !== -1) {
                                arr.splice(idx, 1);
                                hiddenEl.value = JSON.stringify(arr);
                              }
                            } catch {}
                          }
                        });

                        wrapper.appendChild(imgEl);
                        wrapper.appendChild(btn);
                        previewContainer.appendChild(wrapper);
                      }
                    } catch (err) {
                      console.warn("Could not append preview element:", err);
                    }

                    // If the backend already handled the upload and returned the final image URL
                    // detect common shapes (JSON with url/publicUrl/imageUrl or plain text URL)
                    // Use Response.clone() so the existing parsing logic below can still read the original response.
                    try {
                      const clone = presignRes.clone();
                      const contentType =
                        presignRes.headers.get("content-type") || "";

                      if (contentType.includes("application/json")) {
                        const json = await clone.json().catch(() => null);
                        const immediateUrl =
                          json?.publicUrl ??
                          json?.public_url ??
                          json?.url ??
                          json?.imageUrl ??
                          json?.image_url ??
                          json?.data?.url ??
                          null;
                        console.log(immediateUrl);
                        if (immediateUrl && typeof immediateUrl === "string") {
                          uploadedUrls.push(immediateUrl);
                          continue; // skip the presigned PUT upload since the image is already hosted
                        }
                      } else {
                        const text = (
                          await clone.text().catch(() => "")
                        ).trim();
                        if (text && /^https?:\/\//i.test(text)) {
                          uploadedUrls.push(text);
                          continue;
                        }
                      }
                    } catch (err) {
                      // If detection fails, fall back to the existing presign + upload flow below.
                      console.warn(
                        "Could not auto-detect immediate URL from upload response:",
                        err,
                      );
                    }
                    console.log("Presign fetch response:", presignRes);
                    if (!presignRes.ok) {
                      const errText = await presignRes.text().catch(() => null);
                      console.error("Presign error body:", errText);
                      throw new Error("Failed to get upload URL");
                    }
                  } catch (err) {
                    console.error("Image upload error:", err);
                    // optionally surface error to user
                  }
                }

                // Upload URL / publicUrl handling removed — backend now returns final public URLs directly.
                // uploadedUrls already contains the final accessible image URLs.
                let hidden = document.getElementById(
                  "uploaded-images-input",
                ) as HTMLInputElement | null;
                if (!hidden) {
                  hidden = document.createElement("input");
                  hidden.type = "hidden";
                  hidden.id = "uploaded-images-input";
                  hidden.name = "uploadedImages";
                  (input.closest("form") ?? document.body).appendChild(hidden);
                }
                hidden.value = JSON.stringify(uploadedUrls);

                // reset input so same file can be picked again if needed
                input.value = "";
              }}
            />
            <label htmlFor="tp-dashboard-new-um-file-input">Add Photos</label>
          </span>
          <p>
            Add photos to get 5X more responses.
            <br /> 90% tenants contact on properties with photos.
          </p>
        </div>

        {/* Image Preview Area */}
        <div className="tp-dashboard-new-um-img-box d-flex">
          {(() => {
            // read any uploaded image URLs stored in the hidden input (set by your onChange handler)
            let extra: string[] = [];
            if (typeof document !== "undefined") {
              const hidden = document.getElementById(
                "uploaded-images-input",
              ) as HTMLInputElement | null;
              if (hidden && hidden.value) {
                try {
                  const parsed = JSON.parse(hidden.value);
                  if (Array.isArray(parsed)) extra = parsed;
                } catch (e) {
                  console.warn(
                    "Could not parse uploaded-images-input value",
                    e,
                  );
                }
              }
            }

            const combined: (string | typeof image1)[] = [...extra];

            return combined.map((img, index) => {
              const isString = typeof img === "string";
              return (
                <div key={index} className="tp-dashboard-new-um-img">
                  {isString ? (
                    // Use Next.js Image for external URLs to satisfy the linter; use unoptimized to avoid custom loader configuration
                    // Add a className to match styling
                    <Image
                      src={img as string}
                      alt={`uploaded-image-${index + 1}`}
                      unoptimized
                      width={800}
                      height={600}
                    />
                  ) : (
                    // Imported static images include width/height so Next.js Image is fine
                    <Image src={img} alt={`uploaded-image-${index + 1}`} />
                  )}
                  <button type="button">
                    <i className="fal fa-trash-alt"></i>
                  </button>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
