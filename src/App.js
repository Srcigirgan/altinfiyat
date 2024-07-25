import React, { useState, useEffect } from 'react';
import './App.css';
import facebook from './assets/facebook.png'
import instagram from './assets/instagram.png'
import ReactCardFlip from 'react-card-flip';
import rotate from './assets/rotate.png'
import sargold from './assets/sargold.png'
import mygold from './assets/mygold.png'
import ddiamond from './assets/ddiamond.png'
import karamanAltin from './assets/karamanAltin.png'


const RandomFractionBox = ({ initialNumber }) => {
  const [number, setNumber] = useState(initialNumber);
  const [prevFraction, setPrevFraction] = useState(Math.floor((initialNumber % 1) * 100));
  const [bgColor, setBgColor] = useState('');

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
    <div style={{ backgroundColor: bgColor, transition: 'background-color 0.5s' }}>
      {number.toFixed(2)}
    </div>
  );
};



function App() {

  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(prevIsFlipped => !prevIsFlipped);
  };

  const handleClickInsta = () => {
    window.location.href = 'https://www.instagram.com/karamanaltinfiyatlari';
  }
  const handleClickFace = () => {
    window.location.href = 'https://www.facebook.com/karamanaltinfiyatlari';
  };

  const [number, setNumber] = useState(2365.00);
 

  const [prevFraction, setPrevFraction] = useState(55);
  const [bgColor, setBgColor] = useState('green');

  useEffect(() => {
    const updateRandomFraction = () => {
      const newFraction = Math.floor(Math.random() * 100);
      const integerPart = Math.floor(number);
      const newNumber = parseFloat(`${integerPart}.${newFraction}`);

      if (newFraction > prevFraction) {
        setBgColor('green');
      } else if (newFraction < prevFraction) {
        setBgColor('red');
      }

      setTimeout(() => setBgColor(''), 500); // 0.5 saniye sonra arka plan rengini eski haline getir

      setPrevFraction(newFraction);
      setNumber(newNumber);
    };

    const interval = setInterval(() => {
      const randomTime = Math.random() * 10000; // 0 ile 10 saniye arasında rastgele bir süre
      setTimeout(updateRandomFraction, randomTime);
    }, 10000);

    return () => clearInterval(interval);
  }, [number, prevFraction]);


  return (
    <div className="App">
      
            <img className='logo' src={karamanAltin} alt="Açıklama" />

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div   className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} >     
           <h1>Tarih:</h1>
        <p>24 Temmuz Çarşamba</p>
        <img  onClick={handleClick} src={rotate} alt="Açıklama" />
        </div>

        <table className="invoice-table">
        <thead>
          <tr>
            <th>Altın</th>
            <th>Alış</th>
            <th>Satış</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>22 Ayar Bilezik</th>
            <td className="box1">
        <RandomFractionBox initialNumber={2365.00} />
      </td>
      <td className="box1">
        <RandomFractionBox initialNumber={2540.00} />
      </td>
          </tr>
          <tr>
            <th>Ata Lira</th>
            <td className="box1">
        <RandomFractionBox initialNumber={17225.00} />
      </td>          
      <td className="box1">
        <RandomFractionBox initialNumber={17925.00} />
      </td>        
        </tr>
          <tr>
            <th>Hamit Lira</th>
            <td className="box1">
        <RandomFractionBox initialNumber={17225.00} />
      </td>         
      <td className="box1">
        <RandomFractionBox initialNumber={17925.00} />
      </td>       
         </tr>
          <tr>
            <th>Cumhuriyet Lira</th>
            <td className="box1">
        <RandomFractionBox initialNumber={16910.00} />
      </td>          
      <td className="box1">
        <RandomFractionBox initialNumber={17510.00} />
      </td>       
          </tr>
          <tr>
            <th>Yarım Altın</th>
            <td className="box1">
        <RandomFractionBox initialNumber={8480.00} />
      </td> 
      <td className="box1">
        <RandomFractionBox initialNumber={8780.00} />
      </td> 
          </tr>
          <tr>
            <th>Çeyrek Altın</th>
            <td className="box1">
        <RandomFractionBox initialNumber={4240.00} />
      </td>            
      <td className="box1">
        <RandomFractionBox initialNumber={4390.00} />
      </td> 
                </tr>
          <tr>
            <th>Gram Altın</th>
            <td className="box1">
        <RandomFractionBox initialNumber={2530.00} />
      </td> 
      <td className="box1">
        <RandomFractionBox initialNumber={2560.00} />
      </td>        
         </tr>
        </tbody>
      </table>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} >
      <img className='reklam' src={mygold}  />
      <img className='reklam' src={sargold}  />
      <img className='reklam' src={ddiamond}  />
      </div>
      </div>

      <div  className="card">
       <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} >     
           <h1>Tarih:</h1>
        <p>24 Temmuz Çarşamba</p>
        <img onClick={handleClick} src={rotate} alt="Açıklama" />
        </div>

        <table className="invoice-table">
        <thead>
          <tr>
            <th>Altın</th>
            <th>Alış</th>
            <th>Satış</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Dolar</th>
            <td className="box1">
        <RandomFractionBox initialNumber={33.00} />
      </td>
      <td className="box1">
        <RandomFractionBox initialNumber={33.00} />
      </td>
          </tr>
          <tr>
            <th>Euro</th>
            <td className="box1">
        <RandomFractionBox initialNumber={36.00} />
      </td>          
      <td className="box1">
        <RandomFractionBox initialNumber={36.00} />
      </td>        
        </tr>
          <tr>
            <th>Çeyrek Altın (Eski)</th>
            <td className="box1">
        <RandomFractionBox initialNumber={4200.00} />
      </td>         
      <td className="box1">
        <RandomFractionBox initialNumber={4235.00} />
      </td>       
         </tr>
          <tr>
            <th>Yarım Altın (Eski)</th>
            <td className="box1">
        <RandomFractionBox initialNumber={8480.00} />
      </td>          
      <td className="box1">
        <RandomFractionBox initialNumber={8500.00} />
      </td>       
          </tr>
          <tr>
            <th>Cumhuriyet Lira (Eski)</th>
            <td className="box1">
        <RandomFractionBox initialNumber={8800.00} />
      </td> 
      <td className="box1">
        <RandomFractionBox initialNumber={8780.00} />
      </td> 
          </tr>
          <tr>
            <th>Çeyrek Altın</th>
            <td className="box1">
        <RandomFractionBox initialNumber={4240.00} />
      </td>            
      <td className="box1">
        <RandomFractionBox initialNumber={4390.00} />
      </td> 
                </tr>
          <tr>
            <th>Gram Altın</th>
            <td className="box1">
        <RandomFractionBox initialNumber={2530.00} />
      </td> 
      <td className="box1">
        <RandomFractionBox initialNumber={2560.00} />
      </td>        
         </tr>
        </tbody>
      </table>
      </div>

    </ReactCardFlip>


      
      <div style={{display:'flex', alignItems:'center'}} >
      <div onClick={handleClickInsta} className='scaleUp' style={{display:'flex', margin:'5px', alignItems:'center',padding:5}} >
      <img src={instagram} alt="Açıklama" width={20} height={20} />
      <p style={{marginLeft:5}} >@karamanaltinfiyatlari</p>
      </div>
      <div onClick={handleClickFace} className='scaleUp' style={{display:'flex', margin:'5px', alignItems:'center', padding:5}} >

      <img  src={facebook} alt="Açıklama" width={20} height={20} />
      <p style={{marginLeft:5}} >Karaman Altın Fiyatları</p>

      </div>
      </div>
      
         </div>
  );
}

export default App;
