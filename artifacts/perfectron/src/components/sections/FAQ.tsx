import { useState } from "react";

const faqs = [
  {
    q: "신용이 아주 낮은데 정말 가능한가요?",
    a: "네, 상담은 가능합니다. 1금융권부터 정식 등록 대부중개까지 다양한 금융사와 제휴되어 있어, 자신용·신용회복·연체 이력이 있는 분들을 위한 상품도 함께 비교해 드립니다. 다만 최종 승인 여부와 조건은 각 금융사의 심사 기준에 따라 결정됩니다.",
  },
  {
    q: "중개수수료나 선입금이 정말 없나요?",
    a: "네, 중개수수료와 선입금은 전혀 없습니다. 어떤 명목으로든 먼저 돈을 요구하는 경우는 불법입니다. 즉시 신고해주세요.",
  },
  {
    q: "꼭 사무실을 방문해야 하나요?",
    a: "아니요. 모든 절차가 100% 비대면으로 진행됩니다. 신청부터 심사, 실행까지 방문 없이 휴대폰만으로 완료됩니다.",
  },
  {
    q: "상담을 하면 신용점수가 떨어지나요?",
    a: "상담 신청 자체는 신용점수에 아무런 영향이 없습니다. 실제 대출 실행 시 금융사의 조회가 이루어질 수 있으며, 이 부분은 사전에 안내해드립니다.",
  },
  {
    q: "신청하면 언제쯤 연락이 오나요?",
    a: "접수 즉시 전담 상담사가 배정되어 빠르면 수분 내, 늦어도 당일 중으로 연락드립니다. 평일 업무시간(09:00~18:00) 기준입니다.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">자주 묻는 질문</p>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            궁금한 점, 먼저 답해드릴게요
          </h2>
        </div>

        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-semibold text-gray-800 sm:text-base pr-4">
                  {faq.q}
                </span>
                <span className={`text-xl font-light shrink-0 transition-transform ${open === i ? "text-[#22c55e] rotate-45" : "text-gray-400"}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">아직 궁금한 점이 남아있다면, 지금 바로 상담받아 보세요.</p>
          <button
            className="rounded-xl bg-[#22c55e] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#16a34a] transition-colors"
            onClick={() => {
              const form = document.getElementById("consultation-form");
              if (form) form.scrollIntoView({ behavior: "smooth" });
            }}
          >
            1분 상담 신청하기
          </button>
        </div>
      </div>
    </section>
  );
}
