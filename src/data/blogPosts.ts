export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "costly-mistakes",
    title: "Costly Mistakes Malaysians Make When Buying Property",
    slug: "/blog/costly-mistakes-malaysians-make-when-buying-property",
    image: "/assets/img/blog/blog-thumb-1.png",
    readTime: "5 min read",
  },
  {
    id: "foreign-investors",
    title: "Foreign Investors Still Interested in Malaysian Property (2026)",
    slug: "/blog/foreign-investors-still-interested-in-malaysian-property",
    image: "/assets/img/blog/blog-thumb-2.png",
    readTime: "4 min read",
  },
  {
    id: "stamp-duty",
    title: "Stamp Duty in Malaysia Property (2026): Complete Guide",
    slug: "/blog/Stamp-Duty-in-Malaysia-Property",
    image: "/assets/img/blog/blog-thumb-3.png",
    readTime: "6 min read",
  },
  {
    id: "best-places-selangor",
    title: "Best Places to Buy Property in Selangor (2026)",
    slug: "/blog/best-places-to-buy-property-in-Selangor",
    image: "/assets/img/blog/blog-thumb-2.png",
    readTime: "7 min read",
  },
];
