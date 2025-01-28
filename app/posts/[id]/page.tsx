import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import Link from "next/link"
import { formatDate } from "../../../lib/utils"

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts")
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ""),
  }))
}

async function getPostData(id: string) {
  const fullPath = path.join(process.cwd(), "posts", `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id)

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <div className="text-gray-600 mb-8">{formatDate(postData.date)}</div>
      <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}

