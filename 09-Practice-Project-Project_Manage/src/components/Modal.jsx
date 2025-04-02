import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ ref, children, buttonCaption }) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
          {buttonCaption}
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
