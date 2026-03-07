import { useState, useEffect } from 'react';
import { api, type User } from '../api';
import { useAuth } from '../hooks/useAuth';
import Header from './Header';
import './Profile.css';

export default function Profile() {
  const { userId, username, isChecking } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Szerkesztési állapotok
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    name: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        setLoading(true);
        try {
          console.log('Fetching user data for ID:', userId);
          const userData = await api.getUser(userId);
          console.log('User data received:', userData);
          
          if (userData) {
            setUser(userData);
            setFormData({
              name: userData.name || '',
              email: userData.email || '',
              password: '',
              oldPassword: '',
            });
            setError(null);
          } else {
            setError('Üres válasz érkezett a szervertől.');
          }
        } catch (err) {
          setError('Nem sikerült betölteni a profil adatokat. Ellenőrizze a szerver kapcsolatot!');
          console.error('Profile fetch error:', err);
        } finally {
          setLoading(false);
        }
      } else if (!isChecking) {
        setLoading(false);
      }
    };

    if (!isChecking) {
      fetchUserData();
    }
  }, [userId, isChecking]);

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field: string) => {
    if (!userId) return;
    
    try {
      const updateData: Partial<User> & { oldPassword?: string } = {};
      if (field === 'name') updateData.name = formData.name;
      if (field === 'email') updateData.email = formData.email;
      if (field === 'password') {
        if (!formData.password) {
          setIsEditing({ ...isEditing, [field]: false });
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Az új jelszavak nem egyeznek!');
          return;
        }
        if (!formData.oldPassword) {
          setError('A jelszó módosításához meg kell adnia a régi jelszót!');
          return;
        }
        updateData.password = formData.password;
        updateData.oldPassword = formData.oldPassword;
      }

      await api.updateUser(userId, updateData);
      
      if (user) {
        setUser({ ...user, ...updateData });
      }
      
      setIsEditing({ ...isEditing, [field]: false });
      setSuccess('Adatok sikeresen frissítve!');
      setTimeout(() => setSuccess(null), 3000);
      
      if (field === 'password') setFormData({ ...formData, password: '', oldPassword: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hiba történt a mentés során.');
      setTimeout(() => setError(null), 5000);
    }
  };

  if (isChecking || (loading && userId && !user)) {
    return (
      <div className="profile-page">
        <Header title="Profilom" />
        <div className="profile-container">
          <div className="loading-container">
            <div className="loader"></div>
            <p>Profil adatok betöltése...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="profile-page">
        <Header title="Profilom" />
        <div className="profile-container">
          <div className="error-card">
            <h3>Nincs bejelentkezve</h3>
            <p>Kérjük, jelentkezzen be a profilja megtekintéséhez!</p>
            <button className="login-redirect-btn" onClick={() => window.location.href = '/bejelentkezes'}>
              Bejelentkezés
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="profile-page">
        <Header title="Profilom" />
        <div className="profile-container">
          <div className="error-card">
            <h3>Hiba történt</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Próbálja újra
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page animate-fade-in">
      <Header title="Profilom" />
      <div className="profile-container">
        <div className="profile-card animate-scale-in">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <h2>Személyes adatok</h2>
          </div>

          <div className="profile-content">
            {success && <div className="success-toast">{success}</div>}
            {error && <div className="error-toast">{error}</div>}

            <div className="profile-item">
              <label>Felhasználónév</label>
              <div className="profile-row">
                {isEditing.name ? (
                  <div className="edit-group">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      autoFocus
                    />
                    <button className="save-btn" onClick={() => handleSave('name')}>Mentés</button>
                  </div>
                ) : (
                  <>
                    <div className="profile-value">{user?.name || 'Nincs megadva'}</div>
                    <button className="edit-icon-btn" onClick={() => handleEdit('name')} title="Szerkesztés">✏️</button>
                  </>
                )}
              </div>
            </div>

            <div className="profile-item">
              <label>Email cím</label>
              <div className="profile-row">
                <div className="profile-value">{user?.email || 'Nincs megadva'}</div>
              </div>
              <small className="info-hint">Az e-mail cím biztonsági okokból nem módosítható</small>
            </div>

            <div className="profile-item">
              <label>Jelszó</label>
              <div className="profile-row">
                {isEditing.password ? (
                  <div className="edit-group vertical">
                    <input 
                      type="password" 
                      name="oldPassword" 
                      placeholder="Régi jelszó"
                      value={formData.oldPassword} 
                      onChange={handleChange}
                      autoFocus
                    />
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Új jelszó"
                      value={formData.password} 
                      onChange={handleChange}
                    />
                    <input 
                      type="password" 
                      name="confirmPassword" 
                      placeholder="Új jelszó megerősítése"
                      value={formData.confirmPassword} 
                      onChange={handleChange}
                    />
                    <div className="forgot-password-link" style={{textAlign: 'left', marginBottom: '10px'}}>
                      <a href="#" style={{color: 'palevioletred', fontSize: '13px', textDecoration: 'none'}} onClick={(e) => { 
                        e.preventDefault(); 
                        window.dispatchEvent(new CustomEvent('open-forgot-password'));
                      }}>Elfelejtetted a jelszavad?</a>
                    </div>
                    <div className="edit-actions">
                      <button className="save-btn" onClick={() => handleSave('password')}>Mentés</button>
                      <button className="cancel-btn" onClick={() => setIsEditing({...isEditing, password: false})}>Mégse</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="profile-value">********</div>
                    <button className="edit-icon-btn" onClick={() => handleEdit('password')} title="Szerkesztés">✏️</button>
                  </>
                )}
              </div>
              {!isEditing.password && <small className="password-hint">A jelszó biztonsági okokból rejtett</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}