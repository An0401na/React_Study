import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

const PROJECT = [{ name: "Learn React" }, { name: "Learn React2" }];

function App() {
  const [selectedProeject, setSelectedProeject] = useState();

  if (selectedProeject) {
    console.log("selectedProeject : " + selectedProeject.name);
  }

  function handleSelectedProjectClick(newSelectedProject) {
    setSelectedProeject(newSelectedProject);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={PROJECT}
        onClickSelectedProject={handleSelectedProjectClick}
      />
      {!selectedProeject ? <NoProjectSelected /> : <ProjectDetail />}
    </main>
  );
}

export default App;
