import TipsMenu from "@/components/tips/TipsMenu";

const TipsMenuContainer = () => {
  return (
    <>
      <TipsMenu mode="topic" />
      <TipsMenu mode="conversation" />
      <TipsMenu mode="temporature" />
    </>
  );
};

export default TipsMenuContainer;
