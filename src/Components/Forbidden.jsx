export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">
      
      <div className="relative w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-xl 
        border border-white/20 shadow-2xl p-8 sm:p-10 text-center">

        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center 
          rounded-full bg-red-500/10 border border-red-500/30">
          <span className="text-3xl font-extrabold text-red-400">!</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          403
        </h1>

        <h2 className="mt-2 text-xl font-semibold text-red-400">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-300">
          দুঃখিত, আপনি এই পেজে প্রবেশ করার অনুমতি পাননি।
          অনুগ্রহ করে আপনার অনুমতি যাচাই করুন অথবা অন্য পেজে যান।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-red-500 px-6 py-2.5 text-sm font-medium 
              text-white hover:bg-red-600 transition-all duration-200"
          >
            Go Back
          </button>

          <a
            href="/"
            className="rounded-lg border border-white/30 px-6 py-2.5 
              text-sm font-medium text-white hover:bg-white/10 transition-all duration-200"
          >
            Home
          </a>
        </div>

        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 
          rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 
          rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>
    </div>
  );
}