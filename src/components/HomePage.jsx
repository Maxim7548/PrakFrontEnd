import React, { useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchEvents } from '../store/eventsSlice';
import EventList from './EventList';
import CreateEventForm from './CreateEventForm';

const HomePage = () => {
  const { searchQuery } = useOutletContext();
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.items);
  const registeredIds = useSelector((state) => state.events.registeredIds);
  const status = useSelector((state) => state.events.status);
  const hasMore = useSelector((state) => state.events.hasMore);
  
  const user = useSelector((state) => state.auth?.user || state.user?.user); 
  const isAdmin = user && (user.role === 'admin' || user.role === 'organizer');

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const loadMoreEvents = useCallback(() => {
    if (status === 'loading' || !hasMore || events.length === 0) return;
    const lastEventId = events[events.length - 1]._id; 
    dispatch(fetchEvents(lastEventId));
  }, [events, status, hasMore, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 10;
      if (isBottom) loadMoreEvents();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreEvents]);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isAdmin && <CreateEventForm />}

      <EventList 
        events={filteredEvents} 
        registeredIds={registeredIds}
        toggleRegister={() => {}} 
        isAdmin={isAdmin} 
      />
      {status === 'loading' && <p style={{textAlign: 'center', margin: '20px'}}>Завантажуємо події...</p>}
    </>
  );
};

export default HomePage;