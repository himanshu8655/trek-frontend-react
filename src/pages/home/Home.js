import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import TrekDTO from "../../dto/TrekDTO";
import { useLoading } from '../../components/app-loader/LoadingContext';
import PaginatedItems from '../../components/pagination/CustomPagination';
import './Home.css'; // Ensure this CSS file contains the necessary styles

export default function Home() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [treks, setTreks] = useState([]);
  const { setLoading } = useLoading();
  const [filter, setFilter] = useState(3);

  useEffect(() => {
    getTreks();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setRedirectToLogin(true);
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  }

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  const getTreks = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'trek'));
    const trek_data = querySnapshot.docs.map(doc => TrekDTO.fromFirestore(doc));
    console.log(trek_data.length)
    setTreks(trek_data);
    setLoading(false);
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-header-content">
          <Link to="/trek" className="home-btn add-trek-btn">Add Trek</Link>
          <button className="home-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="home-main">
        <h1 className="home-title">Available Treks</h1>

        {treks.length !== 0 ? (
          <PaginatedItems items={treks} />
        ) : (
          <div className="no-treks-message">No Treks Available!</div>
        )}
      </main>
    </div>
  );
}
