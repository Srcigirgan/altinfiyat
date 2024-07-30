import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';  // CSS dosyasını import et

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

    return (

        <div className="image-upload-container">
            <h2>Görsel yükleme paneli</h2>

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
                    <p className='notText' >Dosyayı seçin'i tıkladıktan sonra ilgili görseli seçip Yükle tuşuna tıklayınız</p>
                    <p className='notText' >Not: Lütfen yüklediğiniz görselin boyutlandırmasının<br/> kare (1*1) olmasına dikkat ediniz</p>

                    <input type="file" onChange={onFileChange} />
                    <button onClick={onFileUpload}>
                        Yükle
                    </button>
                </div>
            )}

        </div>
    );
};

export default ImageUpload;

