"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Page() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // Track current route

  // Fetch boards from API
  async function fetchBoards() {
    try {
      const res = await fetch("/api/boards");
      const data = await res.json();
      setBoards(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  }

  // Refetch boards whenever route changes (like coming back from a board page)
  useEffect(() => {
    fetchBoards();
  }, [pathname]);

  // Create a new board
  async function createBoard() {
    if (!title.trim()) return;

    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, owner: "demo-user" }),
      });

      if (res.ok) {
        const newBoard = await res.json();
        setBoards((prev) => [newBoard, ...prev]); // Optimistically update list
        setTitle(""); // Clear input
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Delete a board
  async function deleteBoard(id) {
    try {
      const res = await fetch(`/api/boards/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBoards((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight">Your Boards</h1>
          <p className="text-zinc-400 mt-2">
            Organize your ideas, tasks, and collaborations in one place.
          </p>
        </div>

        {/* Create Board */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl mb-12 backdrop-blur">
          <p className="text-sm text-zinc-400 mb-3">
            Create a new workspace board
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="bg-black/60 border border-zinc-800 px-4 py-3 rounded-xl w-full outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="Ex: Product Roadmap, Startup Ideas..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={createBoard}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg shadow-indigo-500/20"
            >
              Create Board
            </button>
          </div>
        </div>

        {/* Boards List */}
        {boards.length === 0 ? (
          <div className="text-center py-16 border border-zinc-900 rounded-2xl bg-zinc-900/40">
            <p className="text-zinc-400 text-lg">No boards yet</p>
            <p className="text-zinc-500 text-sm mt-2">
              Create your first board to start organizing work.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {boards.map((board) => (
              <div
                key={board._id}
                onClick={() => router.push(`/board/${board._id}`)}
                className="group bg-zinc-900/70 backdrop-blur border border-zinc-800 p-6 rounded-2xl hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-200 cursor-pointer relative"
              >
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-zinc-200 group-hover:text-white">
                    {board.title}
                  </h2>

                  <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-70"></div>
                </div>

                <p className="text-xs text-zinc-500 mt-2">Click to open board</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening board
                    deleteBoard(board._id);
                  }}
                  className="text-sm text-zinc-500 mt-6 hover:text-red-400 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}