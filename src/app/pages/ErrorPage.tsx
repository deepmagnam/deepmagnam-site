import { useEffect } from "react";
import { useRouteError } from "react-router";
import { RefreshCw, Home } from "lucide-react";

// Rendered in place of RootLayout when something throws, so it deliberately
// avoids Navigation/Footer (they may be what failed) and uses a plain <a> for
// the home link to force a full page load.
export function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Something went wrong
        </h1>
        <p className="text-xl text-slate-300 mb-10">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
          >
            <RefreshCw size={20} />
            Reload
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-200 px-8 py-4 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300"
          >
            <Home size={20} />
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
