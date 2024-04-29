import { Link } from "react-router-dom";
import "./Auth.css";
import { useHistory } from 'react-router-dom';
import TrekCard from './TrekCard'; // Import the TrekCard component

export default function Home() {
  
  return (
    <div>
     <Link to="/AddTrek">
     <button click = "">Add Trek</button>
     </Link>
      <TrekCard
        name="Mount Everest"
        description="The tallest mountain in the world."
        image="http://localhost:8080/trek/img/10"
      />
    </div>
  );
}