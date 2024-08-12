import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminEntry.css';
import karamanAltin from '../assets/karamanAltin.png';
import Modal from './Modal';
import { jwtDecode } from 'jwt-decode';

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

export const AdminEntry = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [prices, setPrices] = useState(initialPrices);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
      setUsername(getUserNameFromToken(token)); // Kullanıcı adını state'e ekleyin
      fetchPrices(token);  // Fiyatları al
    }
  }, [navigate]);


  const fetchPrices = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/prices', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPrices(data);
      } else {
        throw new Error('Unable to fetch prices');
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
      navigate('/login'); // Hata durumunda yönlendir
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setPrices({
        ...prices,
        [name]: value,
      });
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const getUserNameFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.username || 'User';
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'User';
    }
  };
  const vazgec = () => {
    navigate('/', { replace: true });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/prices?date=${selectedDate}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        if (Object.keys(data).length > 0) {
          // Tarih zaten var, mevcut verileri güncelle
          const updatedPrices = { ...data, ...prices, date: selectedDate };
          await fetch('http://localhost:3001/api/prices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedPrices),
          });
        } else {
          // Tarih yoksa yeni veriyi ekle
          await fetch('http://localhost:3001/api/prices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...prices, date: selectedDate }),
          });
        }
      } else {
        throw new Error('Network response was not ok');
      }
  
      setAlertMessage('Fiyat Güncelleme Başarılı!');
      setAlertType('success');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setAlertMessage('Bir sıkıntı oluştu, tekrar deneyiniz');
      setAlertType('error');
    }
  
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleClickUpload = () => {
    navigate('/upload');
  };

  const handleClickImages = () => {
    navigate('/images');
  };

  return (
    <div className="App">
      <img onClick={vazgec} className="logo" src={karamanAltin} alt="Açıklama" />
      {isLoggedIn && <h1 style={{ margin: '15px' }}>Merhaba {username}!</h1>}
      <button className='menuButton' onClick={openModal}>Menü</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {isLoggedIn ? (
        <div className="card">
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="datePicker">Lütfen Tarih Seçiniz:</label>
            <input
              type="date"
              id="datePicker"
              value={selectedDate}
              onChange={handleDateChange}
              className="custom-input"
            />
          </div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Altın</th>
                <th>Değer</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(initialPrices).map((key, index) => {
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
                          value={prices[key] || ''}
                          onChange={handleInputChange}
                          className="custom-input"
                        />
                      </td>
                      {nextKey && (
                        <td>
                          <th>{labels[nextKey]}</th>
                          <input
                            type="text"
                            name={nextKey}
                            placeholder="Yeni Fiyatı Giriniz"
                            value={prices[nextKey] || ''}
                            onChange={handleInputChange}
                            className="custom-input"
                          />
                        </td>
                      )}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{ backgroundColor: 'red' }} onClick={handleLogout}>Çıkış Yap</button>
            <button onClick={handleUpdate} style={{ backgroundColor: 'green' }}>Güncelle</button>
          </div>
          {alertMessage && (
            <div className={`alert ${alertType}`}>
              <p>{alertMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <h1 style={{ marginBottom: '15px' }}>ADMİN GİRİŞ PANELİ</h1>
      )}
    </div>
  );
};
