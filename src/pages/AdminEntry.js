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
  gramFiyat: 'Gram Altın',
  yarimEskiFiyat: 'Yarım Altın (Eski)',
  ceyrekEskiFiyat: 'Çeyrek Altın (Eski)',
  cumhuriyetLiraEskiFiyat: 'Cumhuriyet Lira (Eski)',
  dolarFiyat: 'Dolar',
  euroFiyat: 'Euro',
  pariteFiyat: 'Parite'
};

export const AdminEntry = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const initialPrices = {
    bilezikFiyat: '',
    ataLiraFiyat: '',
    hamitLiraFiyat: '',
    cumhuriyetLiraFiyat: '',
    yarimFiyat: '',
    ceyrekFiyat: '',
    gramFiyat: '',
    yarimEskiFiyat: '',
    ceyrekEskiFiyat: '',
    cumhuriyetLiraEskiFiyat: '',
    dolarFiyat: '',
    euroFiyat: '',
    pariteFiyat: ''
  };

  const [prices, setPrices] = useState(initialPrices);

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
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
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
  };

  return (
    <div className="App">
      <img className='logo' src={karamanAltin} alt="Açıklama" />
      <h1 style={{ marginBottom: '15px' }}>ADMİN GİRİŞ PANELİ</h1>
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
              {Object.keys(initialPrices).map((key, index) => (
                <tr key={index}>
                  <th>{labels[key]}</th>
                  <td>
                    <input
                      type="text"
                      name={key}
                      placeholder="Yeni Fiyatı Giriniz"
                      value={prices[key]}
                      onChange={handleInputChange}
                      className='custom-input'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{ backgroundColor: 'red' }} onClick={handleLogout}>Çıkış Yap</button>
            <button onClick={handleUpdate} style={{ backgroundColor: 'green' }}>Güncelle</button>
          </div>
        </div>
      )}
    </div>
  );
};
