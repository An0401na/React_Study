import React from "react";

function ProjectTaskList({ tasks, onClickClear }) {
  return (
    <ul className="p-4 mt-8 rounded-md bg-stone-100">
      {tasks
        .slice() // 배열을 복사하여 직접 수정하지 않도록 처리
        .reverse() // 최신 작업이 맨 위에 오도록 역순 정렬
        .map((task, index) => {
          return (
            <li key={index} className="flex justify-between my-4">
              {/* 작업 이름 출력 */}
              {task}
              {/* 작업 삭제 버튼 */}
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onClickClear(index)} // 작업 삭제 요청
              >
                Clear
              </button>
            </li>
          );
        })}
    </ul>
  );
}

export default ProjectTaskList;
