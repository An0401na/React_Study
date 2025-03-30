import { useState } from "react";

function CreateProject({ onClickSaveProject }) {
  // 프로젝트 제목, 설명, 마감일을 상태로 관리
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDueDate, setProjectDueDate] = useState("");

  // 프로젝트 제목 변경 시 호출되는 함수
  function handleTitleChange(event) {
    setProjectTitle(event.target.value);
  }

  // 프로젝트 설명 변경 시 호출되는 함수
  function handleDescriptionChange(event) {
    setProjectDescription(event.target.value);
  }

  // 프로젝트 마감일 변경 시 호출되는 함수
  function handleDueDateChange(event) {
    setProjectDueDate(event.target.value);
  }

  // 'Save' 버튼 클릭 시 호출되는 함수
  function handleSaveClick() {
    onClickSaveProject(projectTitle, projectDescription, projectDueDate);
  }

  return (
    <div className="w-[35rem] mt-16">
      <form className="mt-4 text-right">
        <menu className="flex items-center justify-end gap-4 my-4">
          <button className="text-stone-800 hover:text-stone-950">
            Cancle
          </button>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSaveClick} // 'Save' 버튼 클릭 시 handleSaveClick 호출
            type="button" // form을 제출하지 않도록 type="button" 설정
          >
            Save
          </button>
        </menu>
      </form>

      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          TITLE
        </label>
        <input
          value={projectTitle} // 상태로 관리되는 프로젝트 제목
          onChange={handleTitleChange} // 입력 값 변경 시 상태 업데이트
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          DESCRIPTION
        </label>
        <textarea
          value={projectDescription} // 상태로 관리되는 프로젝트 설명
          onChange={handleDescriptionChange} // 입력 값 변경 시 상태 업데이트
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          DUE DATE
        </label>
        <input
          value={projectDueDate} // 상태로 관리되는 프로젝트 마감일
          onChange={handleDueDateChange} // 입력 값 변경 시 상태 업데이트
          type="date"
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>
    </div>
  );
}

export default CreateProject;
