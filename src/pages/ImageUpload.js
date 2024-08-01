import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageUpload.css';  // CSS dosyasını import et
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
    const [file, setFile] = useState(null);

    const navigate = useNavigate();
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);
   
    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('image', file);

        axios.post('http://localhost:3001/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                alert('Görsel başarı ile yüklendi!');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    const geriGit = () => {
        navigate('/admin');
    };
  
    return (
        <div className="image-upload-container">
            <h2>Görsel yükleme paneli</h2>
            <div>
                <p className='notText'>Dosyayı seçin'i tıkladıktan sonra ilgili görseli seçip Yükle tuşuna tıklayınız</p>
                <p className='notText'>Not: Lütfen yüklediğiniz görselin boyutlandırmasının<br /> kare (1*1) olmasına dikkat ediniz</p>

                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Yükle
                </button>
            </div>
            <button style={{ backgroundColor: 'red' }} onClick={geriGit}>Geri Dön</button>
        </div>
    );
};

export default ImageUpload;
