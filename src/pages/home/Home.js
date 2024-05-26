import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import TrekDTO from "../../dto/TrekDTO";
import PaginatedItems from '../../components/pagination/CustomPagination';
import { useLoading } from '../../components/app-loader/LoadingContext';
import './Home.css'; // Import the CSS file for styling
import ConfirmDialog from '../../components/custom-dialog/CustomDialog';

export default function Home() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [treks, setTreks] = useState([]);
  const { setLoading } = useLoading();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedTrekId, setSelectedTrekId] = useState(null);

  useEffect(() => {
    getTreks();
  }, []);

  const handleLogout = () => {
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

  const getTreks = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'trek'));
    const trek_data = querySnapshot.docs.map(doc => TrekDTO.fromFirestore(doc));
    setTreks(trek_data);
    setLoading(false);
  };

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Edit trek with id: ${id}`);
    // Redirect to an edit page or open an edit modal
  };

  const handleDelete = async (id) => {
    // Show confirm dialog before deleting
    setSelectedTrekId(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'trek', selectedTrekId));
      setTreks(treks.filter(trek => trek.id !== selectedTrekId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setShowConfirmDialog(false);
      setSelectedTrekId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setSelectedTrekId(null);
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
      {showConfirmDialog && (
        <ConfirmDialog
          title="Confirm Delete"
          message="Are you sure you want to delete this trek?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

