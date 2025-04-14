import React, { useCallback, useContext, useEffect, useState } from "react";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import { UserAnswerContext } from "../store/user-answer-context.jsx"; // 사용자 답안을 관리하는 Context

function Quiz({ quizs, onQuizEnd }) {
  // 현재 퀴즈 인덱스 상태 (어떤 퀴즈를 풀고 있는지)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  // 퀴즈 진행 상태 (퀴즈 화면, 선택된 답 보여주기, 정답 보기 등)
  const [quizStage, setQuizStage] = useState("quiz"); // "quiz" or "showSelectedAnswer" or "showCorrectAnswer"

  // 사용자가 선택한 답 상태
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // UserAnswerContext에서 답안을 추가하는 함수 가져오기
  const { addUserAnswer } = useContext(UserAnswerContext);

  // 현재 문제 (현재 퀴즈 배열에서 `currentQuizIndex` 번째 문제)
  const quiz = quizs[currentQuizIndex];

  // 각 퀴즈 스테이지에 따른 타이머 값
  const time = (quizStage === "quiz" ? 10 : 0.5) * 1000; // "quiz"일 때 10초, 그 외에는 0.5초

  // 효과: quizStage가 변경될 때마다 타이머 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      // quizStage가 "quiz"일 때는 10초 후에 "showCorrectAnswer"로 전환
      if (quizStage === "quiz") {
        setQuizStage("showCorrectAnswer");
      }
      // "showSelectedAnswer"일 때는 0.5초 후에 "showCorrectAnswer"로 전환
      else if (quizStage === "showSelectedAnswer") {
        setQuizStage("showCorrectAnswer");
      }
      // "showCorrectAnswer"일 때는 0.5초 후에 다음 문제로 넘어감
      else if (quizStage === "showCorrectAnswer") {
        handleNextQuestion();
      }
    }, time);

    // 컴포넌트가 unmount될 때 타이머를 클리어
    return () => {
      clearTimeout(timer);
    };
  }, [currentQuizIndex, quizStage, selectedAnswer]); // 현재 퀴즈 인덱스, 퀴즈 스테이지, 선택된 답 변경시 실행

  // 다음 문제로 넘어가는 함수
  function handleNextQuestion() {
    // 퀴즈가 끝났으면 결과 화면으로 이동
    if (currentQuizIndex >= quizs.length - 1) {
      onQuizEnd("summary"); // "summary"로 상태 변경 (결과 화면)
      return;
    }

    // 그렇지 않으면 퀴즈 인덱스를 증가시켜서 다음 문제로 진행
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    setQuizStage("quiz"); // 새로운 문제로 넘어가면 "quiz" 상태로 리셋
  }

  // 사용자가 'Skip' 버튼을 클릭했을 때 실행되는 함수
  function handleSkipClick() {
    setQuizStage("showCorrectAnswer"); // 즉시 정답 보여주기
    // 사용자 답안을 추가하고, 결과는 "skipped"로 처리
    addUserAnswer({
      id: quiz.id,
      question: quiz.text,
      selectedAnswer: "", // 답을 선택하지 않았음
      result: "skipped", // "skipped" 결과 처리
    });
  }

  // 사용자가 답안을 선택했을 때 실행되는 함수
  function handleAnswerSelect(answer) {
    setSelectedAnswer(answer); // 선택한 답을 상태에 저장
    setQuizStage("showSelectedAnswer"); // 선택한 답을 화면에 보여주는 상태로 변경
    // 사용자 답안을 추가하고, 정답/오답 결과를 처리
    addUserAnswer({
      id: quiz.id,
      question: quiz.text,
      selectedAnswer: answer,
      result: answer === quiz.correctAnswer ? "correct" : "wrong", // 선택한 답이 정답인지 확인
    });
  }

  return (
    <section id="quiz">
      {/* 문제를 표시하는 컴포넌트 */}
      <Question
        key={`${currentQuizIndex}-${quizStage}`} // 문제와 상태에 따라 고유한 key 제공
        question={quiz.text} // 문제 질문
        time={time} // 타이머 시간
        isAnswered={quizStage !== "quiz"} // 답을 선택했다면 true
      />
      {/* 답안을 선택하는 컴포넌트 */}
      <Answers
        answers={quiz.answers} // 선택 가능한 답
        selectedAnswer={selectedAnswer} // 선택된 답
        correctAnswer={quiz.correctAnswer} // 정답
        onAnswerSelect={handleAnswerSelect} // 답안 제출 함수
        quizStage={quizStage} // 현재 퀴즈 스테이지 (quiz, showSelectedAnswer, showCorrectAnswer)
      />
      {/* 퀴즈가 진행 중일 때만 Skip 버튼 표시 */}
      <div id="skip-action">
        {quizStage === "quiz" && (
          <button type="button" onClick={handleSkipClick}>
            Skip
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;
