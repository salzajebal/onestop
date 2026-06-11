import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateApplication } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요"),
  phone1: z.string().length(3),
  phone2: z.string().min(3).max(4),
  phone3: z.string().length(4),
  memo: z.string().optional(),
});

export function Hero() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const createApplication = useCreateApplication();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone1: "010",
      phone2: "",
      phone3: "",
      memo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    const phone = `${values.phone1}-${values.phone2}-${values.phone3}`;

    createApplication.mutate(
      { data: { name: values.name, phone, memo: values.memo } },
      {
        onSuccess: () => {
          toast({
            title: "상담 신청이 완료되었습니다.",
            description: "빠른 시일 내에 연락드리겠습니다.",
          });
          form.reset();
          setStep(1);
        },
        onError: (error: unknown) => {
          const status = (error as { response?: { status?: number } })?.response?.status;
          if (status === 409) {
            toast({
              title: "이미 신청된 전화번호입니다.",
              description: "동일한 번호로는 중복 신청이 불가합니다.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "신청 중 오류가 발생했습니다.",
              description: "다시 시도해주세요.",
              variant: "destructive",
            });
          }
        },
      }
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a56db] to-[#1e40af] py-12 lg:py-28">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8 items-center">
          {/* 텍스트 */}
          <div className="text-white space-y-5">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm border border-white/20">
              <ShieldCheck className="mr-2 h-4 w-4 shrink-0" />
              대출이 필요한 순간, 퍼펙트론
            </div>

            <h1 className="text-[1.65rem] font-bold leading-snug tracking-tight sm:text-4xl lg:text-5xl text-white">
              <span className="whitespace-nowrap">무직·연체·저신용·신불자도,</span><br />
              <span className="text-yellow-400 whitespace-nowrap">높은 확률로 승인</span><br />
              가능합니다.
            </h1>

            <p className="text-base text-blue-100/90 sm:text-lg lg:text-xl leading-relaxed">
              어떤 상황에서도 포기하지 마세요.<br className="sm:hidden" /> 퍼펙트론이 당신의 곁에 있습니다.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4 pt-2">
              {["빠른 심사", "높은 승인률", "당일 처리 가능", "중개수수료 0원"].map((item) => (
                <div
                  key={item}
                  className="flex items-center text-sm font-medium text-white/90 bg-white/5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/10"
                >
                  <Check className="mr-1.5 h-3.5 w-3.5 text-yellow-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 상담 신청 폼 */}
          <div id="consultation-form" className="relative mx-auto w-full max-w-md mt-2 lg:mt-0">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-white/40 to-white/10 blur opacity-50" />
            <div className="relative rounded-2xl bg-white p-5 sm:p-8 shadow-2xl border border-white/20">
              <div className="mb-5 border-b border-gray-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">무료 상담 신청</h2>
                <div className="mt-3 h-1 w-12 bg-primary mx-auto rounded-full" />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">이름</FormLabel>
                        <FormControl>
                          <Input placeholder="실명 입력" className="h-12 bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">연락처</label>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="phone1"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input className="h-12 text-center bg-gray-50/50 px-1" maxLength={3} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center text-gray-400">-</div>
                      <FormField
                        control={form.control}
                        name="phone2"
                        render={({ field }) => (
                          <FormItem className="flex-[1.3]">
                            <FormControl>
                              <Input
                                className="h-12 text-center bg-gray-50/50 px-1"
                                maxLength={4}
                                inputMode="numeric"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center text-gray-400">-</div>
                      <FormField
                        control={form.control}
                        name="phone3"
                        render={({ field }) => (
                          <FormItem className="flex-[1.3]">
                            <FormControl>
                              <Input
                                className="h-12 text-center bg-gray-50/50 px-1"
                                maxLength={4}
                                inputMode="numeric"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                      <FormField
                        control={form.control}
                        name="memo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-semibold">문의내용 (선택)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="현재 상황이나 필요한 금액을 남겨주시면 상담에 도움이 됩니다."
                                className="min-h-[100px] resize-none bg-gray-50/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="pt-1">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-lg h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                      disabled={createApplication.isPending}
                    >
                      {step === 1 ? "다음" : "신청하기"}
                    </Button>
                  </div>

                  <p className="text-center text-xs text-gray-500">
                    입력하신 정보는 상담 목적으로만 안전하게 사용됩니다.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
