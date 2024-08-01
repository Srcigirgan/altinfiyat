import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageRotator.css'; // CSS dosyasını import et

const ImageRotator = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        setCurrentIndex(Math.floor(Math.random() * images.length));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="image-rotator-container">
      {images.length > 0 && (
        <img 
          src={images[currentIndex].url} 
          alt={images[currentIndex].filename} 
          className="rotating-image" 
        />
      )}
    </div>
  );
};

export default ImageRotator;
