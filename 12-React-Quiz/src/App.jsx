import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";

function App() {
  //Todo: useState로 viewMode를 관리 (quiz, summary)
  return (
    <>
      <Header />
      <Quiz />
    </>
  );
}
export default App;
