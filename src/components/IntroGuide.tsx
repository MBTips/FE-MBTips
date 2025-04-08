const IntroGuide = () => {
  return (
    <div className="rounded-xl border border-primary-light bg-white p-5 text-black">
      <p className="text-md font-light whitespace-pre-line">
        {`MBTI 대화에 참여하셨군요!
        대화 상황에 대해 구체적으로
        말씀해주시면,더 좋은 답변을 드릴 수 있어요 :)`}
      </p>
      <p className="mt-2 block text-md font-medium">
        언제, 어디서, 어떤 상황인지 자유롭게 알려주세요
      </p>
    </div>
  );
};

export default IntroGuide;
