import { useGetSettings } from "@workspace/api-client-react";

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return phone;
}

export function Footer() {
  const { data: settings } = useGetSettings();
  const companyName = settings?.companyName || "원스톱 머니";
  const phone = formatPhone(settings?.phone || "1600-0000");

  return (
    <footer className="bg-[#0d1117] text-zinc-400 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* 개인정보 수집·이용 동의 전문 토글은 생략, 텍스트로 안내 */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-3">{companyName}</h2>
            <div className="space-y-1 text-sm">
              <p>회사명: {companyName} / 대표자: {settings?.representative || "대표자"}</p>
              <p>사업자등록번호: {settings?.businessNumber || "-"}</p>
              {settings?.registrationNumber && (
                <p>대부중개업등록번호: {settings.registrationNumber}</p>
              )}
              <p>주소: {settings?.address || "/"}</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-white font-semibold">고객센터 {phone}</p>
            <p className="text-zinc-500 mt-1">평일 09:00 ~ 18:00 · 주말·공휴일 휴무</p>
          </div>
        </div>

        <div className="text-xs leading-relaxed space-y-2 border-t border-white/10 pt-6">
          <p>
            금리 연 20% 이내 (연체이자율 포함 연 20% 이내)(단, 2021.7.7부터 체결·갱신·연장되는 계약에 한함), 취급수수료 없음, 중도상환 수수료 없음, 중개수수료 없음, 추가비용 없음.
          </p>
          <p>
            상환기간: 12개월 ~ 60개월 / 총 대출 비용 예시: 100만원을 12개월 기간 동안 최대 금리 연 20% 적용하여 원리금균등상환방법으로 이용하는 경우 총 상환금액 1,111,614원 (단, 대출상품 및 상환방법 등 대출계약 내용에 따라 달라질 수 있습니다). 채무의 조기상환수수료 등 조기상환조건 없음.
          </p>
          <p className="text-red-400/80 font-medium">
            과도한 빚은 당신에게 큰 불행을 안겨줄 수 있습니다. 중개수수료를 요구하거나 받는 것은 불법입니다. 대출 시 귀하의 신용등급이 하락할 수 있습니다.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs">
          <p>© 2026 {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
