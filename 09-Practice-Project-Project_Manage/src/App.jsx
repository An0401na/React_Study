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

  function handleAddTaskToProject(currentProject, newTask) {
    setSelectedProject((prevState) => {
      const updatedProject = {
        ...prevState,
        tasks: [...currentProject.tasks, newTask],
      };

      // projects 배열에서도 해당 프로젝트를 업데이트
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.title === updatedProject.title ? updatedProject : project,
        ),
      );
      return updatedProject;
    });
  }

  function handleClearTaskToProject(currentProject, index) {
    setSelectedProject((prevState) => {
      const updatedTasks = prevState.tasks.filter((_, i) => i !== index); // 인덱스를 기준으로 task 삭제
      const updatedProject = { ...prevState, tasks: updatedTasks }; // 삭제 후 업데이트된 프로젝트 객체

      // projects 배열에서 해당 프로젝트를 업데이트
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.title === updatedProject.title ? updatedProject : project,
        ),
      );

      return updatedProject;
    });
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
