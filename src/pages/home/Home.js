import { Link } from "react-router-dom";
import TrekCard from '../../components/trek-card/TrekCard'; // Import the TrekCard component
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
  return (
    <div>
     <Link to="/trek">
     <button click = "">Add Trek</button>
     </Link>
     <button onClick={handleLogout}>
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