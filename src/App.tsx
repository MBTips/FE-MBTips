import PrimaryButton from "./components/PrimaryButton";

function App() {
  return (
    <>
      <PrimaryButton size="sm" backgroundColor="#E6E8ED">
        다시 추천
      </PrimaryButton>
      <PrimaryButton size="sm" backgroundColor="#5C4AE8">
        다시 추천
      </PrimaryButton>
      <PrimaryButton size="md" backgroundColor="#5C4AE8">
        대화 시작하기
      </PrimaryButton>
      <PrimaryButton size="md" disabled={true}>
        선택 완료
      </PrimaryButton>
      <PrimaryButton size="md" backgroundColor="#F9E622">
        카카오로 시작하기
      </PrimaryButton>
    </>
  );
}

export default App;
