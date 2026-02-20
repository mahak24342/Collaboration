export default function Home() {
  return (
    <main className="min-h-screen text-neutral-100 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          TaskFlow
        </h1>

        <div className="flex items-center gap-6">
          <button className="text-sm text-neutral-400 hover:text-white transition">
            Login
          </button>

          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm hover:scale-105 transition">
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

          <button className="bg-white text-black px-7 py-3 rounded-xl text-sm hover:scale-105 transition shadow-lg shadow-white/10">
            Start for free
          </button>

          <button className="border border-neutral-800 px-7 py-3 rounded-xl text-sm hover:border-neutral-600 transition">
            Live demo
          </button>

        </div>
      </section>

      {/* Product Preview */}
      <section className="px-6 pb-24">

        <div className="max-w-6xl mx-auto bg-neutral-900/60 backdrop-blur border border-neutral-800 rounded-2xl p-8">

          <div className="grid md:grid-cols-3 gap-6">

            {["Todo", "In Progress", "Done"].map((col) => (
              <div
                key={col}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition"
              >
                <p className="text-sm text-neutral-400 mb-3">{col}</p>

                <div className="space-y-2">
                  <div className="bg-neutral-900 p-3 rounded-lg text-sm">
                    Example Task
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-lg text-sm">
                    Another Task
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-12">

        <Feature
          title="Real-time sync"
          text="All updates instantly visible for your team."
        />

        <Feature
          title="Drag & drop"
          text="Move tasks smoothly across lists."
        />

        <Feature
          title="Collaboration"
          text="Assign users and track activity."
        />

      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 text-center text-sm text-neutral-500 py-6">
        Built for Full Stack Assignment
      </footer>

    </main>
  );
}

function Feature({ title, text }) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-neutral-400">{text}</p>
    </div>
  );
}