import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageList.css';  // CSS dosyasını import et
import { useNavigate } from 'react-router-dom';

const ImageList = () => {
    const [images, setImages] = useState([]);
   
    const navigate = useNavigate();
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);

   

     const geriGit = () => {
        navigate('/admin');
    };

    const fetchImages = () => {
        axios.get('http://localhost:3001/api/images')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    };

    const handleDelete = (filename) => {
        console.log(`Deleting file: ${filename}`);
        const confirmDelete = window.confirm("Silmek istediğinize emin misiniz? Bu işlem geri alınamaz.");

        if (confirmDelete) {
            axios.delete(`http://localhost:3001/api/images/${filename}`)
                .then(response => {
                    alert('Görsel başarıyla silindi.');
                    fetchImages();
                })
                .catch(error => {
                    console.error('Error deleting image:', error.response ? error.response.data : error.message);
                    alert('Görsel silinirken bir hata oluştu.');
                });
        }
    };


    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="image-list-container">
            <h2>Yüklü Görseller</h2>
           
                <div>
                    <p className='notText' >Ekranda görünmesini istemediğiniz tüm görselleri Sil'e basarak silebilirsiniz</p>
                    <p className='notText' >Not: Burada bulunan bütün görseller anasayfada görüntülenecektir</p>


                    <div className="image-grid">

                        {images.map(image => (
                            <div key={image.filename} className="image-item">
                                <img src={image.url} alt={image.filename} />
                                <button onClick={() => handleDelete(image.filename)}>Sil</button>
                            </div>
                        ))}
                    </div>
                    <button  className='geriDon' onClick={geriGit}>Geri Dön</button>

                </div>
            
        </div>
    );
};

export default ImageList;
