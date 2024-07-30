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
  const [number, setNumber] = useState(parseFloat(initialNumber) || 0);
  const [prevFraction, setPrevFraction] = useState(Math.floor((number % 1) * 100));
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setNumber(parseFloat(initialNumber) || 0);
  }, [initialNumber]);
  

  useEffect(() => {
    const updateRandomFraction = () => {
      const newFraction = Math.floor(Math.random() * 100);
      const integerPart = Math.floor(number);
      const newNumber = parseFloat(`${integerPart}.${newFraction}`);

      if (newFraction > prevFraction) {
        setBgColor('#d1ffbd');
      } else if (newFraction < prevFraction) {
        setBgColor('#ff7f7f');
      }

      setTimeout(() => setBgColor(''), 500); // 0.5 saniye sonra arka plan rengini eski haline getir

      setPrevFraction(newFraction);
      setNumber(newNumber);
    };

    const randomTime = Math.random() * 30000; // 0 ile 30 saniye arasında rastgele bir süre
    const interval = setInterval(updateRandomFraction, randomTime);

    return () => clearInterval(interval);
  }, [number, prevFraction]);

  return (
    <div style={{ backgroundColor: bgColor, transition: 'background-color 0.5s', padding:'10px' }}>
      {number.toFixed(2)} {/* number'ın bir sayı olduğundan emin olun */}
    </div>
  );
};

// MainPage bileşeni
function MainPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prices, setPrices] = useState({
    bilezikFiyat: 10,
    bilezikFiyat_: 10,

    ataLiraFiyat: 10,
    ataLiraFiyat_: 10,

    hamitLiraFiyat: 10,
    hamitLiraFiyat_: 10,

    cumhuriyetLiraFiyat: 10,
    cumhuriyetLiraFiyat_: 10,

    yarimFiyat: 10,
    yarimFiyat_: 10,

    ceyrekFiyat: 10,
    ceyrekFiyat_: 10,

    gramFiyat: 10,
    gramFiyat_: 10,

    yarimEskiFiyat: 10,
    yarimEskiFiyat_: 10,

    ceyrekEskiFiyat: 10,
    ceyrekEskiFiyat_: 10,

    cumhuriyetLiraEskiFiyat: 10,
    cumhuriyetLiraEskiFiyat_: 10,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/prices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.gramFiyat);
    
        setPrices(prevPrices => 
          Object.assign({}, prevPrices, {
            bilezikFiyat: parseFloat(data?.bilezikFiyat),
            ataLiraFiyat: parseFloat(data?.ataLiraFiyat),
            hamitLiraFiyat: parseFloat(data?.hamitLiraFiyat),
            cumhuriyetLiraFiyat: parseFloat(data?.cumhuriyetLiraFiyat),
            yarimFiyat: parseFloat(data?.yarimFiyat),
            ceyrekFiyat: parseFloat(data?.ceyrekFiyat),
            gramFiyat: parseFloat(data?.gramFiyat),
            yarimEskiFiyat: parseFloat(data?.yarimEskiFiyat),
            ceyrekEskiFiyat: parseFloat(data?.ceyrekEskiFiyat),
            cumhuriyetLiraEskiFiyat: parseFloat(data?.cumhuriyetLiraEskiFiyat),
      

            bilezikFiyat_: parseFloat(data?.bilezikFiyat_),
            ataLiraFiyat_: parseFloat(data?.ataLiraFiyat_),
            hamitLiraFiyat_: parseFloat(data?.hamitLiraFiyat_),
            cumhuriyetLiraFiyat_: parseFloat(data?.cumhuriyetLiraFiyat_),
            yarimFiyat_: parseFloat(data?.yarimFiyat_),
            ceyrekFiyat_: parseFloat(data?.ceyrekFiyat_),
            gramFiyat_: parseFloat(data?.gramFiyat_),
            yarimEskiFiyat_: parseFloat(data?.yarimEskiFiyat_),
            ceyrekEskiFiyat_: parseFloat(data?.ceyrekEskiFiyat_),
            cumhuriyetLiraEskiFiyat_: parseFloat(data?.cumhuriyetLiraEskiFiyat_),
    

            
          })
        );
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchPrices();
  }, []);
// FLİPCARD COMPONENTİ
//   const handleClick = (e) => {
//     e.preventDefault();
//     setIsFlipped((prevIsFlipped) => !prevIsFlipped);
//   };

  const handleClickInsta = () => {
    window.location.href = 'https://www.instagram.com/karamanaltinfiyatlari';
  };

  const handleClickFace = () => {
    window.location.href = 'https://www.facebook.com/karamanaltinfiyatlari';
  };

  return (
    <div className="App">
      <img className="logo" src={karamanAltin} alt="Açıklama" />
      {/* <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"> */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:5 }}>
            <h1 >24 Temmuz Çarşamba</h1>
            {/* <img onClick={handleClick} src={rotate} alt="Açıklama" /> */}
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

        </div>
        <ImageRotator />

     {/* BURAYA EKLENEN DİV FLİPCARD ARKA SAYFASI OLUR
      </ReactCardFlip> */}
      <h1 className="artisticText">Karaman'ın güncel altın fiyatları...</h1>

      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin:'10px' }}>
            <img className="reklam" src={mygold} />
            <img className="reklam" src={sargold} />
            <img className="reklam" src={ddiamond} />
            <img className="reklam" src={temaLogo} />

          </div> */}
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
