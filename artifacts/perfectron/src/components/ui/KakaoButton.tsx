import { useGetSettings } from "@workspace/api-client-react";

function KakaoIcon() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="h-8 w-8 sm:h-9 sm:w-9"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 카카오톡 공식 말풍선 로고 */}
      <path
        d="M256 64C150.125 64 64 138.5 64 230c0 57.156 33.156 107.438 83.375 138.5-3.5 11.813-21.844 75.125-22.031 76.438 0 0-.5 4.5 2.313 6.188 2.781 1.656 6.063.281 6.063.281l92.75-63.469C238.563 389.594 247.188 390 256 390c105.875 0 192-74.5 192-166S361.875 64 256 64z"
        fill="#391B1B"
      />
    </svg>
  );
}

export function KakaoButton() {
  const { data: settings } = useGetSettings();

  if (!settings?.kakaoLink) return null;

  const handleClick = () => {
    window.open(settings.kakaoLink, "_blank");
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-1.5">
      <button
        onClick={handleClick}
        className="flex h-14 w-14 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full bg-[#FEE500] shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="카카오톡 상담하기"
      >
        <KakaoIcon />
      </button>
      <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white shadow-sm whitespace-nowrap">
        TALK 상담하기
      </span>
    </div>
  );
}
