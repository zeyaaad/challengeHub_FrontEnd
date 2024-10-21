import React from 'react';
import './css/CustomModal.css'; 

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
