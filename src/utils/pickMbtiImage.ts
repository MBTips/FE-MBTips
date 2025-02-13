import { Mbti } from "@/types/mbti";

const pickMbtiImage = (mbti: Mbti) => {
  let mbtiImage = "";

  switch (mbti) {
    case "ISTJ":
      mbtiImage = "/image/ISTJ.png";
      break;
    case "ISFJ":
      mbtiImage = "/image/ISFJ.png";
      break;
    case "INFJ":
      mbtiImage = "/image/INFJ.png";
      break;
    case "INTJ":
      mbtiImage = "/image/INTJ.png";
      break;
    case "ISTP":
      mbtiImage = "/image/ISTP.png";
      break;
    case "ISFP":
      mbtiImage = "/image/ISFP.png";
      break;
    case "INFP":
      mbtiImage = "/image/INFP.png";
      break;
    case "INTP":
      mbtiImage = "/image/INTP.png";
      break;
    case "ESTP":
      mbtiImage = "/image/ESTP.png";
      break;
    case "ESFP":
      mbtiImage = "/image/ESFP.png";
      break;
    case "ENFP":
      mbtiImage = "/image/ENFP.png";
      break;
    case "ENTP":
      mbtiImage = "/image/ENTP.png";
      break;
    case "ESTJ":
      mbtiImage = "/image/ESTJ.png";
      break;
    case "ESFJ":
      mbtiImage = "/image/ESFJ.png";
      break;
    case "ENFJ":
      mbtiImage = "/image/ENFJ.png";
      break;
    case "ENTJ":
      mbtiImage = "/image/ENTJ.png";
      break;
    default:
      break;
  }

  return mbtiImage;
};

export default pickMbtiImage;
