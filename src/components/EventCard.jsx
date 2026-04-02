import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin' || userRole === 'organizer';

  const handleDelete = async () => {
    const isConfirmed = window.confirm(`Видалити подію "${event.title}"?`);
    
    if (isConfirmed) {
      try {
        const response = await fetch(`https://event-gallery-backend.onrender.com/events/${event._id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          alert('Видалено успішно!');
          window.location.reload();
        } else {
          alert('Помилка при видаленні.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <h3>{event.title}</h3>
        <p>📅 {event.date} | 👤 {event.organizer}</p>
        <p>{event.description}</p>

        <div className="card-actions">
          <Link to={`/register/${event._id}`} className="register-btn">Зареєструватися</Link>
          <Link to={`/participants/${event._id}`} className="view-btn">Учасники</Link>
          
          {isAdmin && (
            <button 
              onClick={handleDelete} 
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
            >
              Видалити
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;