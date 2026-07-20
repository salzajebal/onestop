const principles = [
  {
    emoji: "₩",
    title: "선입금·선이자 0원",
    desc: "어떤 명목으로도 먼저 돈을 받지 않습니다. 요구받으셨다면 즉시 의심하세요.",
  },
  {
    emoji: "✓",
    title: "100% 비대면 진행",
    desc: "방문 없이 휴대폰으로만 신청·심사·실행까지 모든 절차가 끝납니다.",
  },
  {
    emoji: "🛡",
    title: "개인정보 암호화 보안",
    desc: "SSL 암호화로 안전하게 전송하고, 상담이 끝나면 정보를 즉시 파기합니다.",
  },
  {
    emoji: "⚡",
    title: "당일 승인·당일 입금",
    desc: "조건이 맞으면 신청 당일 안에, 빠르면 1시간 안에 계좌로 입금됩니다.",
  },
];

export function Principles() {
  return (
    <section className="bg-[#0d1117] py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">원스톱 머니의 약속</p>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
            반드시 지키는 4가지 원칙
          </h2>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            급할수록 더 조심해야 합니다. 그래서 우리는 이 원칙부터 분명히 합니다.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 transition-colors"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#22c55e]/20 text-[#22c55e] text-xl font-bold">
                {p.emoji}
              </div>
              <h3 className="mb-2 text-base font-bold text-white">{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
