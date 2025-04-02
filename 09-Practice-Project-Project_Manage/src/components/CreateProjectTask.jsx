import React from "react";

function CreateProjectTask({ taskInputRef, handleAddTaskClick }) {
  return (
    <div className="flex items-center gap-4">
      {/* 입력 필드 */}
      <input
        ref={taskInputRef} // useRef로 입력 필드 값 추적
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      {/* 추가 버튼 */}
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleAddTaskClick} // 클릭 시 작업 추가
      >
        Add Task
      </button>
    </div>
  );
}

export default CreateProjectTask;
