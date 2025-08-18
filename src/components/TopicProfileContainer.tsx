import Profile from "@/components/Profile";

type TopicData = {
  chatTitle: string;
  description: string;
  image: string;
};

const topicData: TopicData[] = [
  {
    chatTitle: "N의 대화",
    description: "망상력 N% 대화방",
    image: "/image/N의_대화.svg"
  },
  {
    chatTitle: "F의 대화",
    description: "F 감성 대화방",
    image: "/image/F의_대화.svg"
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
