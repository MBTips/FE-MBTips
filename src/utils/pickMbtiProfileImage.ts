const pickMbtiProfileImage = (mbti?: string) => {
  if (!mbti) return "";

  let mbtiProfileImage = "";

  switch (mbti) {
    case "ISTJ":
      mbtiProfileImage = "/image/ISTJ_profile.png";
      break;
    case "ISFJ":
      mbtiProfileImage = "/image/ISFJ_profile.png";
      break;
    case "INFJ":
      mbtiProfileImage = "/image/INFJ_profile.png";
      break;
    case "INTJ":
      mbtiProfileImage = "/image/INTJ_profile.png";
      break;
    case "ISTP":
      mbtiProfileImage = "/image/ISTP_profile.png";
      break;
    case "ISFP":
      mbtiProfileImage = "/image/ISFP_profile.png";
      break;
    case "INFP":
      mbtiProfileImage = "/image/INFP_profile.png";
      break;
    case "INTP":
      mbtiProfileImage = "/image/INTP_profile.png";
      break;
    case "ESTP":
      mbtiProfileImage = "/image/ESTP_profile.png";
      break;
    case "ESFP":
      mbtiProfileImage = "/image/ESFP_profile.png";
      break;
    case "ENFP":
      mbtiProfileImage = "/image/ENFP_profile.png";
      break;
    case "ENTP":
      mbtiProfileImage = "/image/ENTP_profile.png";
      break;
    case "ESTJ":
      mbtiProfileImage = "/image/ESTJ_profile.png";
      break;
    case "ESFJ":
      mbtiProfileImage = "/image/ESFJ_profile.png";
      break;
    case "ENFJ":
      mbtiProfileImage = "/image/ENFJ_profile.png";
      break;
    case "ENTJ":
      mbtiProfileImage = "/image/ENTJ_profile.png";
      break;
    default:
      break;
  }

  return mbtiProfileImage;
};

export default pickMbtiProfileImage;
