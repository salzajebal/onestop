import { AlertCircle, Ban, CreditCard, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TargetAudience() {
  const targets = [
    {
      icon: UserX,
      title: "무직/미취업",
      question: "소득이 없어 어디서나 거절당하셨나요?",
      answer: "무직자도 높은 확률로 승인 연계 가능합니다.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: AlertCircle,
      title: "연체자",
      question: "연체 이력으로 대출이 거절되셨나요?",
      answer: "연체 중이신 분들도 맞춤 상품을 안내해드립니다.",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: CreditCard,
      title: "저신용자",
      question: "신용등급이 낮아 포기하셨나요?",
      answer: "저신용자 전문 상담으로 가능한 상품을 찾아드립니다.",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Ban,
      title: "신불자",
      question: "신용불량자라는 이유로 거절당하셨나요?",
      answer: "신불자도 포기하지 마세요. 방법이 있습니다.",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">이런 분들께 추천드립니다</h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">어떤 상황에서도 퍼펙트론이 해결책을 찾아드립니다</p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {targets.map((target, index) => (
            <Card key={index} className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-5">
                <div className={`mb-3 inline-flex rounded-xl p-3 ${target.color}`}>
                  <target.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">{target.title}</h3>
                <p className="mb-3 text-sm font-medium text-gray-500">{target.question}</p>
                <div className="rounded-lg bg-primary/5 p-3">
                  <p className="text-sm font-semibold text-primary">{target.answer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
