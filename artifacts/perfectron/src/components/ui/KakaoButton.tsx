import { MessageCircle } from "lucide-react";
import { useGetSettings } from "@workspace/api-client-react";

export function KakaoButton() {
  const { data: settings } = useGetSettings();
  
  const handleClick = () => {
    if (settings?.kakaoLink) {
      window.open(settings.kakaoLink, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FEE500] text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="카카오톡 상담하기"
      >
        <MessageCircle size={36} className="text-[#000000]" />
      </button>
      <span className="rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white shadow-sm">
        TALK 상담하기
      </span>
    </div>
  );
}
