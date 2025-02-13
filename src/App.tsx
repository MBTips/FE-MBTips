import TipsMenu from "./components/TipsMenu";

function App() {
  return (
    <div>
      <TipsMenu mode="topic" />
      <TipsMenu mode="conversation" />
      <TipsMenu mode="temporature" />
    </div>
  );
}

export default App;
