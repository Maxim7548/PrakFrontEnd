import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import EventList from './EventList';

const HomePage = () => {
  const { searchQuery } = useOutletContext();

  const events = useSelector((state) => state.events.items);
  const registeredIds = useSelector((state) => state.events.registeredIds);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <EventList 
        events={filteredEvents} 
        registeredIds={registeredIds}
        toggleRegister={() => {}} 
      />
    </>
  );
};

export default HomePage;