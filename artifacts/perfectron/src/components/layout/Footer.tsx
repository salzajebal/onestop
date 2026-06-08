import { useGetSettings } from "@workspace/api-client-react";

export function Footer() {
  const { data: settings } = useGetSettings();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">{settings?.companyName || "우주캐피탈대부"}</h2>
            <div className="space-y-1.5 text-sm">
              <p>회사명 : {settings?.companyName || "우주캐피탈대부"} / 대표자 : {settings?.representative || "강윤희, 정충헌"}</p>
              <p>사업자번호 : {settings?.businessNumber || "738-95-01643"}</p>
              {settings?.registrationNumber && (
                <p>대부중개업등록번호 : {settings.registrationNumber}</p>
              )}
              <p>주소 : {settings?.address || "충청북도 청주시 청원구 내덕동 788-115"}</p>
              <p>전화번호 : {settings?.phone || "010-5807-7888"}</p>
            </div>
          </div>
          <div className="text-sm space-y-3">
            <p className="leading-relaxed">
              금리 연 20% 이내 (연체이자율 포함 연 20% 이내)(단, 2021.7.7부터 체결·갱신·연장되는 계약에 한함), 취급수수료 없음, 중도상환 수수료 없음, 중개수수료 없음, 추가비용 없음.
            </p>
            <p className="leading-relaxed">
              상환기간 : 12개월 ~ 60개월 / 총 대출 비용 예시 : 100만원을 12개월 기간 동안 최대 금리 연 20% 적용하여 원리금균등상환법으로 이용하는 경우 총 상환금액 1,111,614원 (단, 대출상품 및 상환방법 등 대출계약 내용에 따라 달라질 수 있습니다). 채무의 조기상환수수료 등 조기상환조건 없음.
            </p>
            <p className="text-red-400/90 font-medium leading-relaxed">
              과도한 빚은 당신에게 큰 불행을 안겨줄 수 있습니다. 중개수수료를 요구하거나 받는 것은 불법입니다. 대출 시 귀하의 신용등급이 하락할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center text-xs sm:text-sm">
          <p>© 2025 우주캐피탈대부. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
