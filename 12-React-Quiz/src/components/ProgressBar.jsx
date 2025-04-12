import React, { useEffect, useState } from "react";

function ProgressBar({ timer, isAnswered }) {
  const [remainingTimer, setRemainingTimer] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval Timer tick ");
      setRemainingTimer((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      console.log("Interval cleared");
      clearInterval(interval);
    }; // Cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경될 때 실행되어 인터벌 타이머를 정리
  }, []);
  return (
    <progress
      className={isAnswered ? "answered" : ""}
      value={remainingTimer}
      max={timer}
    />
  );
}

export default ProgressBar;
