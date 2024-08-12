import React, { useState, useEffect } from 'react';
import './TumFiyatlar.css'; // CSS dosyasını içe aktar
import { useNavigate } from 'react-router-dom';
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

export const TumFiyatlarM = () => {
  const [prices, setPrices] = useState({});
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  
  // Tarihleri ve fiyatları al
  useEffect(() => {
    const fetchDatesAndPrices = async () => {
      try {
        const datesResponse = await fetch('http://localhost:3001/api/prices/dates');
        if (!datesResponse.ok) throw new Error('Network response was not ok');
        const datesData = await datesResponse.json();
        setDates(datesData);

        if (datesData.length > 0) {
          const latestDate = datesData[datesData.length - 1];
          setSelectedDate(latestDate);

          const pricesResponse = await fetch(`http://localhost:3001/api/prices?date=${latestDate}`);
          if (!pricesResponse.ok) throw new Error('Network response was not ok');
          const pricesData = await pricesResponse.json();

          setPrices(pricesData);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchDatesAndPrices();
  }, []);
  const geriGit = () => {
    navigate('/');
};
const vazgec = () => {
  navigate('/', { replace: true });
};
const navigate = useNavigate();

  // Seçilen tarihe göre fiyatları getir
  useEffect(() => {
    if (selectedDate) {
      const fetchPrices = async () => {
        try {
          const pricesResponse = await fetch(`http://localhost:3001/api/prices?date=${selectedDate}`);
          if (!pricesResponse.ok) throw new Error('Network response was not ok');
          const pricesData = await pricesResponse.json();

          setPrices(pricesData);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };

      fetchPrices();
    }
  }, [selectedDate]);

  return (
    <div className="App">
            <img onClick={vazgec} className="logo" src={karamanAltin} alt="Açıklama" />

      <div className="card">

       
        
        <div className="date-selector">
          <label htmlFor="date">Tarih Seç:</label>
          <select
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            
            {dates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('tr-TR')}
              </option>
            ))}
          </select>
        </div>
        <div className="date-header">
          <h1>{selectedDate ? new Date(selectedDate).toLocaleDateString('tr-TR') : 'Fiyatlar Yükleniyor...'}</h1>
        </div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th  style={{padding:'10px'}} className='box2'>Altın</th>
              <th  style={{padding:'10px'}} className='box2'>Alış</th>
              <th  style={{padding:'10px'}} className='box2'>Satış</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(labels).map((key) => (
              <tr key={key}>
                <th  style={{padding:'10px'}} className={`box${key.includes('Eski') ? '1' : '2'}`}>{labels[key]}</th>
                <td className={`box${key.includes('Eski') ? '1' : '2'}`}>
                  {prices[key]}
                </td>
                <td className={`box${key.includes('Eski') ? '1' : '2'}`}>
                  {prices[`${key}_`]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='grayText'>Karaman sarraflar derneği'nin tavsiye ettiği fiyat bildirimidir.</p>
      </div>
      <button  className='geriDon' onClick={geriGit}>Geri Dön</button>

    </div>
  );
}
