import "./AddTrek.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faFileUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';

export default function AddTrek() {
const [isFileUploaded,setFileUploaded] = useState(false);
const [fileName,setFileName] = useState()
const [trekName,setTrekName] = useState('')
const [trekDesc,setTrekDesc] = useState('')
const [errorField,setErrorField] = useState('')


const currentfile = useRef(null);

const onFileSelected = (e)=>{
  setErrorField('')
  setFileUploaded(true);
  setFileName(currentfile.current.files[0].name);
};
const removeFile = (event)=>{
  console.log(currentfile.current.name)
  currentfile.current.value = '';
  setFileUploaded(false)
}
const addTrek = (event)=>{ 
  event.preventDefault()
  setErrorField('')
  if(trekName==''){
    setErrorField('trekName')
    return 0;
  }
  else if(trekDesc==''){
    setErrorField('trekDesc')
    return 0;
  }
  if (!currentfile.current.files.length > 0) {
    setErrorField('uploadFile')
    return 0;
  }
  axios.post("http://localhost:8080/trek").then(res=>{
    console.log(res)
  }).catch(err=>{

  })
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={addTrek}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Add Trek</h3>
          <div className="textField-label">
              <label>Add Trek</label><br/>
              <input
                type="text"
                className="textField-input"
                placeholder="Enter Trek Name"
                onChange={(e)=>{setTrekName(e.target.value);setErrorField('')}}
              />
              {errorField == 'trekName'?<div className="error-field">Field cannot be empty!</div>:null}
              <div className="textField-label">
            <label>Description</label><br/>
            <textarea
              className="textField-input"
              placeholder="Enter Description..."
              onChange={(e)=>{setTrekDesc(e.target.value);setErrorField('')}}
            />
                                       {errorField == 'trekDesc'?<div className="error-field">Field cannot be empty!</div>:null}

          </div>
          
          {isFileUploaded?(<div className="flex-container">
          <span className="display-file">{fileName}</span>
          <div onClick={removeFile}>
          <FontAwesomeIcon icon={faTimes} size="1x" color="white"/>
          </div>
          </div>): <div className='drop-area-normal' onClick={(e)=>currentfile.current.click()}>
              <p>Upload File</p>
  
    <FontAwesomeIcon icon={faFileUpload} size="2x" color="black"/>
</div>}
<input type="file" className="file-upload" onChange={onFileSelected} ref = {currentfile}/>

            </div>
           
          <div className="Auth-form-title">
          {errorField == 'uploadFile'?<div className="error-field">Upload file!</div>:null}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}