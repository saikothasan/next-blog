import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Professional Markdown Blog",
  description: "A professional blog built with Next.js and Markdown",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col h-full`}>
        <header className="bg-white shadow-sm">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                  Professional Blog
                </Link>
              </div>
              <div className="ml-10 space-x-4">
                <Link href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
        <footer className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Professional Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

