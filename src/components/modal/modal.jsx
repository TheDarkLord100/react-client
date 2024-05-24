import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, sellerData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="modal-content">
          <h2>Seller Information</h2>
          <p><strong>Name:</strong> {sellerData.name}</p>
          <p><strong>Email:</strong> {sellerData.email}</p>
          <p><strong>Phone:</strong> {sellerData.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
