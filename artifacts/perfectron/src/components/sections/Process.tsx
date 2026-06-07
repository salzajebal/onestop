import { CheckCircle2, FileText, PhoneCall, Wallet } from "lucide-react";

export function Process() {
  const steps = [
    { icon: PhoneCall,    title: "상담 신청", desc: "간단한 정보 입력으로 1분 안에 완료" },
    { icon: CheckCircle2, title: "조건 확인", desc: "전담 상담사가 최적 조건 안내" },
    { icon: FileText,     title: "서류 제출", desc: "모바일 간편 제출, 최소 서류 요청" },
    { icon: Wallet,       title: "대출 실행", desc: "승인 즉시 입금, 당일 처리 가능" },
  ];

  return (
    <section className="bg-primary py-16 md:py-24 text-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">상담 진행 절차</h2>
          <p className="mt-3 text-blue-100 text-base sm:text-lg">복잡한 서류 없이 쉽고 빠르게 진행됩니다</p>
        </div>

        {/* 모바일: 세로 스텝 / 데스크탑: 가로 4열 */}
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-4 md:gap-8 relative">
          {/* 데스크탑 연결선 */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-blue-400/30" />

          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-5 sm:flex-col sm:items-center sm:text-center md:gap-0">
              {/* 아이콘 */}
              <div className="relative flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-xl z-10">
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center border-2 border-primary">
                  {index + 1}
                </div>
                <step.icon className="h-9 w-9" />
              </div>
              {/* 텍스트 */}
              <div className="sm:mt-4">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-blue-100">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
