import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagementPage.css'; // Import the CSS file
import karamanAltin from '../assets/karamanAltin.png';
import { useNavigate } from 'react-router-dom';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [addUsername, setAddUsername] = useState('');
  const [addPassword, setAddPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setNewUsername(user.username);
    setNewPassword(''); // Clear password field for editing
  };

  const geriGit = () => {
    navigate('/admin');
};
const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleAddUsernameChange = (e) => {
    setAddUsername(e.target.value);
  };

  const handleAddPasswordChange = (e) => {
    setAddPassword(e.target.value);
  };

  const vazgec = () => {
    navigate('/', { replace: true });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/users/${selectedUser.username}`, {
        newUsername,
        password: newPassword,
      });
      alert('Kullanıcı başarıyla güncellendi');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Hata: Kullanıcı güncellenirken bir sorun oluştu');
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Bu işlem geri alınamaz. Emin misiniz?')) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/users/${selectedUser.username}`);
        alert('Kullanıcı başarıyla silindi');
        fetchUsers();
        setSelectedUser(null);
        setNewUsername('');
        setNewPassword('');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Hata: Kullanıcı silinirken bir sorun oluştu');
      }
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users', {
        username: addUsername,
        password: addPassword,
      });
      alert('Kullanıcı başarıyla eklendi');
      fetchUsers();
      setAddUsername('');
      setAddPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Hata: Kullanıcı eklenirken bir sorun oluştu');
    }
  };

  return (
    <div className="UserManagementPage">
      <img onClick={vazgec} className="logo" src={karamanAltin} alt="Logo" />
      <div className="card">
        <h1>Kullanıcı Seçenekleri</h1>
        <div className="user-list">
          <h2>Kayıtlı Kullanıcılar</h2>
          <ul>
            {users.map((user) => (
              <li key={user.username} onClick={() => handleUserClick(user)}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        {selectedUser && (
          <div className="edit-user">
            <h2>Seçili kullanıcıyı düzenle</h2>
            <label>
              Yeni Kullanıcı Adı:
              <input type="text" value={newUsername} onChange={handleUsernameChange} />
            </label>
            <label>
              Yeni Şifre:
              <input type="password" value={newPassword} onChange={handlePasswordChange} />
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={{ backgroundColor: 'green' }} onClick={handleUpdateUser}>Kullanıcıyı Güncelle</button>
              <button onClick={handleDeleteUser}>Kullanıcıyı Sil</button>
            </div>
          </div>
        )}
        <div className="add-user">
          <h2>Yeni Kullanıcı Ekle</h2>
          <label>
            Kullanıcı Adı Oluşturun:
            <input type="text" value={addUsername} onChange={handleAddUsernameChange} />
          </label>
          <label>
            Şifre Oluşturun:
            <input type="password" value={addPassword} onChange={handleAddPasswordChange} />
          </label>
          <div style={{display:'flex', justifyContent:'space-between'}} >
          <button style={{ backgroundColor: 'green' }} onClick={handleAddUser}>Kullanıcıyı Ekle</button>
          <button style={{ backgroundColor: 'red' }} onClick={geriGit}>Geri Dön</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
