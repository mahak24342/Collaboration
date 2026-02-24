"use client";

import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
 alert(data.message);
      if (!res.ok) {
        setMessage(data.message || "Signup failed");
      } else {
        localStorage.setItem("token", data.token);
        setMessage("Account created 🎉");

        setForm({
          name: "",
          email: "",
          password: "",
        });

        setOpen(false);
      }
    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen text-neutral-100 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          TaskFlow
        </h1>

        <div className="flex items-center gap-6">
          <button className="text-sm text-neutral-400 hover:text-white transition">
            Signup
          </button>

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-24 text-center">

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          The modern way to manage
          <span className="block bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            collaborative tasks
          </span>
        </h1>

        <p className="mt-6 text-neutral-400 max-w-xl mx-auto">
          Create boards, assign tasks, collaborate with your team
          and see updates instantly.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black px-7 py-3 rounded-xl text-sm hover:scale-105 transition shadow-lg shadow-white/10"
          >
            Start for free
          </button>

        </div>
      </section>

      {/* Signup Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-6">

          <form
            onSubmit={handleSignup}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-xl mb-6 font-semibold">
              Create Account
            </h2>

            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full mb-3 p-3 rounded bg-neutral-950 border border-neutral-800"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full mb-3 p-3 rounded bg-neutral-950 border border-neutral-800"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 rounded bg-neutral-950 border border-neutral-800"
            />

            <button
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:scale-[1.02] transition"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            {message && (
              <p className="text-sm text-neutral-400 mt-3">
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-neutral-500 mt-4"
            >
              Close
            </button>
          </form>

        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 text-center text-sm text-neutral-500 py-6">
        Built for Full Stack Assignment
      </footer>

    </main>
  );
}