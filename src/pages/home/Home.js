import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import TrekDTO from "../../dto/TrekDTO";
import PaginatedItems from '../../components/pagination/CustomPagination';
import { useLoading } from '../../components/app-loader/LoadingContext';
import './Home.css'; // Import the CSS file for styling
import { useDialog } from '../../components/custom-dialog/CustomDialogContext';

export default function Home() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [treks, setTreks] = useState([]);
  const { setLoading } = useLoading();
  const { showDialog } = useDialog();
  const [selectedTrekId, setSelectedTrekId] = useState(null);


  useEffect(() => {
    const getTreks = () => {
      setLoading(true);
      getDocs(collection(db, 'trek'))
        .then(querySnapshot => {
          const trek_data = querySnapshot.docs.map(doc => TrekDTO.fromFirestore(doc));
          setTreks(trek_data);
        })
        .catch(error => {
          console.error('Error fetching treks: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getTreks();
  }, []);

  const handleLogout = () => {
  showDialog('Confirm?','Are you sure to logout',logout)
  }

  const logout = () => {
    signOut(auth).then(() => {
      setRedirectToLogin(true)
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out: ", error);
    });
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }


  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Edit trek with id: ${id}`);
    // Redirect to an edit page or open an edit modal
  };

  const handleDelete = async (id) => {
    // Show confirm dialog before deleting
    setSelectedTrekId(id);
    showDialog('Confirm Delete', 'Are you Sure?',confirmDelete);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'trek', selectedTrekId));
      setTreks(treks.filter(trek => trek.id !== selectedTrekId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setSelectedTrekId(null);
    }
  };

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
          <PaginatedItems items={treks} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          />
        ) : (
          <div className="no-treks-message">No Treks Available!</div>
        )}
      </main>
    </div>
  );
}

