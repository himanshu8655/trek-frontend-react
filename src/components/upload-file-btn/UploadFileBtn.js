import React, { useState } from 'react';
import './UploadFileBtn.css'
import { faFileUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function UploadFileBtn({getCurrentFile,error,allowed_extension='image/*'}) {

  const [file,setFile] = useState(undefined)

const onBtnClick = ()=>{
  document.getElementById('file-btn').click()
}

  const onFileChange=(e)=>{
  const file = e.target.files[0];
    if (file) {
      setFile(file)
      getCurrentFile(file)
    }
}

const removeFile=(e)=>{
  setFile(undefined)
  getCurrentFile(undefined)
}

  return (
    <div>
    {file? 
    <div className="flex-container">
    <span className="display-file">{file.name}</span>
    <div onClick={removeFile}>
    <FontAwesomeIcon icon={faTimes} size="1x" color="white"/></div>
    </div>  :
      
      <div onClick={onBtnClick}> 
      <div className='drop-area-normal' onClick={(e)=>{}}>
    <p>Upload File</p>

<FontAwesomeIcon icon={faFileUpload} size="2x" color="black"/>
</div>
    <input id = "file-btn" type="file" className="file-upload" onChange={onFileChange}  accept={allowed_extension}/>
    </div>}
    {error?<div className="error-field">Upload file!</div>:null}

    </div>
  );
}
