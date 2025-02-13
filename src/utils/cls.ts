// 여러 문자열의 className을 인자로 받아 하나의 className으로 반환해주는 함수
const cls = (...classses: (string | undefined | false)[]) => {
  return classses.filter(Boolean).join(" ");
};

export default cls;
