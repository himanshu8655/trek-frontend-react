import { Link } from "react-router-dom";
import TrekCard from '../../components/trek-card/TrekCard'; // Import the TrekCard component
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase";
import { useState } from "react";

export default function Home() {
  const [info, setInfo] = useState([]);

  const navigate = useNavigate();
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

const Fetchdata = () => {
  db.collection("trek").get().then((querySnapshot) => {

      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
          var data = element.data();
          console.log(data)
          setInfo(arr => [...arr, data]);

      });
  })
}

  return (
    <div>
     <Link to="/trek">
     <button click = "">Add Trek</button>
     </Link>
     <button onClick={Fetchdata}>
                        Logout
                    </button>
      <TrekCard
        name="Mount Everest"
        description="The tallest mountain in the world."
        image="http://localhost:8080/trek/img/10"
      />
    </div>
  );
}