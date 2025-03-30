import React, { useRef, useState } from "react";
import ProjectTask from "./ProjectTask.jsx";

function ProjectDetail({ project, onClickDeleteProject, onClickAddTask }) {
  const task = useRef();

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  function handleAddTaskClick() {
    const newTask = task.current.value;
    if (newTask.trim() !== "") {
      onClickAddTask(project, newTask);
      task.current.value = ""; // 입력 필드를 초기화
    }
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onClickDeleteProject(project)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <ProjectTask
        ref={task}
        tasks={project.tasks}
        onClickAddTask={handleAddTaskClick}
      />
    </div>
  );
}

export default ProjectDetail;
