// "use client";

import Form from "next/form";
import { createPost } from "@/app/posts/new/actions";

export default function NewPost() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-indigo-200 to-purple-300 shadow-xl rounded-xl">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8"> Create a New Post</h1>
      <Form action={createPost} className="space-y-8">
        <div className="relative">
          <label htmlFor="title" className="flex text-lg font-semibold mb-3 items-center">
            Title
            <span className="ml-2 px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full">
              Required
            </span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Give your post a standout title..."
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="relative">
          <label htmlFor="content" className="block text-lg font-semibold mb-3">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Share your thoughts, ideas, or latest updates..."
            rows={6}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-lg text-lg font-bold tracking-wide shadow-lg transform hover:scale-105 transition duration-300"
        >
          Publish Post
        </button>
      </Form>

      <div className="mt-6 text-center text-gray-700 text-sm italic">
        To write is human, to edit is divine. - Stephen King
      </div>
    </div>
  );
}
