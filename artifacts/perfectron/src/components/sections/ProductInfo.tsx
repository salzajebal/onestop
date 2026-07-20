const productRows = [
  {
    label: "대상 고객",
    isGroup: true,
    items: [
      { sub: "직장인 상품", desc: "재직 중이며 일정한 소득이 확인되는 분" },
      { sub: "사업자 상품", desc: "사업 1개월 이상, 소득 증빙이 가능한 분" },
      { sub: "무직자 상품", desc: "소득 확인은 어려우나 본인 신원이 확인되는 분" },
      { sub: "연체자 상품", desc: "연체 이력이 있거나 신용회복을 진행 중인 분" },
    ],
  },
  { label: "대출 지역", value: "전국" },
  { label: "대출 한도", value: "상담 후 안내 (심사 결과에 따라 결정)" },
  { label: "대출 금리", value: "연 4.95% ~ 연 20% 이내" },
  { label: "대출 기간", value: "12개월 ~ 60개월" },
  { label: "상환 방법", value: "원리금 균등분할상환 / 만기일시상환" },
  { label: "중도상환 수수료", value: "없음" },
  { label: "연체이자율", value: "약정금리 + 연 3%p 이내 (법정 최고금리 연 20% 이내)" },
  { label: "부대 비용", value: "없음 (선입금·중개수수료 일체 없음)" },
];

export function ProductInfo() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-[#22c55e] mb-2">상품 안내</p>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            대출 상품을 미리 확인하세요
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            최종 한도와 금리는 금융사 심사 결과 및 약관에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <tbody>
              {productRows.map((row, i) =>
                row.isGroup ? (
                  row.items!.map((item, j) => (
                    <tr key={`${i}-${j}`} className="border-b border-gray-100">
                      <td
                        className="w-1/4 bg-gray-50 px-5 py-3.5 font-semibold text-gray-700 align-middle"
                        rowSpan={j === 0 ? row.items!.length : undefined}
                        style={j === 0 ? {} : { display: "none" }}
                      >
                        {j === 0 ? row.label : ""}
                      </td>
                      <td className="w-1/4 px-5 py-3.5 font-medium text-gray-600 border-l border-gray-100">
                        {item.sub}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">{item.desc}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="w-1/4 bg-gray-50 px-5 py-3.5 font-semibold text-gray-700">
                      {row.label}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 border-l border-gray-100" colSpan={2}>
                      {row.value}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-400 leading-relaxed">
          ※ 본 표는 상품 안내를 위한 예시이며, 실제 계약 조건은 금융사 심사 결과 및 약관에 따라 달라집니다.
        </p>
      </div>
    </section>
  );
}
