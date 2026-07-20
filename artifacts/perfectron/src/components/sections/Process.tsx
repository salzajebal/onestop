const steps = [
  {
    step: "STEP 01",
    title: "1분 비대면 신청",
    desc: "이름과 연락처, 간단한 상황만 입력하면 신청이 끝납니다.",
  },
  {
    step: "STEP 02",
    title: "전담 상담사 배정",
    desc: "접수 즉시 전담 상담사가 직접 연락드려 상황을 확인합니다.",
  },
  {
    step: "STEP 03",
    title: "가능한 상품 비교",
    desc: "지금 진행 가능한 상품 중 가장 좋은 조건을 골라드립니다.",
  },
  {
    step: "STEP 04",
    title: "당일 계좌 입금",
    desc: "승인되면 본인 계좌로 바로 입금됩니다. 빠르면 1시간이면 끝납니다.",
  },
];

export function Process() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">이용 절차</p>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            신청부터 입금까지, 네 단계
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            복잡한 서류 없이 통화 한 번이면 답이 나옵니다. 평균 당일 안에 마무리됩니다.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
              <p className="text-xs font-bold text-[#22c55e] mb-3 tracking-wider">{s.step}</p>
              <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
