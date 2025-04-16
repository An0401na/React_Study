import React, { useContext, useEffect, useState } from "react";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import { UserAnswerContext } from "../store/user-answer-context.jsx"; // 사용자 답안을 저장할 수 있는 컨텍스트
import { STAGES } from "../constants/stages.js"; // 퀴즈 상태를 정의한 상수

// 퀴즈 전체 흐름을 관리하는 Quiz 컴포넌트
function Quiz({ quizzes, onQuizEnd }) {
  // 상태 관리
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // 현재 퀴즈 문제의 인덱스 (0번부터 시작)
  const [quizStage, setQuizStage] = useState(STAGES.QUIZ); // 현재 화면이 어떤 상태인지 관리 QUIZ(quiz), SELECTED(showSelectedAnswer), CORRECT(showCorrectAnswer)
  const [selectedAnswer, setSelectedAnswer] = useState(""); // 사용자가 선택한 답 (정답 여부 확인용)

  const { addUserAnswer } = useContext(UserAnswerContext); // 사용자 답안을 저장하는 컨텍스트에서 함수 불러오기
  const quiz = quizzes[currentQuizIndex]; // 현재 보여줄 퀴즈 문제 정보

  // 사용자 답안 선택
  function handleAnswerSelect(answer) {
    setSelectedAnswer(answer); // 선택한 답 저장
    setQuizStage(STAGES.SELECTED); // 선택한 답을 잠깐 보여주는 상태로 전환

    // 사용자 답안 저장 (정답 여부 포함)
    addUserAnswer({
      id: quiz.id,
      question: quiz.text,
      selectedAnswer: answer,
      result: answer === quiz.correctAnswer ? "correct" : "wrong",
    });
  }

  // 문제 건너뛰기
  function handleSkipClick() {
    // 바로 정답 보기 상태로 전환
    setQuizStage(STAGES.CORRECT);

    // 사용자 답안 저장 (선택하지 않았으므로 skipped 처리)
    addUserAnswer({
      id: quiz.id,
      question: quiz.text,
      selectedAnswer: "",
      result: "skipped",
    });
  }

  // 다음 문제로 이동
  function handleNextQuestion() {
    // 마지막 문제였다면 퀴즈 종료 처리
    if (currentQuizIndex >= quizzes.length - 1) {
      onQuizEnd("summary"); // 퀴즈 요약 화면으로 전환
      return;
    }

    // 상태 초기화 후 다음 문제로 진행
    setSelectedAnswer(""); // 이전 선택 제거
    setCurrentQuizIndex((prevIndex) => prevIndex + 1); // 다음 문제 인덱스로 이동
    setQuizStage(STAGES.QUIZ); // 상태 초기화 (새 문제 시작)
  }

  // 타이머 종료시 상태 전한 처리
  function handleTimeOut() {
    if (quizStage === STAGES.QUIZ) {
      // 퀴즈 단계에서 타임아웃이 됐다면 스킵 처리
      handleSkipClick();
    } else if (quizStage === STAGES.SELECTED) {
      // 선택지 확인 단계에서 타임아웃이 됐다면 정답 보기 상태로 전환
      setQuizStage(STAGES.CORRECT);
    } else {
      // 이미 정답을 보고 있다면 다음 문제로 넘어감
      handleNextQuestion();
    }
  }

  return (
    <section id="quiz">
      {/* 질문 표시 컴포넌트 */}
      <Question
        key={`${currentQuizIndex}-${quizStage}`} // 상태 변경 시 리렌더링을 위한 고유 key
        question={quiz.text} // 문제 질문
        quizStage={quizStage} // 현재 퀴즈 상태
        onTimeOut={handleTimeOut} // 타이머 만료 시 호출되는 핸들러
      />

      {/* 답안 선택 컴포넌트 */}
      <Answers
        answers={quiz.answers} // 선택지 목록
        selectedAnswer={selectedAnswer} // 현재 선택한 답
        correctAnswer={quiz.correctAnswer} // 정답 (정답 표시용)
        onAnswerSelect={handleAnswerSelect} // 답안 선택 핸들러
        quizStage={quizStage} // 현재 퀴즈 상태
      />

      {/* 문제 푸는 중에만 Skip 버튼 표시 */}
      <div id="skip-action">
        {quizStage === STAGES.QUIZ && (
          <button type="button" onClick={handleSkipClick}>
            Skip
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;
