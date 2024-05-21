import TrekCard from '../../components/trek-card/TrekCard'; // Import the TrekCard component
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import TrekDTO from "../../dto/TrekDTO";
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import './Home.css'; // Import the CSS file for styling
import { useLoading } from '../../components/app-loader/LoadingContext';

export default function Home() {
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const [treks, setTreks] = useState([]);
  const {setLoading} = useLoading()

  useEffect(() => {
    getTreks();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setRedirectToLogin(true)
    }).catch((error) => {
      // An error happened.
    });
  }
  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }
  const getTreks = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, 'trek'));
    const trek_data = querySnapshot.docs.map(doc => {return TrekDTO.fromFirestore(doc)});
    setTreks(trek_data)
    setLoading(false);
  }

  return (
    <div className="home-container">
      <div className="home-header">
          <Link to="/trek" className="home-btn">Add Trek</Link>
        <button className="home-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="home-grid">
        {
          treks.length !== 0 ? (
            treks.map((trek, index) => (
              <div key={index} className="trek-card-container">
                <TrekCard
                  name={trek.name}
                  description={trek.desc}
                  image={trek.download_url}
                />
              </div>
            ))
          ) : (
            <div>No Treks!</div>
          )
        }
      </div>
    </div>
  );
}
