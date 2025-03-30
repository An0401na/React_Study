import { useState } from "react";

function ProjectTask({ tasks, onClickAddTask, onClickClear }) {
  const [taskInput, setTaskInput] = useState("");

  function handleInputChange(e) {
    setTaskInput(e.target.value);
  }

  function handleAddTaskClick() {
    if (taskInput.trim() !== "") {
      onClickAddTask(taskInput);
      setTaskInput(""); // 입력 필드 초기화
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input
          value={taskInput}
          onChange={handleInputChange}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleAddTaskClick}
        >
          Add Task
        </button>
      </div>
      {tasks.length == 0 ? (
        <p className="text-stone-800 my-4">
          This Project does not have any task yet.
        </p>
      ) : (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks
            .slice()
            .reverse()
            .map((task, index) => {
              console.log(index + ", " + task);
              return (
                <li key={index} className="flex justify-between my-4">
                  {task}
                  <button
                    className="text-stone-700 hover:text-red-500"
                    onClick={() => onClickClear(index)}
                  >
                    Clear
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}

export default ProjectTask;
