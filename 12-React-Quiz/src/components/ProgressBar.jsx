import React, { useEffect, useState } from "react";

function ProgressBar({ time, isAnswered }) {
  const [remainingTimer, setRemainingTimer] = useState(time);

  useEffect(() => {
    setRemainingTimer(time); // 새 타이머 값으로 매번 초기화
    const interval = setInterval(() => {
      console.log("Interval Timer tick ");
      setRemainingTimer((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("Interval cleared");
      clearInterval(interval);
    }; // Cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경될 때 실행되어 인터벌 타이머를 정리
  }, [time]);

  return (
    <progress
      className={isAnswered ? "answered" : ""}
      value={remainingTimer}
      max={time}
    />
  );
}

export default ProgressBar;
