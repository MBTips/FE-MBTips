import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { CONTENT_DATA } from "@/constants/CONTENT";
import { trackEvent } from "@/libs/analytics";
import React from "react";
import Header from "@/components/header/Header";

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const content = CONTENT_DATA[Number(id) - 1];

  if (!content) {
    return <div className="mt-10 text-center">Content not found</div>;
  }

  const handleStartChat = () => {
    trackEvent("Click", {
      page: "일반 콘텐츠",
      element: "대화 시작하기"
    });

    navigate("/select-info", { state: { type: "fastFriend" } });
  };

  const renderContentWithLineBreaks = (text: string) => {
    return text
      .split("\n")
      .map((line, index) => (
        <React.Fragment key={index}>
          {line.trim() ? <p>{line}</p> : <br />}
        </React.Fragment>
      ));
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={
            id === "1"
              ? "상대방 MBTI 알아보기 Test"
              : id === "2"
                ? "썸탈 때 대화주제 추천(MBTI별)"
                : "MBTI 별 피해야할 대화스타일/주제"
          }
        />
        <meta
          property="og:description"
          content={
            id === "1"
              ? "상대방 MBTI 알아보기 Test"
              : id === "2"
                ? "썸탈 때 대화주제 추천(MBTI별)"
                : "MBTI 별 피해야할 대화스타일/주제"
          }
        />
        <meta
          property="twitter:description"
          content={
            id === "1"
              ? "상대방 MBTI 알아보기 Test"
              : id === "2"
                ? "썸탈 때 대화주제 추천(MBTI별)"
                : "MBTI 별 피해야할 대화스타일/주제"
          }
        />
      </Helmet>

      <div className="flex w-full flex-col bg-white lg:w-[500px]">
        <Header title="콘텐츠" />

        <div className="flex flex-col gap-[36px] px-5 py-5">
          {/* 상단 배너 */}
          <div className="relative overflow-hidden rounded-[16px] bg-gray-100">
            <picture>
              <source media="(min-width: 500px)" srcSet={content.image.lg} />
              <source media="(min-width: 375px)" srcSet={content.image.md} />
              <img
                src={content.image.sm}
                alt={content.title}
                className="h-[156px] w-full object-cover"
              />
            </picture>
          </div>

          {/* 서브 제목 */}
          {content.subTitle && (
            <h2 className="tracking[-0.01em] text-[18px] leading-[27px] font-bold text-gray-900">
              {content.subTitle}
            </h2>
          )}

          {/* 본문 내용 */}
          <div className="tracking-norma mb-[1px] text-lg leading-6 font-medium text-gray-900">
            {content.content && renderContentWithLineBreaks(content.content)}
          </div>

          {/* 하단 버튼 */}
          <button
            className="my-[22px] h-[60px] w-full rounded-[8px] bg-primary-normal font-bold text-white"
            onClick={handleStartChat}
          >
            대화 시작하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Content;
