import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-gray-50 py-24 border-t border-gray-200">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          지금 바로 무료 상담을 신청하세요
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          입력하신 정보는 상담 목적으로만 사용됩니다.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 rounded-full shadow-lg shadow-primary/20"
          onClick={() => {
            const form = document.getElementById('consultation-form');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          상담 신청하러 가기
        </Button>
      </div>
    </section>
  );
}
