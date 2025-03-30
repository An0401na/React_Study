import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function startCreatingProject(newSelectedProject) {
    setIsCreatingProject(false);
    setSelectedProject(newSelectedProject);
  }

  function handleCreatingProjectClick() {
    setIsCreatingProject(true);
    setSelectedProject(null);
  }

  function saveProject(projectTitle, projectDescription, projectDueDate) {
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
    const updatedProject = {
      ...currentProject,
      tasks: [...currentProject.tasks, newTask],
    };

    setSelectedProject(updatedProject); // 선택된 프로젝트 업데이트
    updateProjectInList(updatedProject); // 프로젝트 목록 업데이트
  }

  function handleClearTaskToProject(currentProject, index) {
    const updatedTasks = currentProject.tasks.filter(
      (_, i) => i !== currentProject.tasks.length - 1 - index,
    );
    const updatedProject = { ...currentProject, tasks: updatedTasks };

    setSelectedProject(updatedProject); // 선택된 프로젝트 업데이트
    updateProjectInList(updatedProject); // 프로젝트 목록 업데이트
  }

  let showComponent;
  if (isCreatingProject) {
    showComponent = <CreateProject onClickSaveProject={saveProject} />;
  } else if (selectedProject) {
    showComponent = (
      <ProjectDetail
        project={selectedProject}
        onClickDeleteProject={handleDeleteProjectClick}
        onClickAddTask={handleAddTaskToProject}
        onClickClearTask={handleClearTaskToProject}
      />
    );
  } else {
    showComponent = (
      <NoProjectSelected onClickCreatingProject={handleCreatingProjectClick} />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={projects}
        onClickSelectedProject={startCreatingProject}
        onClickCreatingProject={handleCreatingProjectClick}
      />
      {showComponent}
    </main>
  );
}

export default App;
