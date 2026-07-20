export function Hero() {
  return (
    <section className="bg-[#0d1117] py-16 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* 텍스트 */}
          <div className="space-y-6">
            <p className="text-sm font-semibold text-[#22c55e] tracking-wide">
              정식 등록 대부중개업 · 전국 100% 비대면
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              무직·저신용·연체도<br />
              <span className="text-[#22c55e]">원스톱 머니</span>는 가능합니다
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed sm:text-lg">
              다른 곳에서 거절·부결됐어도 괜찮아요.<br />
              100% 비대면으로, 지금 갈 수 있는 길부터 안내해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                className="inline-flex items-center justify-center rounded-lg bg-[#22c55e] px-7 py-3.5 text-base font-bold text-white hover:bg-[#16a34a] transition-colors"
                onClick={() => {
                  const form = document.getElementById("consultation-form");
                  if (form) form.scrollIntoView({ behavior: "smooth" });
                }}
              >
                1분 상담 신청하기
              </button>
              <span className="flex items-center gap-1.5 text-sm text-zinc-400 sm:ml-2">
                <svg className="h-4 w-4 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                신용점수에 영향 없는 무료 상담
              </span>
            </div>
          </div>

          {/* 코인 아이콘 */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                  <svg className="w-20 h-20 lg:w-28 lg:h-28 text-[#22c55e]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="50" cy="75" rx="34" ry="10" fill="currentColor" opacity="0.6"/>
                    <ellipse cx="50" cy="62" rx="34" ry="10" fill="currentColor" opacity="0.7"/>
                    <ellipse cx="50" cy="50" rx="34" ry="10" fill="currentColor"/>
                    <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">₩</text>
                    <circle cx="78" cy="28" r="14" fill="#22c55e"/>
                    <path d="M72 28l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
          {[
            { label: "모든 절차", value: "비대면 진행" },
            { label: "신청 당일", value: "당일 입금" },
            { label: "무사고 운영", value: "정식 등록업체" },
          ].map((item) => (
            <div key={item.value} className="text-center">
              <p className="text-xs text-zinc-500 mb-1">{item.label}</p>
              <p className="text-base font-bold text-white sm:text-lg">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
