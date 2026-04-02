import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <h3>{event.title}</h3>
        <p>📅 {event.date} | 👤 {event.organizer}</p>
        <p>{event.description}</p>

        <div className="card-actions">
          <Link to={`/register/${event._id}`} className="register-btn">
            Зареєструватися
          </Link>
          
          <Link to={`/participants/${event._id}`} className="view-btn">
            Учасники
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;