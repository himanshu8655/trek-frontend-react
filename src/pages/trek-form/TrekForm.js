import './TrekForm.css'

import React, { useState, useEffect } from "react";
import { collection, setDoc,doc, updateDoc, getDoc } from 'firebase/firestore'; 
import { db } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UploadFileBtn from '../../components/upload-file-btn/UploadFileBtn';
import { useLoading } from '../../components/app-loader/LoadingContext';
import { Navigate, useLocation } from 'react-router-dom';
import TrekDTO from '../../dto/TrekDTO';

export default function TrekForm() {
const [trekName,setTrekName] = useState('')
const [trekDesc,setTrekDesc] = useState('')
const [errorField,setErrorField] = useState('')
const [file,setFile]= useState(undefined)
const [upload_btn_error,setUploadBtnError]=useState(false)
const { setLoading } = useLoading();
const [redirectToHome, setRedirectToHome] = useState(false);
const [trekId,setTrekId] = useState(null)
var trek_data = null;

let query = useQuery();

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
useEffect(() => {
  setTrekId(query.get("id"));
  


  if (trekId) {
    getTrekById(trekId);
  } 
}, [trekId]);

const getTrekById = async (id) => {
  setLoading(true);
  try {
    const snapshot = await getDoc(doc(db, 'trek', id));
    if (!snapshot.exists()) { // Use exists() method to check if the document exists
      setRedirectToHome(true);
      alert("Trek does not exist or is deleted!");
      return;
    }
    trek_data = TrekDTO.fromFirestore(snapshot);
    setTrekName(trek_data.name);
    setTrekDesc(trek_data.desc);
  } catch (err) {
    console.log("Error:", err);
  } finally {
    setLoading(false);
  }
};


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

const updateTrek=async(event)=>{
  console.log("update trek called",trekId)
  event.preventDefault()
  if(areFieldsEmpty()){
    return 0;
  }
const docRef = doc(db,"trek",trekId) 
updateDoc(docRef,{
  name: trekName,
  desc: trekDesc}
).then(snapshot=>{
  setLoading(false)
    setRedirectToHome(true)
    console.log(snapshot)
})
if(file)
uploadFile(file, trekId)
}

const addTrek = async(event)=>{ 
  console.log("add trek called")
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
      download_url: url,
      id: docRef.id
    });
    setLoading(false)
    setRedirectToHome(true)
  } catch (e) {
    alert("Error adding trek!");
    setLoading(false)
  }

}

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(trekId)?updateTrek:addTrek}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Trek</h3>
          <div className="textField-label">
              <label>Trek Name</label><br/>
              <input
                type="text"
                className="textField-input"
                placeholder="Enter Trek Name"
                value={trekName}
                onChange={(e)=>{setTrekName(e.target.value);setErrorField('')}}
              />
              {errorField === 'trekName'?<div className="error-field">Field cannot be empty!</div>:null}
              <div className="textField-label">
            <label>Description</label><br/>
            <textarea
              className="textField-input"
              placeholder="Enter Description..."
              value={trekDesc}
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