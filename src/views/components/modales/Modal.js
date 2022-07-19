import React from 'react';
import ReactDOM from 'react-dom';
import '../modales/Modal.css';

export default function Modal({ open, handleClose, children, style }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fondo-modal" onClick={() => handleClose(false)}></div>
      <div className="modal-container" style={style}>
        {children}
        <button className="equis">
          <svg
            onClick={() => handleClose(false)}
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
            />
            <path
              fill-rule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
            />
          </svg>
        </button>
      </div>
    </>,
    document.getElementById('modal-root')
  );
}
