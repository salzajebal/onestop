import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Reviews() {
  const reviews = [
    {
      name: "김*현",
      tag: "무직자",
      date: "2025.01",
      content: "무직이라 어디서나 거절당했는데 퍼펙트론에서 승인이 됐어요. 정말 감사합니다. 당일 바로 입금까지 완료!"
    },
    {
      name: "이*준",
      tag: "연체자",
      date: "2025.02",
      content: "연체 이력이 있어서 포기했는데, 상담사분이 너무 친절하게 도와주셨어요. 금리도 생각보다 낮아서 만족해요."
    },
    {
      name: "박*미",
      tag: "신불자",
      date: "2025.03",
      content: "신불자라 포기하고 있었는데, 퍼펙트론에서 방법을 찾아주셨어요. 상담 과정이 투명하고 수수료도 없어서 믿음이 갔습니다."
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">실제 이용 후기</h2>
          <p className="mt-4 text-lg text-gray-600">퍼펙트론을 통해 희망을 찾으신 고객님들의 이야기</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-gray-50/50 border-gray-100">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mb-6 text-gray-700 leading-relaxed min-h-[80px]">
                  "{review.content}"
                </p>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">
                    {review.name} <span className="text-sm font-normal text-primary ml-1">({review.tag})</span>
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
