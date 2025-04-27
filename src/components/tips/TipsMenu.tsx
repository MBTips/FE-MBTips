import { Link } from "react-router-dom";

const TipsMenu = ({
  mode,
  mbti,
  conversationId
}: {
  mode: "topic" | "conversation" | "temporature";
  mbti?: string;
  conversationId?: string;
}) => {
  let text = "";
  let imageUrl = "";
  let href = "";

  switch (mode) {
    case "topic":
      text = "대화 주제 추천";
      imageUrl = "/icon/starbubble.svg";
      href = `/chat-recommend/${mbti}`;
      break;
    case "conversation":
      text = "대화 꿀팁";
      imageUrl = "/icon/lightbulb.svg";
      href = `/chat-tips/${mbti}`;
      break;
    case "temporature":
      text = "현재 대화의 온도 측정하기";
      imageUrl = "/icon/thermometer.svg";
      href = `/chat-temporature/${conversationId}`;
      break;
    default:
      return;
  }

  return (
    <Link to={href}>
      <div className="flex h-[56px] w-full border-t border-gray-100 bg-white px-4 py-4 hover:bg-primary-pale">
        <img src={imageUrl} alt={text} width={20} height={20} />
        <h2 className="text-2lg ml-[22px] font-medium text-gray-800">{text}</h2>
      </div>
    </Link>
  );
};

export default TipsMenu;
