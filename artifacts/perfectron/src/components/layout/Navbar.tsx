import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary tracking-tight">퍼펙트론</span>
        </Link>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          onClick={() => {
            const form = document.getElementById('consultation-form');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          상담신청
        </Button>
      </div>
    </header>
  );
}
