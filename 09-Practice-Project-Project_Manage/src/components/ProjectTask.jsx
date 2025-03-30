import React, { useRef } from "react";

function ProjectTask({ ref, project }) {
  const task = useRef();

  return (
    <>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input ref={task} className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
        <button className="text-stone-700 hover:text-stone-950">
          Add Task
        </button>
      </div>
      {!project.tasks ? (
        <p className="text-stone-800 my-4">
          This Project does not have any task yet.
        </p>
      ) : (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {project.tasks.map((task, index) => {
            return (
              <li key={index} className="flex justify-between my-4">
                {task}
                <button className="text-stone-700 hover:text-red-500">
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default ProjectTask;
