import "./AddTrek.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faFileUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";

export default function AddTrek() {
const [isFileUploaded,setFileUploaded] = useState(false);
const [fileName,setFileName] = useState()
const currentfile = useRef(null);

const onFileSelected = (e)=>{
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
  console.log(currentfile.current.files[0].name)
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
              />
              <div className="textField-label">
            <label>Description</label><br/>
            <textarea
              className="textField-input"
              placeholder="Enter Description..."
            />
          </div>
          
          {isFileUploaded?(<div className="flex-container">
          <span className="display-file">{fileName}</span>
          <div onClick={removeFile}>
          <FontAwesomeIcon icon={faTimes} size="1x" color="white"/>
          </div>
          </div>): <div className="drop-area" onClick={(e)=>currentfile.current.click()}>
              <p>Upload File</p>
  
    <FontAwesomeIcon icon={faFileUpload} size="2x" color="black"/>
</div>}
<input type="file" className="file-upload" onChange={onFileSelected} ref = {currentfile}/>

            </div>
           
          <div className="Auth-form-title">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}