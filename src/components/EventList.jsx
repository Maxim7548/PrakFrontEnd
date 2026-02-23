import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, registeredIds, toggleRegister }) => {
  if (events.length === 0) return <p className="empty">Нічого не знайдено.</p>;

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isRegistered={registeredIds.includes(event.id)}
          onToggleRegister={toggleRegister}
        />
      ))}
    </div>
  );
};

export default EventList;