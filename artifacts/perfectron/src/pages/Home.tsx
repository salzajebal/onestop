import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TargetAudience } from "@/components/sections/TargetAudience";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Cta } from "@/components/sections/Cta";
import { KakaoButton } from "@/components/ui/KakaoButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TargetAudience />
        <Process />
        <Reviews />
        <Cta />
      </main>
      <Footer />
      <KakaoButton />
    </div>
  );
}
