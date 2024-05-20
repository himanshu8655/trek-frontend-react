import React from 'react';
import './UploadFileBtn.css'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function UploadFileBtn() {
  return (
    <div> 
      <div className='drop-area-normal' onClick={(e)=>{}}>
    <p>Upload File</p>

<FontAwesomeIcon icon={faFileUpload} size="2x" color="black"/>
</div>
    <input type="file" className="file-upload"/>
    </div>
  );
}
