import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

const PROJECTS = [
  { title: "Learn React", description: "dfsdfse", dueDate: "" },
  { title: "Learn React2", description: "dfsdfse", dueDate: "" },
];

function App() {
  const [projects, setProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState();
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  console.log(projects);
  if (selectedProject) {
    console.log("selectedProject : " + selectedProject.title);
  }
  console.log("isCreatingProject : " + isCreatingProject);

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
      },
    ]);
    setIsCreatingProject(false); // 프로젝트 저장 후 다시 생성 모드 종료
  }

  let showComponent = (
    <NoProjectSelected onClickCreatingProject={handleCreatingProjectClick} />
  );
  if (selectedProject) {
    showComponent = <ProjectDetail project={selectedProject} />;
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
