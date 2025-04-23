// TypeScript 사용 시에는 TypeScript 가 window객체에 존재하는 Kakao객체를 인식할 수 있도록 src내에 global.d.ts를 설정해줘야 오류가 발생하지 않는다.
interface Window {
    Kakao: any;
}