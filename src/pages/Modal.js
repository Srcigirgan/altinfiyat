// Modal.js
import React, { useState } from 'react';
import './Modal.css'; // Stil dosyasını ekleyelim
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleClickUpload = () => {
    window.location.href = 'http://localhost:3000/Upload';
  };

  const handleClickImages = () => {
    window.location.href = 'http://localhost:3000/Images';
  };

  const handleClickRecords = () => {
    window.location.href = 'http://localhost:3000/tumfiyatlar';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button className='menuButton' style={{ backgroundColor: 'coral', }} onClick={handleClickUpload}>Görsel Yükle</button>
            <button className='menuButton' onClick={handleClickImages} style={{ backgroundColor: 'blue' }}>Galeri</button>


          </div> 
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:10 }}>
            <button className='menuButton' onClick={handleClickUpload}>Kullanıcı İşlemleri</button>
            <button className='menuButton' onClick={handleClickRecords} style={{ backgroundColor: 'green' }}>Altın Kayıtları</button>


          </div> 
               </div>
    </div>
  );
};

export default Modal;
