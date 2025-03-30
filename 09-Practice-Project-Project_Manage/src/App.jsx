import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function handleSelectedProjectClick(newSelectedProject) {
    setIsCreatingProject(false);
    setSelectedProject(newSelectedProject);
  }

  function handleCreatingProjectClick() {
    setIsCreatingProject(true);
    setSelectedProject();
  }

  function handleSaveProjectClick(
    projectTitle,
    projectDescription,
    projectDueDate,
  ) {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        title: projectTitle,
        description: projectDescription,
        dueDate: projectDueDate,
        tasks: [],
      },
    ]);

    setIsCreatingProject(false); // 프로젝트 저장 후 다시 생성 모드 종료
  }

  function handleDeleteProjectClick(projectToDelete) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project !== projectToDelete),
    );
    setSelectedProject(); // Todo: onReset 으로 빼기
  }

  // 프로젝트 목록에서 특정 프로젝트를 업데이트하는 함수
  function updateProjectInList(updatedProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.title === updatedProject.title ? updatedProject : project,
      ),
    );
  }

  function handleAddTaskToProject(currentProject, newTask) {
    console.log(`프로젝트 "${currentProject.title}"에 작업 추가: `, newTask);
    const updatedProject = {
      ...currentProject,
      tasks: [...currentProject.tasks, newTask],
    };
    console.log("업데이트된 프로젝트 (작업 추가): ", updatedProject);

    setSelectedProject(updatedProject); // 선택된 프로젝트 업데이트
    updateProjectInList(updatedProject); // 프로젝트 목록 업데이트
  }

  function handleClearTaskToProject(currentProject, index) {
    console.log(
      `프로젝트 "${currentProject.title}"에서 작업 삭제 (인덱스: ${index})`,
    );
    const updatedTasks = currentProject.tasks.filter(
      (_, i) => i !== currentProject.tasks.length - 1 - index,
    );
    const updatedProject = { ...currentProject, tasks: updatedTasks };
    console.log("업데이트된 프로젝트 (작업 삭제): ", updatedProject);

    setSelectedProject(updatedProject); // 선택된 프로젝트 업데이트
    updateProjectInList(updatedProject); // 프로젝트 목록 업데이트
  }

  let showComponent = (
    <NoProjectSelected onClickCreatingProject={handleCreatingProjectClick} />
  );
  if (selectedProject) {
    showComponent = (
      <ProjectDetail
        project={selectedProject}
        onClickDeleteProject={handleDeleteProjectClick}
        onClickAddTask={handleAddTaskToProject}
        onClickClearTask={handleClearTaskToProject}
      />
    );
  }
  if (isCreatingProject) {
    showComponent = (
      <CreateProject onClickSaveProject={handleSaveProjectClick} />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={projects}
        onClickSelectedProject={handleSelectedProjectClick}
        onClickCreatingProject={handleCreatingProjectClick}
      />
      {showComponent}
    </main>
  );
}

export default App;
