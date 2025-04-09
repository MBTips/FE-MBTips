import instance from "@/api/axios";
import Header from "@/components/header/Header";
import { trackEvent } from "@/libs/analytics";
import React from "react";
import { useParams } from "react-router-dom";

const contentData = [
  {
    id: 0, // TODO: 차주(3/24 ~) 개발 필요
    title: "내가 궁금한 그 사람의 MBTI는?",
    image: {
      sm: "/image/home_banner1_sm.png",
      md: "/image/home_banner1_md.png",
      lg: "/image/home_banner1_lg.png"
    },
    subTitle: "",
    content: ""
  },
  {
    id: 1,
    title: "썸탈 때 대화주제 추천 MBTI별 대백과",
    image: {
      sm: "/image/home_banner2_sm.png",
      md: "/image/home_banner2_md.png",
      lg: "/image/home_banner2_lg.png"
    },
    subTitle: "썸탈 때 대화주제 추천(MBTI별)",
    content: `썸 탈 때 이런 주제를 활용해보세요! MBTI 별로 추천드려요. 조금 더 자세한 대화주제 추천을 원한다면? 대화를 시작해보세요~

      ISTJ (청렴한 관리자):
      - "이번 주말에 뭐 할 계획이야? 나는 친구들과 등산 가기로 했어."
      - 설명: 구체적인 계획에 대해 이야기하며 서로의 일정을 공유하는 것을 좋아해요!

      ISFJ (세심한 보호자):
      -  "가족이랑 휴가는 보통 어떻게 보내?"
      - 설명: 가족과의 관계나 전통적인 활동에 대해 이야기하는 것을 선호해요!

      INFJ (통찰력 있는 상담자):
      -  "최근에 읽은 책 중에 감명 깊었던 게 있어? 나는 '인간의 조건'이라는 책을 읽었는데, 정말 많은 생각을 하게 해."
      - 설명: 깊이 있는 주제에 대해 이야기하며 서로의 감정을 나누는 것을 좋아해요!

      INTJ (전략가):
      -  "5년 후에 어떤 모습이 되고 싶어?"
      - 설명: 미래에 대한 비전이나 목표에 대해 이야기하는 것을 선호해요!

      ISTP (유연한 문제 해결사):
      -  "혹시 취미가 있어? 나는 드론 촬영에 빠져 있어."
      - 설명: 취미나 액티비티에 대한 이야기를 나누며 실용적인 대화를 좋아해요!

      ISFP (자유로운 예술가):
      -  "혹시 전시회 좋아해? 나는 미술 전시회에 갔었는데, 정말 감동적이었어."
      - 설명: 예술적 경험이나 감정에 대해 이야기하는 것을 선호해요!

      INFP (이상적인 중재자):
      -  "이 다음에 하고 싶은 일 이써? 나는 언젠가 나만의 책을 쓰고 싶어."
      - 설명: 개인의 가치관이나 꿈에 대해 이야기하며 감정적인 연결을 중요시해요!

      INTP (논리적인 사색가):
      -  "양자역학에 대해 들어봤어?"
      - 설명: 새로운 아이디어나 이론에 대한 논의, 호기심을 자극하는 주제를 좋아해요!

      ESTP (모험적인 활동가):
      -  "혹시 스카이다이빙 해봤어? 정말 짜릿했어!"
      - 설명: 새로운 경험이나 모험에 대한 이야기를 나누는 것을 선호해요!

      ESFP (사교적인 연예인):
      -  "이번 주말에 ㅇㅇ컨퍼런스 가는 거 어때? 재미있을 것 같아!"
      - 설명: 즐거운 경험이나 사회적 활동에 대한 이야기를 나누는 것을 좋아해요!

      ENFP (열정적인 활동가):
      -  "너는 어떤 가능성을 탐색하고 있어? 나는 새로운 프로젝트를 시작할까 고민 중이야."
      - 설명: 다양한 가능성이나 창의적인 아이디어에 대한 이야기를 나누는 것을 선호해요!

      ENTP (발명가):
      -  "너는 AI의 미래에 대해 어떻게 생각해?"
      - 설명: 논쟁적인 주제나 새로운 아이디어에 대한 토론을 즐겨요!

      ESTJ (효율적인 관리자):
      -  "최근에 일 할 때 가장 뿌듯했던  경험있어?"
      - 설명: 목표 달성이나 성과에 대한 이야기를 나누는 것을 선호해요!

      ESFJ (사교적인 조정자):
      -  "친구들이랑 보통 뭐하고 놀아?"
      - 설명: 사람들과의 관계나 사회적 활동에 대한 이야기를 나누는 것을 좋아해요!

      ENFJ (카리스마 있는 리더):
      -  "사람들과의 관계에서 가장 중요하다고 생각하는 건 뭐야? 나는 신뢰가 가장 중요하다고 생각해."
      - 설명: 사람들의 감정이나 관계에 대한 이야기를 나누는 것을 선호해요!

      ENTJ (결단력 있는 지휘관):
      -  "회사에서 좋은 리더란 어떤 리더일까?"
      - 설명: 전략적 사고나 리더십에 대한 이야기를 나누는 것을 좋아해요!`
  },
  {
    id: 2,
    title: "MBTI별 피해야 할 대화스타일 및 주제",
    image: {
      sm: "/image/home_banner3_sm.png",
      md: "/image/home_banner3_md.png",
      lg: "/image/home_banner3_lg.png"
    },
    subTitle: "MBTI 별 피해야할 대화스타일 & 주제",
    content: `MBTI 별로 피해야 하는 대화 스타일, 주제를 알아보아요! 

      ISTJ (청렴한 관리자):
      - 비효율적인 대화, 감정적인 논의.
      - 예시 : 계획이나 규칙을 무시하고 즉흥적으로 행동하는 사람과의 대화. 감정적인 불만이나 개인적인 이야기를 과도하게 나누는 것.

      ISFJ (세심한 보호자):
      - 비판적이거나 공격적인 대화.
      - 예시 : 자신의 가치관이나 선택을 비난하는 대화. 갈등을 일으키는 주제, 예를 들어 정치적 논쟁.

      INFJ (통찰력 있는 상담자):
      - 피상적인 대화.
      - 예시 : 날씨나 소소한 일상 이야기만 하는 것. 깊이 있는 감정이나 철학적 주제를 회피하는 대화.

      INTJ (전략가):
      - 비논리적이거나 비효율적인 대화.
      - 예시 : 감정에 치우친 주장이나 비합리적인 결정에 대한 논의. 구체적인 근거 없이 의견을 제시하는 것.

      ISTP (유연한 문제 해결사):
      - 지나치게 감정적인 대화.
      - 예시 : 감정적인 문제를 과도하게 분석하거나, 감정 표현을 강요하는 대화.

      ISFP (자유로운 예술가):
      - 강압적인 대화나 비판.
      - 예시 : 자신의 창의적인 아이디어를 부정하거나, 강제로 의견을 바꾸려는 대화.

      INFP (이상적인 중재자):
      - 비인간적이거나 냉정한 대화.
      - 예시 : 사람의 감정을 무시하고 논리만 강조하는 대화. 비인간적인 결정이나 정책에 대한 논의.

      INTP (논리적인 사색가):
      - 비논리적이거나 감정적인 대화.
      - 예시 : 감정에 기반한 주장을 하거나, 논리적 근거 없이 의견을 제시하는 것.

      ESTP (모험적인 활동가):
      - 지루한 대화나 지나치게 이론적인 논의.
      - 예시 : 복잡한 이론이나 과도한 분석을 요구하는 대화. 즉흥적인 행동을 비판하는 것.

      ESFP (사교적인 연예인):
      - 부정적인 대화나 지나치게 심각한 주제.
      - 예시 : 우울한 이야기나 비관적인 전망을 이야기하는 것. 너무 진지한 주제로 대화하는 것.

      ENFP (열정적인 활동가):
      - 제한적이거나 비판적인 대화.
      - 예시 : 새로운 아이디어를 억누르거나, 비판적인 태도로 접근하는 대화.

      ENTP (발명가):
      - 고정관념이나 전통적인 대화.
      - 예시 : 기존의 방식을 고수하고 새로운 아이디어를 받아들이지 않는 대화.

      ESTJ (효율적인 관리자):
      - 비효율적인 대화나 감정적인 논의.
      - 예시 : 감정적인 문제를 과도하게 다루거나, 실질적인 해결책 없이 불만을 토로하는 것.

      ESFJ (사교적인 조정자):
      - 갈등을 일으키는 대화.
      - 예시 : 사람들 간의 갈등을 부추기거나, 비판적인 태도로 대화하는 것.

      ENFJ (카리스마 있는 리더):
      - 비협조적인 대화.
      - 예시 : 팀워크를 무시하고 개인적인 이익만을 추구하는 대화.

      ENTJ (결단력 있는 지휘관):
      - 비효율적이거나 비논리적인 대화.
      - 예시 : 목표 달성을 방해하는 비효율적인 논의나, 감정적인 요소를 과도하게 강조하는 것.`
  }
];

const Content = () => {
  const { id } = useParams<{ id: string }>();
  const content = contentData[Number(id)];

  if (!content) {
    return <div className="mt-10 text-center">Content not found</div>;
  }

  const handleStartChat = async () => {
    try {
      trackEvent("Click", {
        page: "일반 콘텐츠",
        element: "대화 시작하기"
      });
      const response = await instance.post("/api/fast-friend");
      console.log("Success!!", response.data);
    } catch (error) {
      console.error("Select Info Error", error);
    }
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
    <div className="flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
      <Header title="상대방 정보선택" />

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
  );
};

export default Content;
