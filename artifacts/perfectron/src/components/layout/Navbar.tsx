import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function PerfectronLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="8" fill="#2563EB" />
      <path
        d="M10 9h9.5C22.5 9 25 11.5 25 14.5S22.5 20 19.5 20H13v7h-3V9z"
        fill="white"
      />
      <path
        d="M13 12v5h6c1.4 0 2.5-1.1 2.5-2.5S20.4 12 19 12h-6z"
        fill="#93C5FD"
      />
      <rect x="10" y="24" width="16" height="2" rx="1" fill="#FCD34D" />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <PerfectronLogo />
          <span className="text-2xl font-bold text-primary tracking-tight">퍼펙트론</span>
        </Link>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          onClick={() => {
            const form = document.getElementById("consultation-form");
            if (form) form.scrollIntoView({ behavior: "smooth" });
          }}
        >
          상담신청
        </Button>
      </div>
    </header>
  );
}
