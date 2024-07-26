import React, { useState, useEffect } from 'react';
import './AdminEntry.css';
import karamanAltin from '../assets/karamanAltin.png'


export const AdminEntry = () =>  {

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
  };
  
  return (
    <div className="App">
      
            <img className='logo' src={karamanAltin} alt="Açıklama" />
<h1 style={{marginBottom:'15px'}} >ADMİN GİRİŞ PANELİ</h1>
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
):(
   
   <div className="card">
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
      </td>
      <td className="box1">
      </td>
          </tr>
          <tr>
            <th>Ata Lira</th>
            <td className="box1">
      </td>          
      <td className="box1">
      </td>        
        </tr>
          <tr>
            <th>Hamit Lira</th>
            <td className="box1">
      </td>         
      <td className="box1">
      </td>       
         </tr>
          <tr>
            <th>Cumhuriyet Lira</th>
            <td className="box1">
      </td>          
      <td className="box1">
      </td>       
          </tr>
          <tr>
            <th>Dolar</th>
            <td className="box1">
      </td> 
      <td className="box1">
      </td> 
          </tr>
          <tr>
            <th>Euro</th>
            <td className="box1">
      </td> 
      <td className="box1">
      </td> 
          </tr>
          <tr>
            <th>Parite</th>
            <td className="box1">
      </td> 
      <td className="box1">
      </td> 
          </tr>
          <tr>
            <th>Yarım Altın</th>
            <td className="box1">
      </td> 
      <td className="box1">
      </td> 
          </tr>
          <tr>
            <th>Çeyrek Altın</th>
            <td className="box1">
      </td>            
      <td className="box1">
      </td> 
                </tr>
          <tr>
            <th>Gram Altın</th>
            <td className="box1">
      </td> 
      <td className="box1">
      </td>        
         </tr>
        </tbody>
      </table>        
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} >
        <button  style={{backgroundColor:'red'}} onClick={handleLogout}>Çıkış Yap</button>     
        <button style={{backgroundColor:'green'}} >Güncelle</button>     
        </div>
        
        </div>
    
   
)}
         </div>
  );
}

