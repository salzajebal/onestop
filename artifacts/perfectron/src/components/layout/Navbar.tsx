import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1117] border-b border-white/10">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-tight">원스톱 머니</span>
        </Link>
        <button
          className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
          onClick={() => {
            const form = document.getElementById("consultation-form");
            if (form) form.scrollIntoView({ behavior: "smooth" });
          }}
        >
          대출 상담 신청 →
        </button>
      </div>
    </header>
  );
}
