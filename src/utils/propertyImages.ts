export interface PropertyImageLike {
  url?: string;
  imageUrl?: string;
  src?: string;
  isCover?: boolean;
  order?: number;
}

export const getPropertyImageUrl = (image: unknown): string | null => {
  if (typeof image === "string" && image.trim()) return image;

  if (!image || typeof image !== "object" || Array.isArray(image)) return null;

  const item = image as PropertyImageLike;
  const url = item.url || item.imageUrl || item.src;

  return typeof url === "string" && url.trim() ? url : null;
};

export const getPropertyImageUrls = (images: unknown): string[] => {
  if (!Array.isArray(images)) return [];

  return images
    .map(getPropertyImageUrl)
    .filter((url): url is string => Boolean(url));
};

export const getCoverImageUrl = (images: unknown): string | null => {
  if (!Array.isArray(images) || images.length === 0) return null;

  const cover = images.find(
    (image) => image && typeof image === "object" && !Array.isArray(image) && Boolean((image as PropertyImageLike).isCover),
  );

  return getPropertyImageUrl(cover) || getPropertyImageUrl(images[0]);
};
