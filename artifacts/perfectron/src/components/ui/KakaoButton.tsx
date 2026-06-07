import { useGetSettings } from "@workspace/api-client-react";

function KakaoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="h-8 w-8 sm:h-9 sm:w-9"
      aria-hidden="true"
    >
      <path
        d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.29 405.175C340.119 422.241 299.523 430.774 255.5 430.774C241.607 430.774 227.044 429.809 211.823 427.878L181.198 451.065C163.538 464.354 143.925 471 122.358 471C117.025 471 114.358 469.243 114.358 465.729C114.358 464.499 116.404 458.88 120.497 448.871C124.59 438.862 127.871 428.237 130.34 417C116.447 408.052 109.5 398.027 109.5 386.923L109.5 383.154C75.1667 372.667 47.9167 356.032 27.75 333.247C7.58333 310.463 -2.5 284.219 -2.5 254.516C-2.5 219.842 8.32567 187.786 29.977 158.348C51.6283 128.911 81.0847 105.659 118.345 88.5928C155.604 71.5264 196.156 63 238 63L255.5 48Z"
        fill="#000000"
        transform="translate(8 8) scale(0.95)"
      />
      <text
        x="256"
        y="290"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="220"
        textAnchor="middle"
        fill="#FEE500"
        letterSpacing="-5"
      >K</text>
    </svg>
  );
}

export function KakaoButton() {
  const { data: settings } = useGetSettings();

  const handleClick = () => {
    if (settings?.kakaoLink) {
      window.open(settings.kakaoLink, "_blank");
    }
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
