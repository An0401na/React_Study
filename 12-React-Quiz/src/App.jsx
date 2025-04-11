import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Summary from "./components/Summary.jsx";

function App() {
  //Todo: useState로 viewMode를 관리 (quiz, summary)
  return (
    <>
      <Header />
      {/*<Quiz />*/}
      <Summary />
    </>
  );
}
export default App;
