import SideBar from "./components/SideBar.jsx";
import React from "react";
import { Node } from "postcss";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar />
        <NoProjectSelected />
      </main>
    </>
  );
}

export default App;
