import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageList.css';  // CSS dosyasını import et

const ImageList = () => {
    const [images, setImages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const credentials = [
            { username: 'Admin', password: 'karamanAltin1./ab' },
            { username: 'Salih', password: '123321.Ee' }
        ];

        const user = credentials.find(
            (cred) => cred.username === username && cred.password === password
        );

        if (user) {
            setIsLoggedIn(true);
        } else {
            alert('Kullanıcı adı veya şifre yanlış!');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        window.location.href = 'http://localhost:3000';
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
            {!isLoggedIn ? (
                <div className="login-card">
                    <h2>Giriş Yap</h2>
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Giriş Yap</button>
                </div>
            ) : (
                <div>
                    <p className='notText' >Ekranda görünmesini istemediğiniz tüm görselleri Sil'e basarak silebilirsiniz</p>
                    <p className='notText' >Not: Burada bulunan bütün görseller anasayfada görüntülenecektir</p>


                    <div className="image-grid">

                        {images.map(image => (
                            <div key={image.filename} className="image-item">
                                <img src={image.url} alt={image.filename} />
                                <button onClick={() => handleDelete(image.filename)}>SİL</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageList;
