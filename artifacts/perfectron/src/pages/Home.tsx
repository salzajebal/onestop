import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { PainPoints } from "@/components/sections/PainPoints";
import { TargetAudience } from "@/components/sections/TargetAudience";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { KakaoButton } from "@/components/ui/KakaoButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ConsultationForm />
        <PainPoints />
        <TargetAudience />
        <Principles />
        <Process />
        <ProductInfo />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <KakaoButton />
    </div>
  );
}
