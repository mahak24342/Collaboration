"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-md p-2">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => router.push("/boards")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image 
            src="/11.jfif" 
            width={40} 
            height={40} 
            alt="logo"
            className="rounded-md"
          />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            TaskFlow
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => router.push("/boards")}
            className="text-sm text-neutral-400 hover:text-white transition"
          >
            Boards
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="text-sm text-neutral-400 hover:text-white transition"
          >
            Profile
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:scale-105 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-white/20 transition"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg flex flex-col py-2">
              <button
                onClick={() => {
                  router.push("/boards")
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                Boards
              </button>

              <button
                onClick={() => {
                  router.push("/profile")
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 transition"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  router.push("/")
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </nav>
    </div>
  )
}

export default Nav