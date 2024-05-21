import './TrekForm.css'

import { useState } from "react";
import { collection, setDoc,doc } from 'firebase/firestore'; 
import { db } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UploadFileBtn from '../../components/upload-file-btn/UploadFileBtn';
import { useLoading } from '../../components/app-loader/LoadingContext';
import { Navigate } from 'react-router-dom';

export default function TrekForm() {
const [trekName,setTrekName] = useState('')
const [trekDesc,setTrekDesc] = useState('')
const [errorField,setErrorField] = useState('')
const [file,setFile]= useState(undefined)
const [upload_btn_error,setUploadBtnError]=useState(false)
const { setLoading } = useLoading();
const [redirectToHome, setRedirectToHome] = useState(false);

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
  if (!file) {
    setUploadBtnError(true)
    return true;
  }
  return false;
}

const uploadFile = async (file, path) => {
  const storageRef = ref(getStorage(), path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url; // Return the download URL
}

if(redirectToHome){
  return <Navigate to="/home" />;
}
const addTrek = async(event)=>{ 
  event.preventDefault()
  if(areFieldsEmpty()){
    return 0;
  }
  try {
    setLoading(true)
    const docRef = doc(collection(db, "trek")); // Get a reference to the document
    const url = await uploadFile(file, docRef.id)
    
    await setDoc(docRef, { // Use setDoc instead of addDoc
      name: trekName,
      desc: trekDesc,
      download_url: url // Get and set the download URL directly
    });
    setLoading(false)
    setRedirectToHome(true)
  } catch (e) {
    console.error("Error adding trek:", e);
    alert("Error adding trek!");
    setLoading(false)
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
              {errorField === 'trekName'?<div className="error-field">Field cannot be empty!</div>:null}
              <div className="textField-label">
            <label>Description</label><br/>
            <textarea
              className="textField-input"
              placeholder="Enter Description..."
              onChange={(e)=>{setTrekDesc(e.target.value);setErrorField('')}}
            />
            {errorField === 'trekDesc'?<div className="error-field">Field cannot be empty!</div>:null}

          </div>
          
          <UploadFileBtn getCurrentFile={(file)=>{setFile(file);setUploadBtnError(false)}} error={upload_btn_error} />


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