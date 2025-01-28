import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { formatDate } from "../lib/utils"

export default function Home() {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt || "",
    }
  })

  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  // Get the featured (latest) post
  const featuredPost = sortedPosts[0]
  const otherPosts = sortedPosts.slice(1)

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Post</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <Link
              href={`/posts/${featuredPost.id}`}
              className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800 mb-2 block"
            >
              {featuredPost.title}
            </Link>
            <p className="text-gray-600 mb-4">{formatDate(featuredPost.date)}</p>
            <p className="text-gray-700">{featuredPost.excerpt}</p>
            <Link
              href={`/posts/${featuredPost.id}`}
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
            >
              Read more →
            </Link>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-6">Recent Posts</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {otherPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 mb-2 block"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 mb-4">{formatDate(post.date)}</p>
                <p className="text-gray-700">{post.excerpt}</p>
                <Link href={`/posts/${post.id}`} className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

