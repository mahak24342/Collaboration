"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    { _id: "1", name: "Alice" },
    { _id: "2", name: "Bob" },
    { _id: "3", name: "Charlie" },
  ]);
  const [assigning, setAssigning] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const fetchBoards = async () => {
    try {
      const res = await fetch("/api/boards");
      const data = await res.json();
      setBoards(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const createBoard = async () => {
    if (!title.trim()) return;

    try {
      await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, owner: "demo-user" }),
      });
      setTitle("");
      setOpenModal(false);
      fetchBoards();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBoard = async (id) => {
    try {
      await fetch(`/api/boards/${id}`, { method: "DELETE" });
      setBoards((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const assignUser = async (boardId, userName) => {
    try {
      const board = boards.find((b) => b._id === boardId);
      if (!board) return;

      const blocks = board.blocks?.length
        ? [...board.blocks]
        : [{ id: Date.now().toString(), content: "", assignee: "" }];

      blocks[0].assignee = userName;

      await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks, title: board.title }),
      });

      setBoards((prev) =>
        prev.map((b) => (b._id === boardId ? { ...b, blocks } : b))
      );

      setAssigning((prev) => ({ ...prev, [boardId]: false }));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-4 py-16 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
  MANAGE YOUR{" "}
  <span className="inline md:inline bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
   BOARDS
  </span>
</h1>
          <p className="text-zinc-500 mt-4 max-w-xl text-base md:text-lg">
            Organize your ideas, tasks, and collaborations in one beautiful place.
          </p>
        </div>

        {/* Search + Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 items-stretch">
          <input
            type="text"
            placeholder="Search boards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-zinc-900/60 backdrop-blur border border-zinc-800 px-5 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
          />

          <button
            onClick={() => setOpenModal(true)}
            className="bg-white font-bold text-black px-6 py-3 rounded-2xl font-medium transition shadow-lg shadow-indigo-500/20 w-full hover:bg-indigo-400 hover:text-white sm:w-auto"
          >
            + Create Board
          </button>
        </div>

        {/* Modal */}
        {openModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl w-full max-w-md backdrop-blur-xl">
              <h2 className="text-lg font-semibold mb-4">
                Create New Board
              </h2>

              <input
                className="bg-black/60 border border-zinc-800 px-4 py-3 rounded-xl w-full outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                placeholder="Ex: Product Roadmap, Startup Ideas..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={createBoard}
                  className="bg-white text-black hover:bg-indigo-400 hover:text-white px-5 py-2 rounded-xl transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Boards Grid */}
        {filteredBoards.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 rounded-3xl bg-zinc-900/40 backdrop-blur">
            <p className="text-zinc-400 text-lg">No boards found</p>
            <p className="text-zinc-500 text-sm mt-2">
              Try creating a board or adjust your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {filteredBoards.map((board) => (
              <div
                key={board._id}
                onClick={() => router.push(`/board/${board._id}`)}
                className="group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/60 p-6 rounded-3xl hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-zinc-200 group-hover:text-white transition">
                  {board.title}
                </h2>

                <p className="text-xs text-zinc-500 mt-2">
                  Updated:{" "}
                  {board.updatedAt
                    ? new Date(board.updatedAt).toLocaleString()
                    : "N/A"}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAssigning((prev) => ({
                        ...prev,
                        [board._id]: !prev[board._id],
                      }));
                    }}
                    className="bg-indigo-500 text-white rounded-full px-3 py-1 text-sm hover:bg-indigo-600 transition"
                  >
                    {board.blocks?.map((b) => b.assignee).filter(Boolean)[0] ||
                      "Assign"}
                  </button>

                  {assigning[board._id] && (
                    <select
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => assignUser(board._id, e.target.value)}
                      defaultValue=""
                      className="bg-zinc-800 text-white text-sm p-1 rounded"
                    >
                      <option value="" disabled>
                        Select user
                      </option>
                      {users.map((u) => (
                        <option key={u._id} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBoard(board._id);
                  }}
                  className="text-sm text-zinc-500 mt-4 hover:text-red-400 transition"
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