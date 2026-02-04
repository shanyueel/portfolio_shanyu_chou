import ViewAllHeader from "@/components/layout/ViewAllHeader"
import BlogPost from "@/components/features/BlogPost"
import { FadeInUpOnScroll } from "@/components/animations"
import type { BlogPostProps } from "@/lib/types"

interface BlogSectionProps {
  blog: BlogPostProps[]
}

/**
 * Recent Blog Posts 區塊 - 伺服器端元件
 */
export default function BlogSection({ blog }: BlogSectionProps) {
  const getTimeSafe = (dateStr: string | undefined) => {
    const date = new Date(dateStr ?? "")
    return isNaN(date.getTime()) ? 0 : date.getTime()
  }

  if (blog.length === 0) return null

  return (
    <FadeInUpOnScroll className="mt-16 mb-12">
      <ViewAllHeader title="Recent Blog Posts" pageUrl="/blog" itemCount={blog.length} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {blog
          .slice()
          .sort((a, b) => getTimeSafe(b.date) - getTimeSafe(a.date))
          .slice(0, 3)
          .map(post => (
            <BlogPost key={post.slug} {...post} />
          ))}
      </div>
    </FadeInUpOnScroll>
  )
}
