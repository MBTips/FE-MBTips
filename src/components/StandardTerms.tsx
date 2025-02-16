const StandardTerms = () => {
  return (
    <div className="flex justify-between bg-white px-5 py-4 w-full h-[56px]">
      <h3 className="font-medium text-2lg text-gray-900">이용약관</h3>
      {/* App.tsx에서 React.routes 설정이 완료되면 react-router-dom의 Link로 변경 예정 */}
      <a href="/terms">
        <img
          src="/icon/arrow_right.svg"
          alt="이용약관 보이기"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
};

export default StandardTerms;
