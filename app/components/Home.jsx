"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLockClosed } from "react-icons/io5";
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // toggle between login/signup
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setMessage("Please fill all required fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(isLogin ? "/api/auth/login" : "/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);

      if (!res.ok) {
        setMessage(data.message || "Authentication failed");
      } else {
        localStorage.setItem("token", data.token);
        setMessage(isLogin ? "Logged in 🎉" : "Account created 🎉");

        setForm({ name: "", email: "", password: "" });
        setOpen(false);

        // Redirect after successful login/signup
        router.push("/collab");
      }
    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen text-neutral-100 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black flex flex-col">
      {/* Navbar */}
  <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-tight text-white">
        TaskFlow
      </h1>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => { setIsLogin(true); setOpen(true); }}
          className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition rounded-lg"
        >
          Login
        </button>
        <button
          onClick={() => { setIsLogin(false); setOpen(true); }}
          className="px-5 py-2 bg-white text-black font-medium rounded-lg shadow-md shadow-white/10 hover:scale-105 transition"
        >
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-white/20 transition"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg flex flex-col py-2">
            <button
              onClick={() => { setIsLogin(true); setOpen(true); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 transition"
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setOpen(true); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-white bg-black hover:bg-white/10 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
      {/* Hero */}
      <section className="flex-grow flex flex-col justify-center max-w-5xl mx-auto px-6 text-center py-24">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          The modern way to manage
          <span className="block bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            collaborative tasks
          </span>
        </h1>

        <p className="mt-6 text-neutral-400 max-w-xl mx-auto">
          Create boards, assign tasks, collaborate with your team and see updates instantly.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => { setIsLogin(false); setOpen(true); }}
            className="bg-white text-black px-7 py-3 rounded-xl text-sm hover:scale-105 transition shadow-lg shadow-white/10"
          >
            Start for free
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4 sm:px-6 z-50 overflow-auto">
  <form
    onSubmit={handleAuth}
    className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto relative"
  >
    {/* Close Button */}
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 text-neutral-400 hover:text-white transition text-2xl"
    >
      &times;
    </button>

    {/* Title */}
    <h2 className="text-2xl font-semibold mb-6 text-center text-white">
      {isLogin ? "Login" : "Create Account"}
    </h2>

    {/* Name field only for signup */}
    {!isLogin && (
      <input
        type="text"
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition"
      />
    )}

    {/* Email */}
    <input
      type="email"
      name="email"
      value={form.email}
      placeholder="Email"
      onChange={handleChange}
      required
      className="w-full mb-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition"
    />

    {/* Password */}
    <input
      type="password"
      name="password"
      value={form.password}
      placeholder="Password"
      onChange={handleChange}
      required
      className="w-full mb-6 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition"
    />

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-white text-black py-3 rounded-lg font-medium hover:scale-[1.02] transition shadow-md shadow-white/10"
    >
      {loading ? (isLogin ? "Logging in..." : "Creating...") : (isLogin ? "Login" : "Sign Up")}
    </button>

    {/* Message */}
    {message && (
      <p className="text-sm text-neutral-400 mt-3 text-center">{message}</p>
    )}

    {/* Toggle login/signup */}
    <p
      className="text-sm text-neutral-300 mt-4 text-center cursor-pointer hover:underline"
      onClick={() => setIsLogin(!isLogin)}
    >
      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
    </p>
  </form>
</div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 text-center text-sm text-neutral-500 py-6 mt-auto">
        Built for Full Stack Assignment
      </footer>
    </main>
  );
}