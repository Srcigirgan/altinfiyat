import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    try {
      console.log('Sending login request');
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response received:', response);

      if (!response.ok) {
        if (response.status === 401) {
          console.log('Invalid username or password');
          throw new Error('Geçersiz kullanıcı adı veya şifre');
        }
        console.log('Login failed');
        throw new Error('Giriş başarısız');
      }

      const data = await response.json();
      console.log('Login successful, received data:', data);

      localStorage.setItem('token', data.token); // Token'ı localStorage'a kaydet
      console.log('Token saved to localStorage');

      navigate('/admin', { replace: true }); // Giriş başarılıysa admin sayfasına yönlendir
      console.log('Navigating to admin page');
    } catch (error) {
      console.log('Error occurred:', error.message);
      setError(error.message);
    }
  };

  const vazgec = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="image-list-container">
      <h2>Erişim için lütfen giriş yapınız</h2>
      <div className="login-card">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
          />
          <div style={{ display: 'flex' }}>
            <button style={{ margin: '5px' }} type="submit">Giriş Yap</button>
            <button className='buttonVazgec' style={{ margin: '5px' }} onClick={vazgec}>Anasayfa</button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
