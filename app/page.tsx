"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
  author?: {
    name: string;
  };
}

// Disable static generation
export const dynamic = "force-dynamic";

function PostsList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts?page=${page}`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 min-h-[200px]">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 animate-pulse">Fetching the latest posts...</p>
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <p className="text-gray-600 text-center font-semibold">No posts available. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mt-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative border-0 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 via-white to-pink-100 p-8 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="absolute -top-4 -right-4 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-full w-16 h-16 opacity-20 blur-2xl pointer-events-none"></div>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-2xl font-extrabold text-gray-900 mb-2 hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500 mb-1">
                    by <span className="font-semibold">{post.author?.name || "Anonymous"}</span>
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex-1" />
                  <Link
                    href={`/posts/${post.id}`}
                    className="inline-block mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-blue-500 transition-all"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-4 mt-12">
            {page > 1 && (
              <Link href={`/posts?page=${page - 1}`}>
                <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full shadow hover:from-pink-500 hover:to-blue-500 transition-all">
                  Previous
                </button>
              </Link>
            )}
            {page < totalPages && (
              <Link href={`/posts?page=${page + 1}`}>
                <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full shadow hover:from-pink-500 hover:to-blue-500 transition-all">
                  Next
                </button>
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 mb-8 drop-shadow-lg">
        Latest Posts
      </h1>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-600 font-semibold">Loading page...</p>
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </div>
  );
}