import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import { getOpenChatRooms } from "@/api/openChat";
import { OpenChatRoom } from "@/types/openChat";

type TopicData = {
  chatTitle: string;
  description: string;
  image: string;
  openChatId: number;
};

const TopicProfileContainer = () => {
  const [topicData, setTopicData] = useState<TopicData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOpenChatRooms = async () => {
      try {
        const rooms = await getOpenChatRooms();
        const convertedData: TopicData[] = rooms.map((room: OpenChatRoom) => ({
          chatTitle: room.title,
          description: room.description,
          image: room.imageUrl || "/image/N의_대화.svg",
          openChatId: room.id
        }));

        if (convertedData.length !== 0) {
          setTopicData(convertedData);
        } else {
          setTopicData([
            {
              chatTitle: "N의 대화",
              description: "망상력 N% 대화방",
              image: "/image/N의_대화.svg",
              openChatId: 1
            },
            {
              chatTitle: "F의 대화",
              description: "F 감성 대화방",
              image: "/image/F의_대화.svg",
              openChatId: 2
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to load open chat rooms:", error);
        // 오류 시 기본값 사용
        setTopicData([
          {
            chatTitle: "N의 대화",
            description: "망상력 N% 대화방",
            image: "/image/N의_대화.svg",
            openChatId: 1
          },
          {
            chatTitle: "F의 대화",
            description: "F 감성 대화방",
            image: "/image/F의_대화.svg",
            openChatId: 2
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOpenChatRooms();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-7">
        <div className="h-[192px] w-[157px] animate-pulse rounded-[8px] bg-gray-100" />
        <div className="h-[192px] w-[157px] animate-pulse rounded-[8px] bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-7">
      {topicData.map((topic, index) => (
        <Profile key={index} mode="topic" topicData={topic} />
      ))}
    </div>
  );
};

export default TopicProfileContainer;
