import { ArrowRight, CheckCircle2, FileText, PhoneCall, Wallet } from "lucide-react";

export function Process() {
  const steps = [
    {
      icon: PhoneCall,
      title: "상담 신청",
      desc: "간단한 정보 입력으로 1분 안에 완료"
    },
    {
      icon: CheckCircle2,
      title: "조건 확인",
      desc: "전담 상담사가 최적 조건 안내"
    },
    {
      icon: FileText,
      title: "서류 제출",
      desc: "모바일 간편 제출, 최소 서류 요청"
    },
    {
      icon: Wallet,
      title: "대출 실행",
      desc: "승인 즉시 입금, 당일 처리 가능"
    }
  ];

  return (
    <section className="bg-primary py-24 text-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-4xl">상담 진행 절차</h2>
          <p className="mt-4 text-blue-100 text-lg">복잡한 서류 없이 쉽고 빠르게 진행됩니다</p>
        </div>

        <div className="grid gap-8 md:grid-cols-4 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-blue-400/30"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white text-primary shadow-xl z-10 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center border-2 border-primary">
                  {index + 1}
                </div>
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-blue-100">{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div className="md:hidden mt-6 text-blue-400/50">
                  <ArrowRight className="h-6 w-6 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
