import React, { useState, useEffect } from 'react';
import './AdminEntry.css';
import karamanAltin from '../assets/karamanAltin.png';

const labels = {
  bilezikFiyat: '22 Ayar Bilezik',
  ataLiraFiyat: 'Ata Lira',
  hamitLiraFiyat: 'Hamit Lira',
  cumhuriyetLiraFiyat: 'Cumhuriyet Lira',
  yarimFiyat: 'Yarım Altın',
  ceyrekFiyat: 'Çeyrek Altın',
  yarimEskiFiyat: 'Yarım Altın (Eski)',
  ceyrekEskiFiyat: 'Çeyrek Altın (Eski)',
  cumhuriyetLiraEskiFiyat: 'Cumhuriyet Lira (Eski)',

};



export const AdminEntry = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const initialPrices = {
    bilezikFiyat: '',
    bilezikFiyat_: '',

    ataLiraFiyat: '',
    ataLiraFiyat_: '',

    hamitLiraFiyat: '',
    hamitLiraFiyat_: '',

    cumhuriyetLiraFiyat: '',
    cumhuriyetLiraFiyat_: '',

    yarimFiyat: '',
    yarimFiyat_: '',

    ceyrekFiyat: '',
    ceyrekFiyat_: '',


    yarimEskiFiyat: '',
    yarimEskiFiyat_: '',

    ceyrekEskiFiyat: '',
    ceyrekEskiFiyat_: '',

    cumhuriyetLiraEskiFiyat: '',
    cumhuriyetLiraEskiFiyat_: '',


  };

  const [prices, setPrices] = useState(initialPrices);
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const handleClickUpload = () => {
    window.location.href = 'http://localhost:3000/Upload';
  };
  const handleClickImages = () => {
    window.location.href = 'http://localhost:3000/Images';
  };
  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3 saniye sonra alerti kapat
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setPrices({
        ...prices,
        [name]: value
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prices)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      
      // Başarılı mesajı
      setAlertMessage('Fiyat Güncelleme Başarılı!');
      setAlertType('success');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);

      // Hata mesajı
      setAlertMessage('Bir sıkıntı oluştu, tekrar deneyiniz');
      setAlertType('error');
    }

    // Alert mesajını göster
    setShowAlert(true);

    // Alert mesajını 3 saniye sonra gizle
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
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
    <div className="App">
      <img className='logo' src={karamanAltin} alt="Açıklama" />
      {!isLoggedIn ? (
      <h1 style={{ marginBottom: '15px' }}>ADMİN GİRİŞ PANELİ</h1>
     ) : (
        <h1 style={{ margin: '15px' }}>HOŞGELDİN USER</h1>
     )}
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
        <div className="card">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Altın</th>
                <th>Değer</th>
              </tr>
            </thead>
            <tbody>
            {Object.keys(initialPrices).map((key, index) => {
      // Her iki elemanda bir yeni satır oluştur
      if (index % 2 === 0) {
        const nextKey = Object.keys(initialPrices)[index + 1];
        return (
          <tr key={index}>
            <td>
              <th>{labels[key]}</th>
              <input
                type="text"
                name={key}
                placeholder="Yeni Fiyatı Giriniz"
                value={prices[key]}
                onChange={handleInputChange}
                className='custom-input'
              />
            </td>
            {nextKey && (
              <td>
                <th>{labels[nextKey]}</th>
                <input
                  type="text"
                  name={nextKey}
                  placeholder="Yeni Fiyatı Giriniz"
                  value={prices[nextKey]}
                  onChange={handleInputChange}
                  className='custom-input'
                />
              </td>
            )}
          </tr>
        );
      }
      return null; // Tek sayılı indekslerde herhangi bir dönüş yapma
    })}
  </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{ backgroundColor: 'red' }} onClick={handleLogout}>Çıkış Yap</button>
            <button onClick={handleUpdate} style={{ backgroundColor: 'green' }}>Güncelle</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{ backgroundColor: 'coral', cursor:'pointer' }} onClick={handleClickUpload}>Görsel Yükle</button>
            <button onClick={handleClickImages} style={{ backgroundColor: 'blue' }}>Galeri</button>
          </div>
          {alertMessage && (
        <div className={`alert ${alertType}`}>
          <p>{alertMessage}</p>
        </div>
      )}
        </div>
      )}
    </div>
  );
};
