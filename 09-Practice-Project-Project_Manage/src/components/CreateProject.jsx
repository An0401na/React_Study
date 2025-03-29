import React from "react";

function CreateProject(props) {
  return (
    <div className="w-[35rem] mt-16">
      <form className="mt-4 text-right">
        <menu className="flex items-center justify-end gap-4 my-4">
          <button className="text-stone-800 hover:text-stone-950">
            Cancle
          </button>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
            Save
          </button>
        </menu>
      </form>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          TITLE
        </label>
        <input className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
      </p>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          DESCRIPTION
        </label>
        <textarea className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
      </p>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          DUE DATE
        </label>
        <input
          type="date"
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>
    </div>
  );
}

export default CreateProject;
