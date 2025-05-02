import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Mbti } from "@/types/mbti";
import { tips } from "@/mock/tips";
import Header from "@/components/header/Header";
import pickMbtiImage from "@/utils/pickMbtiImage";
import Error from "@/pages/Error";

const ChatTips = () => {
  const { mbti } = useParams();
  let title = "";
  let description = "";
  let mbtiImage = "";

  if (mbti) {
    title = tips[mbti].title;
    description = tips[mbti].description;
    mbtiImage = pickMbtiImage(mbti as Mbti);
  } else return <Error statusCode="404" />;

  return (
    <>
      <Helmet>
        <meta name="description" content="대화 꿀팁" />
        <meta property="og:description" content="대화 꿀팁" />
      </Helmet>

      <div>
        <Header
          title="대화 꿀팁"
          showPreviousIcon={true}
          showShareIcon={true}
        />
        <main className="mx-auto flex h-screen flex-col px-5 py-6">
          <img
            src={mbtiImage}
            alt="mbti 이미지"
            className="h-auto w-full rounded-2xl"
          />
          <h1 className="mt-9 text-xl font-bold">{title}</h1>
          <span className="mt-6 whitespace-pre-wrap">{description}</span>
        </main>
      </div>
    </>
  );
};

export default ChatTips;
