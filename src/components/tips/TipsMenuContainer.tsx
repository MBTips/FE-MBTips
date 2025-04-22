import TipsMenu from "@/components/tips/TipsMenu";

const TipsMenuContainer = ({ conversationId }: { conversationId: string }) => {
  return (
    <>
      <TipsMenu mode="topic" conversationId={conversationId} />
      <TipsMenu mode="conversation" conversationId={conversationId} />
      <TipsMenu mode="temporature" conversationId={conversationId} />
    </>
  );
};

export default TipsMenuContainer;
