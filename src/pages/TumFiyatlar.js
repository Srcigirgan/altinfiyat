import React, { useState, useEffect } from 'react';
import './TumFiyatlar.css';

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

export const TumFiyatlar = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [details, setDetails] = useState({});
  
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/prices/dates');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDates(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchDates();
  }, []);

  const handleDateClick = async (date) => {
    try {
      const response = await fetch(`http://localhost:3001/api/prices?date=${date}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const prices = data[date];

      // Access nested prices object based on date
      const formattedDetails = Object.entries(prices).reduce((acc, [key, value]) => {
        if (key.endsWith('_')) return acc; // Satış fiyatı olanları atla
        const salePrice = prices[`${key}_`];
        return { ...acc, [key]: { alış: value, satış: salePrice } };
      }, {});  
      setDetails(formattedDetails);
      setSelectedDate(date);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
    setDetails({});
  };

  return (
    <div className="tum-fiyatlar">
      <h1>Fiyat Listesi</h1>
      <div className="button-container">
        {dates.map(date => (
          <button key={date} onClick={() => handleDateClick(date)}>
            {date}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div className="details-popup">
          <h2>Fiyat Detayları ({selectedDate})</h2>
          <table>
            <thead>
              <tr>
                <th>Altın Türü</th>
                <th>Alış</th>
                <th>Satış</th>
              </tr>
            </thead>
            <tbody>
              {selectedDate && details &&
                Object.entries(details).map(([key, { alış, satış }]) => (
                  <tr key={key}>
                    <td>{labels[key] || key}</td>
                    <td>{alış}</td>
                    <td>{satış}</td>
                  </tr>
                ))}
           
           </tbody>
          </table>
          <button onClick={handleClose}>Kapat</button>
        </div>
      )}
    </div>
  );
};
