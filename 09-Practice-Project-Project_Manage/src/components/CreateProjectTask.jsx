import React, { useState } from "react";

function CreateProjectTask({ handleAddTaskClick }) {
  const [task, setTask] = useState("");

  function handleChange(event) {
    setTask(event.target.value);
  }
  function handleClick() {
    handleAddTaskClick(task);
    setTask("");
  }
  return (
    <div className="flex items-center gap-4">
      {/* 입력 필드 */}
      <input
        type="text"
        onChange={handleChange}
        value={task}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      {/* 추가 버튼 */}
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick} // 클릭 시 작업 추가
      >
        Add Task
      </button>
    </div>
  );
}

export default CreateProjectTask;
