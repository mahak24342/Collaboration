"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CollabPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [openBoardModal, setOpenBoardModal] = useState(false);
  const [currentBoard, setCurrentBoard] = useState({ id: null, title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    else setUser({ name: "Gunna" }); // mock user
  }, [router]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // CRUD Functions
  const handleCreateBoard = () => {
    setIsEditing(false);
    setCurrentBoard({ id: null, title: "", description: "" });
    setOpenBoardModal(true);
  };

  const handleEditBoard = (board) => {
    setIsEditing(true);
    setCurrentBoard(board);
    setOpenBoardModal(true);
  };

  const handleDeleteBoard = (id) => {
    setBoards(boards.filter((b) => b.id !== id));
  };

  const handleBoardSubmit = (e) => {
    e.preventDefault();
    if (!currentBoard.title) return;

    if (isEditing) {
      setBoards(boards.map((b) => (b.id === currentBoard.id ? currentBoard : b)));
    } else {
      setBoards([...boards, { ...currentBoard, id: Date.now() }]);
    }

    setOpenBoardModal(false);
  };

  // Handle input change
  const handleChange = (e) => {
    setCurrentBoard({ ...currentBoard, [e.target.name]: e.target.value });
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">TaskFlow</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg">Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded-lg hover:scale-105 transition shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Add Board Button */}
      <div className="mb-6">
        <button
          onClick={handleCreateBoard}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Board
        </button>
      </div>

      {/* Boards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-neutral-900 p-6 rounded-xl shadow-md hover:scale-[1.02] transition relative"
          >
            <h2 className="text-xl font-semibold mb-2">{board.title}</h2>
            <p className="text-neutral-400">{board.description}</p>

            {/* Edit/Delete buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleEditBoard(board)}
                className="text-sm px-2 py-1 bg-yellow-500 rounded hover:scale-105 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBoard(board.id)}
                className="text-sm px-2 py-1 bg-red-500 rounded hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Board Modal */}
      {openBoardModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4 z-50 overflow-auto">
          <form
            onSubmit={handleBoardSubmit}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto relative"
          >
            <button
              type="button"
              onClick={() => setOpenBoardModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {isEditing ? "Edit Board" : "Create Board"}
            </h2>

            <input
              type="text"
              name="title"
              value={currentBoard.title}
              onChange={handleChange}
              placeholder="Board Title"
              required
              className="w-full mb-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition"
            />

            <textarea
              name="description"
              value={currentBoard.description}
              onChange={handleChange}
              placeholder="Board Description"
              className="w-full mb-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition"
            />

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:scale-[1.02] transition shadow-md shadow-white/10"
            >
              {isEditing ? "Update Board" : "Create Board"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}