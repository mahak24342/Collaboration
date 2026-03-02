"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function BoardPage() {
  const router = useRouter();
  const { id } = useParams(); // board id

  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // single large textarea

  // Fetch board from DB
  const fetchBoard = async () => {
    try {
      const res = await fetch(`/api/boards/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setBoard(data);
      setTitle(data.title);
      // Combine all blocks content into single textarea
      setContent(data.blocks?.map(b => b.content).join("\n\n") || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) fetchBoard();
  }, [id]);

  // Save board content and title
  const saveBoard = async (updatedContent, updatedTitle) => {
    try {
      // Split content by double line breaks into blocks
      const updatedBlocks = updatedContent
        .split("\n\n")
        .filter(Boolean)
        .map((c) => ({ id: Date.now().toString() + Math.random(), content: c }));

      await fetch(`/api/boards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks: updatedBlocks, title: updatedTitle }),
      });

      setContent(updatedContent);
      setTitle(updatedTitle);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete whole board
  const deleteBoard = async () => {
    try {
      await fetch(`/api/boards/${id}`, { method: "DELETE" });
      router.push("/collab");
    } catch (err) {
      console.log(err);
    }
  };

  if (!board) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white flex items-center justify-center">
        <p className="text-zinc-400 animate-pulse">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/collab")}
            className="text-sm text-zinc-500 hover:text-indigo-400 transition mb-4"
          >
            ← Back to boards
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <input
              className="bg-zinc-900/60 border border-zinc-800 px-4 py-3 rounded-xl text-3xl font-semibold w-full outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              value={title}
              onChange={(e) => saveBoard(content, e.target.value)}
            />
          <button
  onClick={deleteBoard}
  className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-medium transition shadow-lg shadow-indigo-500/20 w-full sm:w-auto text-center whitespace-nowrap hover:bg-indigo-400 hover:text-white"
>
  Delete Board
</button>
          </div>

          <p className="text-zinc-400 text-sm mt-2">
            Changes are saved automatically.
          </p>
        </div>

        {/* Large Notion-style textarea */}
        <textarea
          value={content}
          onChange={(e) => saveBoard(e.target.value, title)}
          placeholder="Start writing your ideas..."
          className="w-full min-h-[500px] sm:min-h-[700px] bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-lg resize-none"
        />
      </div>
    </div>
  );
}