import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

const PROJECT = [{ name: "Learn React" }, { name: "Learn React2" }];

function App() {
  const [selectedProeject, setSelectedProeject] = useState();
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  if (selectedProeject) {
    console.log("selectedProeject : " + selectedProeject.name);
  }
  console.log("isCreatingProject : " + isCreatingProject);

  function handleSelectedProjectClick(newSelectedProject) {
    setIsCreatingProject(false);
    setSelectedProeject(newSelectedProject);
  }

  function handleCreatingProjectClick() {
    setIsCreatingProject(true);
    setSelectedProeject();
  }

  let showComponent = (
    <NoProjectSelected onClickCreatingProject={handleCreatingProjectClick} />
  );
  if (selectedProeject) {
    showComponent = <ProjectDetail />;
  }
  if (isCreatingProject) {
    showComponent = <CreateProject />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={PROJECT}
        onClickSelectedProject={handleSelectedProjectClick}
        onClickCreatingProject={handleCreatingProjectClick}
      />
      {showComponent}
    </main>
  );
}

export default App;
