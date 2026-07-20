import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    title: "연체 중에도 승인됐어요",
    content: "7등급이라 다 거절당했는데, 신청한 당일 바로 입금됐어요. 진짜 되는 곳이 있더라고요.",
    author: "박OO님 · 직장인 · 서울",
  },
  {
    title: "무직인데 상담이 됐어요",
    content: "무직이라 상담조차 안 될 줄 알았는데, 가능한 상품을 자분히 찾아주셔서 놀랐습니다.",
    author: "이OO님 · 구직 중 · 경기",
  },
  {
    title: "서류 걱정을 없었어요",
    content: "프리랜서라 서류 걱정이 많았는데 상담사님이 다 정리해주셨어요. 다음에도 여기로요.",
    author: "김OO님 · 프리랜서 · 부산",
  },
  {
    title: "이자가 확 줄었어요",
    content: "카드론을 돌려막던 상황이었는데 한 번에 갈아타기로 이자가 확 줄었어요.",
    author: "최OO님 · 대환 · 인천",
  },
  {
    title: "재촉하지 않아 좋았어요",
    content: "상담 내내 재촉하지 않고 상황을 충분히 설명해주셔서 진행할 수 있었습니다.",
    author: "윤OO님 · 주부 · 광주",
  },
  {
    title: "소액이라 간편했어요",
    content: "급하게 소액이 필요했는데 정말 간단하게 부담 없이 빠르게 받았어요.",
    author: "정OO님 · 자영업 · 대구",
  },
];

export function Reviews() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">고객 후기</p>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            먼저 길을 찾은 분들의 이야기
          </h2>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Card key={i} className="bg-white border-gray-100 shadow-sm">
              <CardContent className="pt-5 pb-5">
                <p className="mb-1 text-xs font-bold text-zinc-400">"</p>
                <h3 className="mb-2 text-base font-bold text-gray-900">{r.title}</h3>
                <p className="mb-4 text-sm text-gray-500 leading-relaxed">{r.content}</p>
                <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">{r.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
