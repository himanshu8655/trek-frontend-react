import React from 'react';
import './TrekCard.css'; // Import CSS file for styling

function TrekCard({ name, description, image }) {
  return (
    <div className="trek-card">
      <img src={image} alt={name} className="trek-card-image" />
      <div className="trek-card-content">
        <h2 className="trek-card-title">{name}</h2>
        <p className="trek-card-description">{description}</p>
      </div>
    </div>
  );
}

export default TrekCard;
