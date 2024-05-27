import React, { createContext, useContext, useState } from 'react';
import CustomDialog from './CustomDialog';

const CustomDialogContext = createContext();

export const useDialog = () => useContext(CustomDialogContext);

export const CustomDialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirmBtnPressed : ()=>{}
  });

  const showDialog = (title, message, onConfirmBtnPressed) => {
    setDialogState({ isOpen: true, title, message,onConfirmBtnPressed });
  };

  const hideDialog = () => {
    setDialogState({ isOpen: false, title: '', message: '',onConfirmBtnPressed:()=>{} });
  };

  return (
    <CustomDialogContext.Provider value={{ dialogState, showDialog, hideDialog}}>
      {children}
      {dialogState.isOpen && (
        <CustomDialog title={dialogState.title} message={dialogState.message} onConfirm={dialogState.onConfirmBtnPressed} />
      )}
    </CustomDialogContext.Provider>
  );
};
