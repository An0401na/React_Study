import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // 컴포넌트 함수가 실행된 후에 부수효과 함수를 실행하여 dailog 참조가 undefined를 방지
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // open이 변경될 때마다 실행

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}

export default Modal;
