import { useEffect, useState } from "react";

const TIMER = 5000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTimer, setRemainingTimer] = useState(TIMER);

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

  useEffect(() => {
    console.log("Timer started");
    const timer = setTimeout(() => {
      onConfirm();
    }, 5000);

    // Cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경될 때 실행되어 타이머를 정리
    return () => {
      console.log("Timer cleared");
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTimer} max={TIMER} />
    </div>
  );
}
