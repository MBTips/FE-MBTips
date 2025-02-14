const TipsMenu = ({
  mode
}: {
  mode: "topic" | "conversation" | "temporature";
}) => {
  let text = "";
  let imageUrl = "";
  switch (mode) {
    case "topic":
      text = "대화 주제 추천";
      imageUrl = "/icon/starbubble.svg";
      break;
    case "conversation":
      text = "대화 꿀팁";
      imageUrl = "/icon/lightbulb.svg";
      break;
    case "temporature":
      text = "현재 대화의 온도 측정하기";
      imageUrl = "/icon/thermometer.svg";
      break;
    default:
      return;
  }

  return (
    <div className="flex bg-white px-4 py-4 border-gray-100 border-b w-[375px] h-[56px]">
      <img src={imageUrl} alt={text} width={20} height={20} />
      <h2 className="ml-[22px] font-medium text-2lg text-gray-800">{text}</h2>
    </div>
  );
};

export default TipsMenu;
