import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { Link } from 'react-router-dom'; 

const Header = ({ searchQuery, setSearchQuery }) => {
  const registeredIds = useSelector((state) => state.events.registeredIds);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const headerStyle = {
    backgroundColor: theme === 'light' ? '#2d3436' : '#000000',
    transition: 'background-color 0.3s',
    position: 'relative' 
  };

  return (
    <header className="header" style={headerStyle}>
      <button 
        onClick={() => dispatch(toggleTheme())}
        className={`theme-toggle-btn ${theme === 'light' ? 'light-mode' : 'dark-mode'}`}
      >
        {theme === 'light' ? 'Темна' : 'Світла'}
      </button>

      <h1>Галерея Сучасного Мистецтва</h1>
      <p>Знайди подію та зареєструйся</p>
      
      <div>
        <input
          type="text"
          placeholder="Пошук подій..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="status-badge" style={{ marginTop: '15px', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <span>Ваші реєстрації: {registeredIds.length}</span>
        
        <Link to="/analytics" style={{ color: '#10ac84', fontWeight: 'bold', textDecoration: 'none', background: 'white', padding: '5px 15px', borderRadius: '20px' }}>
          Аналітика
        </Link>
      </div>
    </header>
  );
};

export default Header;