import Image from "next/image";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/data/blogPosts";

interface RecentPostsProps {
  currentSlug: string;
}

const DEFAULT_BLOG_IMAGE = "/assets/img/blog/blog-thumb-1.jpg";

export default function RecentPosts({ currentSlug }: RecentPostsProps) {
  const otherPosts = blogPosts.filter((post) => post.slug !== currentSlug);

  return (
    <div className="tp-blog-widget mb-40">
      <h4 className="tp-blog-widget-title">Recent Posts</h4>
      <div className="tp-blog-widget-recent-post">
        {otherPosts.map((post) => (
          <div key={post.id} className="tp-blog-widget-recent-post-item mb-20">
            <div className="tp-blog-widget-recent-post-thumb">
              <Image
                src={post.image || DEFAULT_BLOG_IMAGE}
                alt={post.title}
                width={80}
                height={60}
              />
            </div>
            <div className="tp-blog-widget-recent-post-content">
              <h6>
                <Link href={post.slug}>{post.title}</Link>
              </h6>
              <span>{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
