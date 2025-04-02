import { useRef } from "react";
import ProjectTaskList from "./ProjectTaskList.jsx";
import CreateProjectTask from "./CreateProjectTask.jsx";

// ProjectTask 컴포넌트 - 프로젝트의 작업 리스트를 관리하는 컴포넌트
function ProjectTask({ tasks, onClickAddTask, onClickClear }) {
  // 작업 입력 필드를 위한 useRef로 상태 관리
  const taskInputRef = useRef("");

  // 'Add Task' 버튼 클릭 시 실행되는 함수
  function handleAddTaskClick() {
    // 입력된 작업이 비어 있지 않으면 작업 추가
    const taskValue = taskInputRef.current.value.trim(); // useRef에서 값 추출

    if (taskValue !== "") {
      onClickAddTask(taskValue); // 상위 컴포넌트에 작업 추가 요청
      taskInputRef.current.value = ""; // 입력 필드 초기화
    }
  }

  return (
    <>
      {/* 'Tasks' 제목 */}
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      {/* 작업 입력 필드와 추가 버튼 */}
      <CreateProjectTask
        taskInputRef={taskInputRef}
        handleAddTaskClick={handleAddTaskClick}
      ></CreateProjectTask>

      {/* 작업이 없을 경우 보여지는 메시지 */}
      {tasks.length === 0 ? (
        <p className="text-stone-800 my-4">
          This Project does not have any task yet.
        </p>
      ) : (
        // 작업이 있을 경우, 작업 리스트 출력
        <ProjectTaskList
          tasks={tasks}
          onClickClear={onClickClear}
        ></ProjectTaskList>
      )}
    </>
  );
}

export default ProjectTask;
