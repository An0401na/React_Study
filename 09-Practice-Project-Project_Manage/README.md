# 📋 Project Manage

> [**React 기반 프로젝트 관리 애플리케이션 🚀**](https://an0401na.github.io/React_Study/09-Practice-Project-Project_Manage/)
>

## 💡 **프로젝트 개요**

> 이 프로젝트는 Udemy의 [【한글자막】 React 완벽 가이드 2025 with React Router & Redux](https://www.udemy.com/course/best-react/) 강의 일부의 연습 프로젝트 입니다.
>

### 📌 프로젝트 소개

이 프로젝트는 사용자가 여러 프로젝트를 생성하고, 각 프로젝트에 대한 작업(Task)을 추가하고 관리할 수 있는 **프로젝트 관리 애플리케이션**입니다. 각 프로젝트에는 제목, 설명, 마감일을 설정할 수 있고, 작업(Task)을 추가하여 관리할 수 있습니다. 또한, 사이드바를 통해 프로젝트를 선택하고 선택한 프로젝트의 **세부 정보 확인**, **작업 입력 및 관리**, **중복 방지**, **모달 경고** 등의 기능이 포함되어 있습니다.
프로젝트가 선택되지 않았을 때는 적절한 메시지가 화면에 표시됩니다.

- **React**: 컴포넌트 기반 UI 개발
- **useState**: 상태 관리
- **useRef**: 비동기적인 상태 변화 없이 DOM을 직접 참조

---

### 📦 기능 요약

| 기능 | 설명 |
| --- | --- |
| ✅ 프로젝트 생성 | 제목, 설명, 마감일 입력 필드가 있음 |
| ❌ 중복 방지 | 동일한 프로젝트 제목을 가진 항목은 생성 불가 |
| ⚠️ 유효성 검사 | 입력 필드가 비어 있으면 경고 모달 표시 |
| 📝 작업(Task) 추가 | 각 프로젝트에 작업을 개별적으로 추가 가능 |
| 🗑️ 작업(Task) 삭제 | 각 작업 삭제 가능 |
| 🧹 프로젝트 삭제 | 현재 보고 있는 프로젝트를 삭제 |
| 🚫 선택 안 됨 | 프로젝트가 선택되지 않았을 때 별도 안내 UI 표시 |

---

## 🏗️ 구현 과정 및 내부 로직

### 👉 [**github repo**](https://github.com/An0401na/React_Study/tree/main/09-Practice-Project-Project_Manage)

### 1️⃣ **전체적인 흐름**

1. 사용자가 `+ Add Project` 버튼을 클릭하면 `CreateProject` 컴포넌트가 렌더링되어 **제목, 설명, 마감일**을 입력받습니다.
2. 프로젝트가 생성되면 사이드바(`SideBar`)에 추가되고, 클릭 시 해당 프로젝트가 선택됩니다.
3. 선택된 프로젝트의 세부 정보는 `ProjectDetail`에서 확인할 수 있으며, 작업(Task)을 추가/삭제할 수 있습니다.
4. 새로운 작업은 `ProjectTask` 컴포넌트를 통해 입력받아 `addTaskFromProject` 함수로 프로젝트에 추가됩니다.
5. 각 작업 옆의 `Clear` 버튼을 누르면 `handleClearTaskToProject` 함수가 호출되어 해당 작업을 삭제합니다.
6. 아무 프로젝트도 선택되지 않은 상태에서는 `NoProjectSelected` 컴포넌트가 표시됩니다.
7. 모든 로직은 `useProjects` 커스텀 훅을 통해 상태와 함께 관리됩니다.

---

### 2️⃣ **폴더 구조**

```
src/
│
├── assets/                  # 이미지 등 정적 자산
│   └── no-projects.png
│
├── components/              # UI 컴포넌트 모음
│   ├── CreateProject.jsx         # 프로젝트 생성 폼
│   ├── CreateProjectTask.jsx     # 작업(Task) 입력 UI
│   ├── Input.jsx                 # 공통 입력 필드 컴포넌트
│   ├── Modal.jsx                 # 모달 컴포넌트
│   ├── NoProjectSelected.jsx     # 프로젝트 선택되지 않았을 때 UI
│   ├── ProjectDetail.jsx         # 프로젝트 상세 정보 및 Task 관리
│   ├── ProjectTask.jsx           # 작업(Task) 섹션 컨테이너
│   ├── ProjectTaskList.jsx       # 작업(Task) 리스트
│   └── SideBar.jsx               # 프로젝트 목록 및 선택
│
├── hooks/
│   └── useProjects.js        # 상태 및 로직 관리 커스텀 훅
│
├── App.jsx                   # 전체 앱 UI 구성
├── index.jsx                 
└── index.css                 

```

---

### **3️⃣ 주요 컴포넌트 및 기능**

### 🏠 **1. App.jsx (메인 컴포넌트)**

- 모든 상태와 로직은 `useProjects` 커스텀 훅에서 관리
- 현재 상태에 따라 렌더링할 컴포넌트를 결정하는 `currentView` 변수를 사용해 동적으로 UI를 전환 :
    - 프로젝트 생성 중: `CreateProject`
    - 프로젝트 선택됨: `ProjectDetail`
    - 아무 프로젝트도 선택되지 않음: `NoProjectSelected`

```jsx
let currentView;

if (isCreatingProject) {
  currentView = (
    <CreateProject
      onClickSaveProject={saveProject}
      onClickCancleProject={cancleProject}
    />
  );
} else if (selectedProject) {
  currentView = (
    <ProjectDetail
      project={selectedProject}
      onClickDeleteProject={deleteProject}
      onClickAddTask={addTaskFromProject}
      onClickClearTask={handleClearTaskToProject}
    />
  );
} else {
  currentView = (
    <NoProjectSelected onClickCreatingProject={startCreatingProject} />
  );
}
```

- 최종적으로 `SideBar` 컴포넌트와 함께 상태에 맞는 메인 뷰를 렌더링

```jsx

return (
  <main className="h-screen my-8 flex gap-8">
    <SideBarprojects={projects}
      selectedProject={selectedProject}
      onClickSelectedProject={selectProject}
      onClickCreatingProject={startCreatingProject}
    />
    {currentView}
  </main>
);

```

---

### **🗂️ 2. SideBar.jsx (사이드바 컴포넌트)**

- 현재 등록된 **프로젝트 목록을 표시**하고 선택 가능
- 선택된 프로젝트는 강조 표시됨
- `+ Add Project` 버튼으로 프로젝트 생성 뷰 진입 가능

```jsx
<button onClick={onClickCreatingProject}>+ Add Project</button>
{projects.map(project => (
  <button
    key={project.id}
    className={project.id === selectedProject?.id ? 'active' : ''}
    onClick={() => onClickSelectedProject(project.id)}
  >
    {project.title}
  </button>
))}

```

---

### **🎛️ 3. CreateProject.jsx (프로젝트 생성 컴포넌트)**

- 사용자로부터 **프로젝트 제목, 설명, 마감일**을 입력받아, `App.jsx`로 전달하는 역할을
- `useRef`를 통해 입력 필드의 값을 관리하여 **불필요한 리렌더링 없이** 데이터를 추출
- 유효성 검사와 중복 검사 기능이 내장되어 있으며, 오류 발생 시 **`Modal` 컴포넌트**를 통해 사용자에게 피드백을 제공
- 입력이 유효한 경우 부모로부터 전달받은 `onClickSaveProject(title, description, dueDate)` 함수를 호출해 프로젝트를 저장
- UI 구성은 `Input` 컴포넌트를 재사용하여 일관성 있는 입력 필드를 구현, 버튼 클릭 시 취소 또는 저장 이벤트 트리거

```jsx
// 입력값 추적용 useRef
const projectTitleRef = useRef("");
const projectDescriptionRef = useRef("");
const projectDueDateRef = useRef("");

// 저장 버튼 클릭 시 입력값 유효성 검사 및 저장 시도
function handleSaveClick() {
  const title = projectTitleRef.current.value;
  const description = projectDescriptionRef.current.value;
  const dueDate = projectDueDateRef.current.value;

  if (title.trim() === "" || description.trim() === "" || dueDate.trim() === "") {
    invalidCaseModal.current.open(); // 빈 입력값이 있을 경우 경고 모달
    return;
  }

  const isSaved = onClickSaveProject(title, description, dueDate);
  if (!isSaved) {
    duplicatedCaseModal.current.open(); // 중복된 타이틀인 경우 경고 모달
    return;
  }
}

```

---

### 💬 4**. Modal.jsx (모달 컴포넌트)**

- **사용자 피드백**을 위한 모달 창을 생성하는 컴포넌트
- `React Portal`을 사용하여 모달을 **루트 DOM 외부에 렌더링**하고, **`useImperativeHandle` + `useRef`** 조합으로 외부 컴포넌트에서 **모달을 제어**
- 부모 컴포넌트에서는 `ref.current.open()`로 모달 호출

```jsx
useImperativeHandle(ref, () => {
  return {
    open() {
      dialog.current.showModal(); // HTML <dialog> API를 통해 모달 열기
    },
  };
});
```

- `createPortal`을 통해 `#modal-root` 요소에 모달을 렌더링하여, 구조적으로 앱의 나머지 UI와 분리되면서도 전역적으로 표시
- `buttonCaption`으로 버튼 라벨을 커스터마이징 가능

```jsx
<dialog ref={dialog}>
  {children} // 모달 내부 컨텐츠
  <form method="dialog">
    <button>{buttonCaption}</button> 
  </form>
</dialog>
```

---

### 🧾 5**. ProjectDetail.jsx (프로젝트 상세 보기)**

- **선택된 프로젝트의 제목, 설명, 마감일, 작업 목록을 보여주는 컴포넌트**입
- 작업은 하위 컴포넌트인 `ProjectTask`를 통해 추가 및 삭제
- 마감일은 `MM/DD/YYYY` 형식으로 포맷팅
- `ProjectTask`에 작업 배열과 함께 작업 추가/삭제 핸들러를 전달

```jsx
// 작업 추가 핸들러
function handleAddTaskClick(newTask) {
  if (newTask.trim() !== "") {
    onClickAddTask(project, newTask); // 부모로 프로젝트와 작업 텍스트 전달
  }
}

// 작업 삭제 핸들러
function handleClearTaskClick(index) {
  onClickClearTask(project, index); // 삭제할 작업의 인덱스를 기준으로 처리
}
```

---

### **📋 6. ProjectTask.jsx (프로젝트 작업 컴포넌트)**

- 선택된 프로젝트의 **작업(Task)** 목록을 관리하는 중간 컴포넌트
- 하위에 `CreateProjectTask`(입력창 + 추가 버튼)와 `ProjectTaskList`(작업 목록 출력)를 포함
- 입력된 작업은 유효성 검사를 거쳐 상위 컴포넌트로 전달
- 작업이 없을 경우 사용자에게 안내 메시지를 출력.

```jsx
<h2>Tasks</h2> // 섹션 제목

<CreateProjectTask handleAddTaskClick={handleAddTaskClick} />

{tasks.length === 0 ? (
  <p>This Project does not have any task yet.</p>
) : (
  <ProjectTaskList tasks={tasks} onClickClear={onClickClear} />
)}

```

---

### ⚠️ 7**. NoProjectSelected.jsx (프로젝트 선택되지 않음 컴포넌트)**

- 사용자가 프로젝트를 선택하지 않았을 경우에 보여주는 메시지를 처리하는 컴포넌트
- 프로젝트 선택이 없을 때, 해당 컴포넌트가 화면에 표시됩니다.

```jsx
function NoProjectSelected({ onClickCreatingProject }) {
  return (
    <div>
      <h2>No project selected</h2>
      <p>Please select a project or create a new one.</p>
      <button onClick={onClickCreatingProject}>Create New Project</button>
    </div>
  );
}
```

---

---

## 🎯 **결과 예시**

![image](https://github.com/user-attachments/assets/29b8b40d-8cd7-4b28-b20e-9e72ad351cf7)
![image](https://github.com/user-attachments/assets/e195a993-b498-4b38-866e-17ff0d10bd84)
![image](https://github.com/user-attachments/assets/6f3b415c-a09c-4194-939d-e13356f5c8f7)
![image](https://github.com/user-attachments/assets/5b6237f3-01c0-46c2-bf53-f30bc925907e)
![image](https://github.com/user-attachments/assets/adf757bf-ea08-4f03-9dce-2037864d4dc0)
![image](https://github.com/user-attachments/assets/2b178ee3-0163-45e1-a0b8-03fadebea34d)

---
## **🛠️ 트러블슈팅**

### ❌ 1. 프로젝트 저장 버튼 클릭 시 프로젝트가 추가되지 않는 문제

**🚨 문제 원인: 잘못된 이벤트 처리 방식**

```jsx
<button
  className="..."
  onClick={() =>
    onClickSaveProject(
      projectTitle.current.value,
      projectDescription.current.value,
      projectDueDate.current.value,
    )
  }
>
  Save
</button>
```

**💡 문제 설명:**

- `onClick` 이벤트 핸들러 내부에서 바로 `onClickSaveProject()`를 실행하고 있음.
- 이 버튼이 `<form>` 내부에 있기 때문에, 버튼 클릭 시 **기본적으로 form 제출 이벤트(submit)**가 발생함.
- 그러나 `onClick` 내부에서 이를 `preventDefault()` 하지 않고 즉시 실행하면서, 페이지가 새로고침되거나 의도한 대로 동작하지 않음.
- 이로 인해 프로젝트 저장 함수가 **정상적으로 실행되지 않거나**, 실행되어도 곧바로 리렌더링되어 효과가 사라지는 것처럼 보였음.

**💡 해결 방법: 폼의 기본 제출 동작 방지**

✅ 방법 1 – `e.preventDefault()` 사용

```jsx
function handleSaveClick(e) {
  e.preventDefault(); // ✅ form 기본 동작 막기
  onClickSaveProject(...);
}

<button onClick={handleSaveClick}>Save</button>

```

✅ 방법 2 – 버튼의 `type`을 `"button"`으로 명시

```jsx
<button type="button" onClick={handleSaveClick}>Save</button>
```

- 두 방법 모두 페이지 새로고침을 방지하여 상태 유지 및 정상적인 프로젝트 추가 가능
- `type="button"`을 사용하면 더 간단하고 실수를 줄일 수 있음

---
### ⚠️ 현재 구조의 문제점: Prop Drilling

현재 프로젝트는 상위 컴포넌트(`App.jsx`)에서 관리하는 상태와 함수를 여러 하위 컴포넌트에 **props로 계속 전달하는 구조(prop drilling)**를 가지고 있다.

예를 들어, 프로젝트 추가 함수(`onAddProject`)가 `App → SideBar → CreateProject`로 전달되는 식이여서 아래와 같은 문제가 발생된다.

- 중간 컴포넌트가 **필요 없는 props를 전달만** 하는 역할을 하게 됨
- 컴포넌트 간 **결합도가 높아지고**, **가독성 저하**
- 규모가 커질수록 **상태 관리가 복잡해짐**

이 문제를 해결하기 위해 다음시간에 Context 학습해보도록 하겠다!

---
## 🔥 **배운 점 & 느낀 점**

- `ref`와 `status`를 적절히 활용해 **상태 관리와 DOM 제어**에 익숙해졌다.
- `ReactDOM.createPortal`을 사용해 **모달을 루트 밖에 안전하게 렌더링**하는 법을 배웠다.
- `<button type="button">`을 명시하지 않으면 **예상치 못한 폼 제출 이슈**가 생길 수 있다는 걸 알게 되었다.
- **Tailwind CSS** 사용법을 익힐 수 있었다.
- **커스텀 훅**으로 상태 로직을 분리하면서 관심사 분리(SOC)의 중요성을 체감했다.
- **prop drilling**을 겪으며 전역 상태 관리나 Context API의 필요성을 느꼈다.