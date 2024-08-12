import React, { useState, useEffect } from 'react';
import '../App.css';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import ReactCardFlip from 'react-card-flip';
import rotate from '../assets/rotate.png';
import sargold from '../assets/sargold.png';
import mygold from '../assets/mygold.png';
import ddiamond from '../assets/ddiamond.png';
import temaLogo from '../assets/tema-logo.png';
import ImageRotator from './ImageRotator';
import karamanAltin from '../assets/karamanAltin.png';

// RandomFractionBox bileşeni
const RandomFractionBox = ({ initialNumber }) => {
  const [fraction, setFraction] = useState(Math.floor(Math.random() * 100)); 
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const updateRandomFraction = () => {
      const newFraction = Math.floor(Math.random() * 100);

      if (newFraction > fraction) {
        setBgColor('#d1ffbd');
      } else if (newFraction < fraction) {
        setBgColor('#ff7f7f');
      }

      setTimeout(() => setBgColor(''), 500);

      setFraction(newFraction);
    };

    const randomTime = Math.random() * 30000; // 0 ile 30 saniye arasında rastgele bir süre
    const interval = setInterval(updateRandomFraction, randomTime);

    return () => clearInterval(interval);
  }, [fraction]);

  return (
    <div style={{ backgroundColor: bgColor, transition: 'background-color 0.5s', padding: '10px' }}>
      {initialNumber}.{fraction.toString().padStart(2, '0')} 
    </div>
  );
};

// MainPage bileşeni
function MainPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prices, setPrices] = useState({});
  const [latestDate, setLatestDate] = useState('');

  useEffect(() => {
    const fetchDatesAndPrices = async () => {
      try {
        // Mevcut tarihleri al
        const datesResponse = await fetch('http://localhost:3001/api/prices/dates');
        if (!datesResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const datesData = await datesResponse.json();

        // Tarihleri sıralayıp en son tarihi seç
        const latest = datesData[datesData.length - 1];
        setLatestDate(latest);

        // En güncel tarihli fiyatları al
        const pricesResponse = await fetch(`http://localhost:3001/api/prices?date=${latest}`);
        if (!pricesResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const pricesData = await pricesResponse.json();

        // En güncel fiyatları ayarla
        setPrices(pricesData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchDatesAndPrices();
  }, []);

  const handleClickInsta = () => {
    window.location.href = 'https://www.instagram.com/karamanaltinfiyatlari';
  };

  const handleClickFace = () => {
    window.location.href = 'https://www.facebook.com/karamanaltinfiyatlari';
  };

  const goAllPrices = () => {
    window.location.href = '/all-prices';
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateObj.toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="App">
      <img className="logo" src={karamanAltin} alt="Açıklama" />
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:5 }}>
          <h1>{latestDate ? formatDate(latestDate) : 'Fiyatlar Yükleniyor...'}</h1>
          <div  className='otherPrices' onClick={goAllPrices}>
            <p  style={{color:'white'}} >Diğer Tarihler</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th className='box2' style={{padding:'10px', borderTopLeftRadius:8}} >Altın</th>
              <th className='box2' style={{padding:'10px'}} >Alış</th>
              <th className='box2' style={{padding:'10px' ,borderTopRightRadius:8 }} >Satış</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='box1' >22 Ayar Bilezik</th>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.bilezikFiyat} />
              </td>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.bilezikFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box2' >Çeyrek Altın (Eski)</th>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.ceyrekEskiFiyat} />
              </td>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.ceyrekEskiFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box1' >Yarım Altın (Eski)</th>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.yarimEskiFiyat} />
              </td>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.yarimEskiFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box2' >Cumhuriyet Lira (Eski)</th>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.cumhuriyetLiraEskiFiyat} />
              </td>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.cumhuriyetLiraEskiFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box1' >Ata Lira</th>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.ataLiraFiyat} />
              </td>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.ataLiraFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box2' >Hamit - Reşat Lira</th>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.hamitLiraFiyat} />
              </td>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.hamitLiraFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box2' >Yeni Çeyrek Altın</th>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.ceyrekFiyat} />
              </td>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.ceyrekFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box1' >Yeni Yarım Altın</th>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.yarimFiyat} />
              </td>
              <td className="box1">
                <RandomFractionBox initialNumber={prices.yarimFiyat_} />
              </td>
            </tr>
            <tr>
              <th className='box2' style={{borderBottomLeftRadius:8}} >Yeni Cumhuriyet Lira</th>
              <td className="box2">
                <RandomFractionBox initialNumber={prices.cumhuriyetLiraFiyat} />
              </td>
              <td style={{borderBottomRightRadius:8}} className="box2">
                <RandomFractionBox initialNumber={prices.cumhuriyetLiraFiyat_} />
                </td>
              </tr>
              
            </tbody>
          </table>
          <p className='grayText' >Karaman sarraflar derneği'nin tavsiye ettiği fiyat bildirimidir.</p>
{/* YA BUNUN ALTINDAKİ DİV KALKACAK BU ZATEN VARDI */}
        </div> 
        <ImageRotator />

{/* BURAYA EKLENEN DİV FLİPCARD ARKA SAYFASI OLUR */}
{/* <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"> */}
{/* <div>Back of the card</div> */}
{/* </ReactCardFlip> */}
{/* VEYA TAM BURADAN SİLİNEN DİV EKLENECEK */}

<h1 className="artisticText">Karaman'ın güncel altın fiyatları...</h1>

<div style={{ display: 'flex', alignItems: 'center' }}>
<div onClick={handleClickInsta} className="scaleUp" style={{ display: 'flex', marginTop: '5px', alignItems: 'center', padding: 5 }}>
  <img src={instagram} alt="Açıklama" width={20} height={20} />
  <p style={{ marginLeft: 5 }}>@karamanaltinfiyatlari</p>
</div>
<div onClick={handleClickFace} className="scaleUp" style={{ display: 'flex', margin: '5px', alignItems: 'center', padding: 5 }}>
  <img src={facebook} alt="Açıklama" width={20} height={20} />
  <p style={{ marginLeft: 5 }}>Karaman Altın Fiyatları</p>
</div>
</div>
</div>
);
}

export default MainPage;

