import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cls } from "@/utils/cls";
import Indicator from "@/components/Indicator";

interface BannerImage {
  sm: string;
  md: string;
  lg: string;
  description: string;
}

const bannerImages: BannerImage[] = [
  {
    sm: "/image/home_banner1_sm.png",
    md: "/image/home_banner1_md.png",
    lg: "/image/home_banner1_lg.png",
    description: "내가 궁금한 그 사람의 MBTI는?"
  },
  {
    sm: "/image/home_banner2_sm.png",
    md: "/image/home_banner2_md.png",
    lg: "/image/home_banner2_lg.png",
    description: "썸탈 때 대화주제 추천 MBTI별 대백과"
  },
  {
    sm: "/image/home_banner3_sm.png",
    md: "/image/home_banner3_md.png",
    lg: "/image/home_banner3_lg.png",
    description: "MBTI별 피해야 할 대화스타일 및 주제"
  },
];

const Banner = () => {
  const [order, setOrder] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-[184px] w-full">
      <Link to={order === 0 ? "/mbti-test" : `/contents/${order}`} className="absolute w-full h-full">
        {bannerImages.map((image, index) => (
          <picture
            key={index}
            className={cls(
              "absolute transition-opacity duration-500 w-full h-full",
              order === index ? "opacity-100" : "opacity-0"
            )}
          >
            <source media="(min-width: 500px)" srcSet={image.lg} />
            <source media="(min-width: 375px)" srcSet={image.md} />
            <img src={image.sm} alt={image.description} className="w-full h-full object-cover" />
          </picture>
        ))}
      </Link>

      <div className="absolute right-5 bottom-5">
        <Indicator order={order} setOrder={setOrder} />
      </div>
    </div>
  );
};

export default Banner;
