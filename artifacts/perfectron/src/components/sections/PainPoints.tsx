export function PainPoints() {
  const points = [
    "오늘 당장 돈이 필요한데, 어디서도 바로 입금이 안 돼요.",
    "직장인인데 복잡한 절차 때문에 진행이 자꾸 막혀요.",
    "또 상담을 받았는데, 역시나 부결 통보만 돌아왔어요.",
    "연체 중이라 대출이 되는 곳을 찾을 수가 없어요.",
    "무직이라 대출 자체가 되는 곳이 없어요.",
    "신용이 낮아 소액조차 빌릴 곳이 없어요.",
  ];

  return (
    <section className="bg-[#0d1117] py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl leading-snug">
          막막했던 그 마음,<br />잘 알고 있습니다
        </h2>
        <p className="mt-4 text-sm text-zinc-400">
          한 번쯤 이런 순간을 겪으셨다면, 원스톱 머니가 도와드릴 수 있습니다.
        </p>

        <div className="mt-12 space-y-0 divide-y divide-white/10 border-y border-white/10">
          {points.map((point) => (
            <p key={point} className="py-4 text-sm text-zinc-300 sm:text-base leading-relaxed">
              {point}
            </p>
          ))}
        </div>

        <p className="mt-10 text-base font-bold text-white sm:text-lg">
          원스톱 머니는 바로{" "}
          <span className="text-[#22c55e]">그 막다른 길에서</span> 시작합니다.
        </p>
      </div>
    </section>
  );
}
