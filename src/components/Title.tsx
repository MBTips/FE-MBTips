const Title = ({ mode }: { mode: "빠른대화" | "친구목록" }) => {
  let title = "제목 없음";
  let description = "설명 없음";

  switch (mode) {
    case "빠른대화":
      title = "빠른 대화";
      description = "대화가 저장되지 않아요.";
      break;
    case "친구목록":
      title = "친구 목록";
      description = "친구 정보와 대화 내용을 저장해요.";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center">
      <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
      <p className="ml-1.5 font-light text-md">{description}</p>
      {mode === "친구목록" && (
        <img
          className="ml-[78px]"
          src="/icon/plus.svg"
          alt="친구 추가 버튼"
          width={14}
          height={14}
        />
      )}
    </div>
  );
};

export default Title;
