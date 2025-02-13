const IntroGuide = () => {
  return (
    <div className="bg-white p-5 border border-primary-light rounded-xl">
      <p className="font-light text-lg">
        MBTI 대화에 참여하셨군요!
        <br />
        대화 상황에 대해 구체적으로 말씀해주시면,
        <br />더 좋은 답변을 드릴 수 있어요 {":)"}
      </p>
      <strong className="block mt-2 font-medium text-lg">
        언제, 어디서, 어떤 상황인지 자유롭게 알려주세요
      </strong>
    </div>
  );
};

export default IntroGuide;
