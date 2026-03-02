"use client"

import React from "react"
import { useRouter } from "next/navigation"

const Footer = () => {
  const router = useRouter()

  return (
    <footer className="w-full border-t border-zinc-800 bg-black/60 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">

        {/* Left */}
        <p className="text-zinc-500">
          © {new Date().getFullYear()} TaskFlow
        </p>

        {/* Right */}
        <div className="flex items-center gap-6 text-zinc-500">
          <button 
            onClick={() => router.push("/boards")}
            className="hover:text-white transition"
          >
            About
          </button>

          <button 
            onClick={() => router.push("/profile")}
            className="hover:text-white transition"
          >
            Contact
          </button>

          <button 
            onClick={() => router.push("/")}
            className="hover:text-white transition"
          >
            Socials
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer