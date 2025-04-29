import TipsMenu from "@/components/tips/TipsMenu";

const TipsMenuContainer = ({
  conversationId,
  mbti
}: {
  conversationId: string;
  mbti: string;
}) => {
  return (
    <>
      <TipsMenu mode="topic" mbti={mbti} />
      <TipsMenu mode="conversation" mbti={mbti} />
      <TipsMenu mode="temperature" conversationId={conversationId} />
    </>
  );
};

export default TipsMenuContainer;
