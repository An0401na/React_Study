import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

function CreateProject({ onClickSaveProject, onClickCancleProject }) {
  // useRef로 각각의 입력 필드 값을 추적
  // useRef는 컴포넌트 리렌더링을 일으키지 않고 DOM 요소를 직접 참조할 수 있게 해준다.
  const projectTitleRef = useRef(""); // 프로젝트 제목을 추적하기 위한 ref
  const projectDescriptionRef = useRef(""); // 프로젝트 설명을 추적하기 위한 ref
  const projectDueDateRef = useRef(""); // 프로젝트 마감일을 추적하기 위한 ref
  const modal = useRef();

  // 'Save' 버튼 클릭 시 호출되는 함수
  function handleSaveClick() {
    // useRef에서 값을 추출하여 변수에 저장
    const title = projectTitleRef.current.value; // 프로젝트 제목 입력 값
    const description = projectDescriptionRef.current.value; // 프로젝트 설명 입력 값
    const dueDate = projectDueDateRef.current.value; // 프로젝트 마감일 입력 값

    // validation 세 입력값이 존재하는지 확인
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    // 부모 컴포넌트로 추출한 값을 전달
    // onClickSaveProject는 부모 컴포넌트에서 전달된 함수로, 해당 값을 처리한다.
    onClickSaveProject(title, description, dueDate);
  }

  function handleCancleClick() {
    onClickCancleProject();
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">잘못된 입력</h2>
        <p className="text-stone-600 mb-9">
          모든 입력 필드에 유효한 값을 입력해주세요.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        {/* 폼의 UI */}
        <form className="mt-4 text-right">
          <menu className="flex items-center justify-end gap-4 my-4">
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={handleCancleClick}
              type="button"
            >
              Cancel
            </button>
            {/* 'Save' 버튼: 사용자가 입력한 값들을 저장하는 버튼 */}
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSaveClick} // 버튼 클릭 시 handleSaveClick 호출
              type="button" // form을 제출하지 않도록 type="button" 설정
            >
              Save
            </button>
          </menu>
        </form>

        {/* 프로젝트 제목 입력 필드 */}
        <Input
          ref={projectTitleRef} // useRef로 제목 입력 필드 값 추적
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        >
          TITLE
        </Input>

        {/* 프로젝트 설명 입력 필드 */}
        <Input
          textarea
          ref={projectDescriptionRef} // useRef로 설명 입력 필드 값 추적
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        >
          DESCRIPTION
        </Input>
        {/* 프로젝트 마감일 입력 필드 */}
        <Input
          ref={projectDueDateRef} // useRef로 마감일 입력 필드 값 추적
          type="date" // 날짜 입력 필드
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        >
          DUE DATE
        </Input>
      </div>
    </>
  );
}

export default CreateProject;
