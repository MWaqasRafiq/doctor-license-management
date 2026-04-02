import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
      <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
      <main className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <svg  className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Step-9 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h.01M12 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Doctor License <span className="text-blue-600">Portal</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Securely manage credentials in one portal.
            </p>
          </div>

          <Link href="/doctors" className="group flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]">
            Enter Portal
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

        </div>
      </main>

      <footer className="mt-20 text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Muhammad Waqas Rafique.
      </footer>
    </div>
  );
}