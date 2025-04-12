import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Summary from "./components/Summary.jsx";
import QUIZS from "./questions.js";
import _ from "lodash";

function App() {
  console.log("App 재랜더링");
  //Todo: useState로 viewMode를 관리 (quiz, summary)

  const shuffledQuizs = _.shuffle(QUIZS);
  console.log(shuffledQuizs);

  return (
    <>
      <Header />
      <Quiz quizs={shuffledQuizs} />
      {/*<Summary />*/}
    </>
  );
}
export default App;
