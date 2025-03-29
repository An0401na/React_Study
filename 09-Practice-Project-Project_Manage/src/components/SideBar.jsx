import React from "react";

function SideBar(props) {
  return (
    <p className="mt-8">
      <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          YOUR PROJECTS
        </h2>
        <button className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800">
          + Add Project
        </button>
      </aside>
    </p>
  );
}

export default SideBar;
