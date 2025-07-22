import Profile from "@/components/Profile";

type TopicData = {
  chatTitle: string;
  description: string;
};

const topicData: TopicData[] = [
  {
    chatTitle: "T의 대화",
    description: "mbti t인사람들 모임"
  },
  {
    chatTitle: "F의 대화",
    description: "mbti f인사람들 모임"
  }
];

const TopicProfileContainer = () => {
  return (
    <div className="grid grid-cols-2 gap-7">
      {topicData.map((topic, index) => (
        <Profile key={index} mode="topic" topicData={topic} />
      ))}
    </div>
  );
};

export default TopicProfileContainer;
