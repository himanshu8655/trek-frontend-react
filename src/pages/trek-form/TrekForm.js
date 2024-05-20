import './TrekForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import {useRef, useState } from "react";
import { collection, addDoc } from 'firebase/firestore'; 
import { db } from '../../firebase';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import UploadFileBtn from "../../components/upload-file-btn/UploadFileBtn";

export default function TrekForm() {
const [isFileUploaded,setFileUploaded] = useState(false);
const [trekName,setTrekName] = useState('')
const [trekDesc,setTrekDesc] = useState('')
const [errorField,setErrorField] = useState('')

const currentfile = useRef(null);
const [file,setFile]= useState('')

const onFileSelected = (e)=>{
  setErrorField('')
  setFileUploaded(true);
  setFile(e.target.files[0])
};
const removeFile = ()=>{
  console.log(currentfile.current.name)
  currentfile.current.value = '';
  setFile('')
  setFileUploaded(false)
}
const areFieldsEmpty = ()=>{
  setErrorField('')
  if(trekName===''){
    setErrorField('trekName')
    return true;
  }
  else if(trekDesc===''){
    setErrorField('trekDesc')
    return true;
  }
  if (!currentfile.current.files.length > 0) {
    setErrorField('uploadFile')
    return true;
  }
  return false;
}

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const uploadFile = (file, path)=>{
  const storageRef = ref(getStorage(), path);
  uploadBytes(storageRef, file).then((snapshot) => { 
  });
}

const addTrek = async(event)=>{ 
  event.preventDefault()
  if(areFieldsEmpty()){
    return 0;
  }
  try {

    const base64File = await toBase64(file);
    const docRef = await addDoc(collection(db, "trek"), {
      name: trekName,
      desc: trekDesc
    });

  uploadFile(base64File,docRef.id)

      alert('Successfully added Trek')
    } catch (e) {
      alert("Error adding trek!")
  }

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
          <span className="display-file">{file.name}</span>
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
            <UploadFileBtn/>

          </div>
        </div>
      </form>
    </div>
  );
}