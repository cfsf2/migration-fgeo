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
      </div>
    </>,
    document.getElementById('modal-root')
  );
}
