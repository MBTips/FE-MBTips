const StrokeBanner = () => {
  return (
    <div>
      <div className="flex flex-col px-[38px] py-6 w-[335px] h-[178px]">
        <img src="/public/icon/plus_button.svg" alt="친구 등록 버튼" />
        <strong className="font-bold text-4 text-gray-900">
          친구 정보를 저장하고 대화할 수 있어요
        </strong>
        <p className="font-light text-gray-900 text-sm">
          로그인 시 기억하고 싶은 친구의 MBTI와 특징을 입력해서 빠르게 대화할 수
          있어요
        </p>
      </div>
    </div>
  );
};

export default StrokeBanner;
