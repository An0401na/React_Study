# 📋 Project Manage
> [**👉React 기반 프로젝트 관리 애플리케이션 🚀**](https://an0401na.github.io/React_Study/09-Practice-Project-Project_Manage/)

## 📌 프로젝트 소개
이 프로젝트는 사용자가 여러 프로젝트를 생성하고, 각 프로젝트에 대한 작업(Task)을 추가하고 관리할 수 있는 **프로젝트 관리 애플리케이션**입니다. 각 프로젝트에는 제목, 설명, 마감일을 설정할 수 있고, 작업(Task)을 추가하여 관리할 수 있습니다. 또한, 사이드바를 통해 다양한 프로젝트를 탐색하고 선택할 수 있습니다. 프로젝트가 선택되지 않았을 때는 적절한 메시지가 화면에 표시됩니다.

> 이 프로젝트는 Udemy의 【한글자막】 React 완벽 가이드 2025 with React Router & Redux 강의 일부의 연습 프로젝트 입니다.

- **React**: 컴포넌트 기반 UI 개발
- **useState**: 상태 관리
- **useRef**: 비동기적인 상태 변화 없이 DOM을 직접 참조
---

## 🏗️ 구현 과정 및 내부 로직

### 1️⃣ **전체적인 흐름**

1. 사용자가 프로젝트를 생성하면 `CreateProject` 컴포넌트에서 프로젝트의 제목, 설명, 마감일을 입력받아 상태로 관리합니다.
2. 사용자가 프로젝트를 선택하면 해당 프로젝트의 세부 사항을 `ProjectDetail` 컴포넌트에서 보여줍니다.
3. 사이드바 `SideBar`에서 프로젝트 목록을 표시하고, 선택된 프로젝트를 보여주는 방식으로 페이지를 관리합니다.
4. 프로젝트에 작업을 추가하려면 `ProjectTask` 컴포넌트에서 작업을 입력받고, 이를 해당 프로젝트에 추가합니다.
5. `useRef`를 사용하여 입력된 작업의 값을 추적하며, 상태 변화 없이 UI의 리렌더링을 최소화합니다.
6. 프로젝트가 선택되지 않았을 경우 `NoProjectSelected` 컴포넌트에서 알림 메시지를 보여줍니다.

---

### 2️⃣ **폴더 구조**

```

src/
│── assets/              
│── components/           
│   │── CreateProject.jsx   # 프로젝트 생성 컴포넌트
│   │── NoProjectSelected.jsx # 프로젝트가 선택되지 않았을 때의 컴포넌트
│   │── ProjectDetail.jsx   # 프로젝트 세부 정보 컴포넌트
│   │── ProjectTask.jsx     # 프로젝트 작업 관리 컴포넌트
│   │── SideBar.jsx         # 사이드바 컴포넌트
│── hooks/                  # (커스텀 훅 모음)
│   │── useProjects.js      # 프로젝트 상태 관리 훅
│── App.jsx                
│── index.css       
│── index.jsx      

```

---

### 3️⃣ **주요 컴포넌트 및 기능**

### 🏠 **1. App.jsx (메인 컴포넌트)**

- `useState`를 사용해 프로젝트 목록을 관리하고, 프로젝트 선택 시 해당 프로젝트의 세부 정보를 `ProjectDetail` 컴포넌트로 전달
- `CreateProject`에서 새 프로젝트를 생성하고 `useProjects` 훅을 사용해 프로젝트를 상태에 반영
- 프로젝트 선택 시, `SideBar`에서 프로젝트를 탐색하고 `NoProjectSelected` 컴포넌트를 통해 선택되지 않았을 경우 표시

```jsx

const [projects, setProjects] = useState([]);
const [selectedProject, setSelectedProject] = useState(null);

function handleSaveProject(title, description, dueDate) {
  const newProject = { title, description, dueDate, tasks: [] };
  setProjects((prevProjects) => [...prevProjects, newProject]);
}

function handleSelectProject(project) {
  setSelectedProject(project);
}

```

---

### 🎛️ **2. CreateProject.jsx (프로젝트 생성 컴포넌트)**

- 사용자가 입력한 **프로젝트 제목, 설명, 마감일**을 받아서 부모 컴포넌트로 전달하여 새로운 프로젝트를 추가하는 역할
- `useRef`를 사용하여 UI의 리렌더링 없이 입력 필드 값을 추적

```jsx

const projectTitleRef = useRef("");
const projectDescriptionRef = useRef("");
const projectDueDateRef = useRef("");

function handleSaveClick() {
  const title = projectTitleRef.current.value;
  const description = projectDescriptionRef.current.value;
  const dueDate = projectDueDateRef.current.value;
  onClickSaveProject(title, description, dueDate);
}

```

---

### 📋 **3. ProjectTask.jsx (프로젝트 작업 컴포넌트)**

- 사용자가 입력한 작업을 관리하는 컴포넌트
- 작업을 추가하거나 삭제할 수 있음
- `useRef`를 사용하여 입력 필드의 상태를 추적하고 UI 리렌더링 없이 값을 업데이트

```jsx

const taskInputRef = useRef("");

function handleAddTaskClick() {
  const task = taskInputRef.current.value;
  if (task.trim() !== "") {
    onClickAddTask(task);
    taskInputRef.current.value = ""; // 입력 필드 초기화
  }
}

```

---

### 🗂️ **4. SideBar.jsx (사이드바 컴포넌트)**

- 사이드바에서는 프로젝트 목록을 보여주고, 사용자가 프로젝트를 선택할 수 있도록 합니다.
- 선택된 프로젝트는 `App` 컴포넌트의 상태로 관리되어, 선택된 프로젝트의 세부 정보가 표시됩니다.

```jsx
<aside>
  {/* "프로젝트 추가" 버튼 */}
  <button
    onClick={onClickCreatingProject} // 버튼 클릭 시 onClickCreatingProject 함수 실행
  >
    + Add Project
  </button>

  {/* 프로젝트 목록 */}
  <ul className="mt-8">
    {projects.map((project) => {
      return (
        // 각 프로젝트 버튼
        <button
          key={project.title} // 각 프로젝트의 제목을 key로 사용하여 고유하게 구분
          onClick={() => onClickSelectedProject(project)} // 프로젝트 선택 시 onClickSelectedProject 함수 실행
        >
          {project.title} {/* 프로젝트 제목 출력 */}
        </button>
      );
    })}
  </ul>
</aside>;

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

## 🔥 **배운 점**
✅ **`useState`**를 활용한 상태 관리 및 **`useRef`**로 DOM 요소를 직접 다루는 방법\
✅ 컴포넌트 간 데이터 전달을 위한 **`props`** 활용\
✅ **사이드바**를 통한 프로젝트 탐색 및 **조건부 렌더링**을 통해 프로젝트 선택 여부 확인\
✅ **배열 조작** (작업 추가, 삭제) 및 **UI 업데이트 최적화**\

