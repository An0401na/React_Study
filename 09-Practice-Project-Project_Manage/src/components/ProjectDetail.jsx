import React from "react";

function ProjectDetail(props) {
  return (
    <>
      <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              Learning React
            </h1>
            <button className="text-stone-600 hover:text-stone-950">
              Delete
            </button>
          </div>
          <p className="mb-4 text-stone-400">Dec 29, 2024</p>
          <p className="text-stone-600 whitespace-pre-wrap">
            Learn React from the group up. <br />
            <br />
            Start with the basics, finish wih advanced knowledge.
          </p>
        </header>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <div className="flex items-center gap-4">
          <input className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
          <button className="text-stone-700 hover:text-stone-950">
            Add Task
          </button>
        </div>

        <p className="text-stone-800 my-4">
          This Project does not have any task yet.
        </p>
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          <li className="flex justify-between my-4">
            Learn the basics
            <button className="text-stone-700 hover:text-red-500">Clear</button>
          </li>
          <li className="flex justify-between my-4">
            Learn the basics
            <button className="text-stone-700 hover:text-red-500">Clear</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProjectDetail;
