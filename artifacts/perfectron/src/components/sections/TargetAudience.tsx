const targets = [
  {
    emoji: "💼",
    title: "직장인",
    desc: "4대보험 무관, 재직 3개월 이상이면 신청할 수 있어요.",
  },
  {
    emoji: "📋",
    title: "사업자·프리랜서",
    desc: "사업 1개월 이상이면 신청 가능, 다양한 증빙 방법을 함께 찾아요.",
  },
  {
    emoji: "🏠",
    title: "주부",
    desc: "본인 소득이 없어도 배우자 소득으로도 한도를 볼 수 있어요.",
  },
  {
    emoji: "🔍",
    title: "무직·구직 중",
    desc: "최근 소득 이력이나 자산을 기준으로도 상담할 수 있어요.",
  },
  {
    emoji: "📈",
    title: "저신용·신용회복 중",
    desc: "신용점수가 낮거나 신용회복 중이어도 가능한 상품을 찾아요.",
  },
  {
    emoji: "⏱",
    title: "연체 중",
    desc: "단기 연체부터 상담 가능, 상황별로 갈 수 있는 길을 안내해요.",
  },
  {
    emoji: "⇄",
    title: "대환·갈아타기",
    desc: "고금리에서 저금리로, 흩어진 대출을 한 번에 정리해드려요.",
  },
  {
    emoji: "🏦",
    title: "1금융권 거절자",
    desc: "2금융·정식 등록 대부까지 비교해 새로운 길을 찾아드려요.",
  },
];

export function TargetAudience() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">상담 대상</p>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            이런 분들도 상담받을 수 있어요
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            1금융권에서 거절됐어도 괜찮습니다. 상황에 맞는 길은 생각보다 가까이 있습니다.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {targets.map((t) => (
            <div
              key={t.title}
              className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="mb-3 text-2xl">{t.emoji}</div>
              <h3 className="mb-1.5 text-base font-bold text-gray-900">{t.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
