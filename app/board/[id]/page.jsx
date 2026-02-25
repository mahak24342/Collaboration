"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function BoardPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // board id from route

  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([]);

  // Fetch board title from API
  async function fetchBoard() {
    try {
      const res = await fetch(`/api/boards/${id}`);
      if (!res.ok) return;

      const data = await res.json();
      setBoard(data);
      setTitle(data.title);

      // Load blocks from localStorage if exists, else from DB
      const savedBlocks = localStorage.getItem(`board-blocks-${id}`);
      if (savedBlocks) {
        setBlocks(JSON.parse(savedBlocks));
      } else {
        setBlocks(data.blocks || []);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (id) fetchBoard();
  }, [id]);

  // Delete the whole board
  async function deleteBoard() {
    try {
      await fetch(`/api/boards/${id}`, { method: "DELETE" });
      localStorage.removeItem(`board-blocks-${id}`); // clean localStorage
      router.push("/collab");
    } catch (err) {
      console.log(err);
    }
  }

  // Update block content and save to localStorage immediately
  const updateBlock = (blockId, content) => {
    const updatedBlocks = blocks.map((b) =>
      b.id === blockId ? { ...b, content } : b
    );
    setBlocks(updatedBlocks);
    localStorage.setItem(`board-blocks-${id}`, JSON.stringify(updatedBlocks));
  };

  // Delete individual block
  const deleteBlock = (blockId) => {
    const updatedBlocks = blocks.filter((b) => b.id !== blockId);
    setBlocks(updatedBlocks);
    localStorage.setItem(`board-blocks-${id}`, JSON.stringify(updatedBlocks));
  };

  // Add new block
  const addBlock = () => {
    const newBlock = { id: Date.now().toString(), content: "" };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    localStorage.setItem(`board-blocks-${id}`, JSON.stringify(updatedBlocks));
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
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              onClick={deleteBoard}
              className="bg-red-500/90 hover:bg-red-600 px-6 py-3 rounded-xl font-medium transition"
            >
              Delete Board
            </button>
          </div>

          <p className="text-zinc-400 text-sm mt-2">
            Changes are saved locally in your browser. You can delete individual blocks below.
          </p>
        </div>

        {/* Blocks */}
        <div className="space-y-4" id="board-content">
          {blocks.map((block) => (
            <div key={block.id} className="relative">
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Write something..."
                className="w-full min-h-[80px] sm:min-h-[120px] bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none text-lg"
              />
              <button
                onClick={() => deleteBlock(block.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={addBlock}
            className="mt-4 text-indigo-400 hover:text-indigo-500 text-sm font-medium transition"
          >
            + Add a new block
          </button>
        </div>
      </div>
    </div>
  );
}