import { useEffect, useState } from "react";
import { cls } from "@/utils/cls";
import Indicator from "@/components/Indicator";

const Banner = () => {
  const [order, setOrder] = useState(0);

  const images = [
    {
      src: "/image/home_banner_1.png",
      description: "사춘기 자녀와의 대화에서 중요한건?"
    },
    {
      src: "/image/home_banner_2.png",
      description: "MBTI별 피해야 할 대화스타일 및 주제"
    },
    {
      src: "/image/home_banner_3.png",
      description: "썸탈 때 대화주제 추천 MBTI별 대백과"
    }
  ];

  useEffect(function animateThreeSeconds() {
    const intervalEffect = setInterval(() => {
      setOrder((prevOrder) => (prevOrder + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(intervalEffect);
    };
  }, []);

  return (
    <div className="relative flex w-full h-[184px]">
      {images.map((image, index) => (
        // a -> Link로 바꿀 예정
        <a href={`/contents/${index}`}>
          <img
            key={index}
            className={cls(
              "absolute transition-opacity duration-500",
              order === index ? "opacity-100" : "opacity-0"
            )}
            src={image.src}
            alt={image.description}
          />
        </a>
      ))}
      <div className="right-[20px] bottom-[12px] absolute">
        <Indicator order={order} setOrder={setOrder} />
      </div>
    </div>
  );
};

export default Banner;
