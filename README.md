# MBTips - 성격 유형 기반 팁 공유 플랫폼

🌐 [https://mbtips.kr](https://mbtips.kr)

MBTips는 MBTI 성격 유형에 따라 다양한 상황별 팁을 확인하고, 다른 유형과 소통할 수 있는 웹 서비스입니다.  
사용자는 상대의 성격 유형을 유추해보거나, 유형별 상황 대응법을 확인하고, 궁금한 MBTI와 실시간 채팅을 통해 대화를 나눌 수 있습니다.

> ⏱️ **개발 기간**: 2025년 2월 ~ 2025년 5월 (약 4개월)  
> 🎨 **프론트엔드 담당**: UI/UX 설계, 컴포넌트 구현, 상태 관리, 라우팅 및 API 연동

---

## 🧩 주요 기능

- 🔍 **상대 MBTI 추측 검사하기**  
  질문에 답하면서 상대방의 MBTI를 유추해보는 인터랙티브 검사

- 💡 **MBTI별 상황별 팁 보기**  
  유형별로 상황(연애 등)에 따른 대화 팁과 조언 제공

- 💬 **MBTI별 채팅 기능**  
  내가 궁금한 MBTI 유형과 실시간 채팅으로 대화 체험

---

## 🚀 기술 스택

### 프론트엔드

| 기술 | 설명 |
|------|------|
| **React 18** | SPA 프레임워크 |
| **Vite 6** | 빠른 번들링 및 개발 서버 |
| **TypeScript** | 정적 타입 지원 |
| **Zustand** | 상태 관리 라이브러리 |
| **React Router DOM v7** | 클라이언트 사이드 라우팅 |
| **Tailwind CSS 4** | 유틸리티 기반 CSS 프레임워크 |
| **Axios** | HTTP 클라이언트 |
| **React GA4** | 구글 애널리틱스 연동 |
| **ESLint + Prettier** | 코드 스타일 자동화

---

## 📁 프로젝트 구조

```bash
src/
├── api/               # API 요청 함수 모음
├── components/        # 재사용 가능한 UI 컴포넌트
├── constants/         # 상수 정의 (ex. MBTI 목록, 메시지 등)
├── hooks/             # 커스텀 React Hooks
├── libs/              # 외부 라이브러리 래퍼 (예: GA 등)
├── mock/              # 목업 데이터 및 정적 페이지용 데이터
├── pages/             # 라우팅되는 주요 페이지 컴포넌트
├── store/             # Zustand를 활용한 상태 관리
├── types/             # 전역 TypeScript 타입 정의
├── utils/             # 공통 유틸리티 함수
├── App.tsx            # 루트 컴포넌트
├── main.tsx           # 앱 진입점
├── index.css          # 글로벌 스타일
├── global.d.ts        # 글로벌 타입 선언
├── vite-env.d.ts      # Vite 환경 타입 선언
└── ...


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
}) 
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
