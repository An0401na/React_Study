import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

const PROJECT = [{ name: "Learn React" }];

function App() {
  const [selectedProeject, setSelectedProeject] = useState();

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar projects={PROJECT} />
      {!selectedProeject ? <NoProjectSelected /> : <ProjectDetail />}
    </main>
  );
}

export default App;
