import React from 'react';
import './CustomDialog.css'; // Import CSS for styling

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-dialog-buttons">
          <button className="confirm-dialog-button" onClick={onConfirm}>Yes</button>
          <button className="confirm-dialog-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;