import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateApplication } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useGetSettings } from "@workspace/api-client-react";

const AGE_OPTIONS = ["20대", "30대", "40대", "50대", "60대 이상"];
const INCOME_OPTIONS = [
  "직장 소득 없음",
  "사업 프리랜서 소득",
  "무직·과거 소득",
  "무직·소득 없음",
  "현재 연체 중",
];
const LOAN_OPTIONS = [
  "100만원 이하",
  "100~500만원",
  "500~1,000만원",
  "1,000만원 이상",
];

const formSchema = z.object({
  name: z.string().min(2, "성함을 입력해주세요"),
  phone: z.string().min(10, "연락처를 입력해주세요"),
  age: z.string().min(1, "연령을 선택해주세요"),
  income: z.string().min(1, "소득 및 연체 여부를 선택해주세요"),
  loanAmount: z.string().min(1, "대출 상담 금액을 선택해주세요"),
  agree: z.boolean().refine((v) => v, "개인정보 수집·이용에 동의해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

function ToggleGroup({
  options,
  value,
  onChange,
  error,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
              value === opt
                ? "border-[#22c55e] bg-[#22c55e]/10 text-[#16a34a]"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function ConsultationForm() {
  const { toast } = useToast();
  const createApplication = useCreateApplication();
  const { data: settings } = useGetSettings();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      age: "",
      income: "",
      loanAmount: "",
      agree: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    const memo = `연령: ${values.age} / 소득·연체: ${values.income} / 상담금액: ${values.loanAmount}`;
    createApplication.mutate(
      { data: { name: values.name, phone: values.phone, memo } },
      {
        onSuccess: () => {
          toast({
            title: "상담 신청이 완료됐습니다.",
            description: "빠른 시일 내에 연락드리겠습니다.",
          });
          reset();
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
    <section id="consultation-form" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto max-w-2xl px-4">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">
            무직자·저신용자·연체자도 유연하게 가능
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">비대면 상담 신청</h2>
          <p className="mt-3 text-sm text-gray-500">비대면 진행 · 당일 입금 · 정식 등록업체</p>
          <p className="mt-4 text-xs text-red-500">
            ※ 중복 신청 시 상담이 제한될 수 있으며, 본 상담은 신용점수에 아무런 영향이 없습니다.
          </p>
        </div>

        {/* 폼 카드 */}
        <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 성함 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                placeholder="예) 홍길동"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* 연락처 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone")}
                placeholder="예) 01012345678"
                inputMode="numeric"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* 연령 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                연령 <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="age"
                render={({ field }) => (
                  <ToggleGroup
                    options={AGE_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.age?.message}
                  />
                )}
              />
            </div>

            {/* 소득 및 연체 여부 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                소득 및 연체 여부 <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="income"
                render={({ field }) => (
                  <ToggleGroup
                    options={INCOME_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.income?.message}
                  />
                )}
              />
            </div>

            {/* 대출 상담 금액 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                대출 상담 금액 <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="loanAmount"
                render={({ field }) => (
                  <ToggleGroup
                    options={LOAN_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.loanAmount?.message}
                  />
                )}
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                {...register("agree")}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#22c55e]"
              />
              <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
                <span className="text-[#22c55e] underline underline-offset-2">개인정보 수집·이용</span>에 동의하며, 상담 연락 받는 데 동의합니다.
              </label>
            </div>
            {errors.agree && <p className="-mt-4 text-xs text-red-500">{errors.agree.message}</p>}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={createApplication.isPending}
              className="w-full rounded-xl bg-[#22c55e] py-4 text-base font-bold text-white hover:bg-[#16a34a] transition-colors disabled:opacity-60"
            >
              {createApplication.isPending ? "처리 중..." : "상담 신청 접수"}
            </button>

            <p className="text-center text-xs text-gray-400">
              연 최고금리 20% 이내 · 중개수수료 0원 · 선입금 요구 시 즉시 신고
            </p>
          </form>

          {/* 카카오 채팅 */}
          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              대기 없이 <span className="text-gray-900">실시간 상담원과 연결</span>되고 싶다면
            </p>
            <p className="text-xs text-gray-400 mb-4">아래 버튼을 눌러 카카오톡으로 바로 상담하세요</p>
            <button
              type="button"
              onClick={() => {
                if (settings?.kakaoLink) window.open(settings.kakaoLink, "_blank");
              }}
              className="w-full rounded-xl bg-[#FEE500] py-3.5 text-sm font-bold text-[#391B1B] hover:bg-[#f5d800] transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-base">●</span> 카카오톡 채팅 상담
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
