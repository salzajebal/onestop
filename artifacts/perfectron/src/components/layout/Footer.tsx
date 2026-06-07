import { useGetSettings } from "@workspace/api-client-react";

export function Footer() {
  const { data: settings } = useGetSettings();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">퍼펙트론</h2>
            <div className="space-y-2 text-sm">
              <p>상호: {settings?.companyName || "퍼펙트론"}</p>
              <p>대표자: {settings?.representative || "-"}</p>
              <p>사업자등록번호: {settings?.businessNumber || "-"}</p>
              <p>주소: {settings?.address || "-"}</p>
              <p>대표전화: {settings?.phone || "-"}</p>
            </div>
          </div>
          <div className="text-sm space-y-4">
            <p className="leading-relaxed">
              금리 이내(연체이자 포함, 2021.7.7부터 체결, 갱신, 연장하는 계약에 한함), 취급수수료 없음, 중도상환 수수료 없음, 중개수수료 없음, 추가비용 없음. 상환기간 : 12개월 ~ 120개월
            </p>
            <p className="text-red-400/90 font-medium leading-relaxed">
              과도한 빚은 당신에게 불행을 안겨 줄 수 있습니다. 중개수수료를 요구하거나 받는 것은 불법입니다. 대출 시 귀하의 신용등급이 하락할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm">
          <p>© 2025 퍼펙트론. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
