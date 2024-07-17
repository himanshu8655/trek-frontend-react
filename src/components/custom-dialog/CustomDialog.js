import React from 'react';
import './CustomDialog.css'; // Import CSS for styling
import { useDialog } from './CustomDialogContext';

function CustomDialog({ title, message, onConfirm }) {

  const handleConfirm = () => {
    onConfirm();
    hideDialog();
  }

  const { hideDialog } = useDialog();
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-dialog-buttons">
          <button className="primary-btn" onClick={handleConfirm}>Yes</button>
          <button className="secondary-btn" onClick={hideDialog}>No</button>
        </div>
      </div>
    </div>
  );
}

export default CustomDialog;