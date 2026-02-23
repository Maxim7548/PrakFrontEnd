import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchParticipants, 
  setSearchQuery, 
  selectFilteredParticipants,
  importExternalParticipants 
} from '../store/participantsSlice';


const ParticipantsPage = () => {
  const { eventId } = useParams(); 
  const dispatch = useDispatch();

  const event = useSelector((state) => 
    state.events.items.find(e => e.id === Number(eventId))
  );

  const { loading, error, searchQuery } = useSelector((state) => state.participants); 
  const participants = useSelector(selectFilteredParticipants);

  useEffect(() => {
    dispatch(fetchParticipants(eventId));
  }, [dispatch, eventId]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  if (!event) return <div className="container">Подію не знайдено</div>;

  return (
    <div className="container">
      <h1>Учасники події "{event.title}"</h1>
      <Link to="/" style={{display: 'inline-block', marginBottom: '20px'}}>← На головну</Link>
      
      <div style={{ marginBottom: '25px', display: 'flex', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Пошук учасників за ім'ям або email" 
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ maxWidth: '100%', marginTop: '0', flex: 1 }}
        />
        <button 
          className="submit-btn" 
          style={{ width: 'auto', padding: '0 20px', marginTop: '0', backgroundColor: '#0984e3' }}
          onClick={() => dispatch(importExternalParticipants())}
          disabled={loading}
        >
          Імпорт з API
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#10ac84' }}>⏳ Завантаження списку учасників...</h2>
          <p>Зачекайте, дані отримуються із сервера.</p>
        </div>
      )}

      {error && (
        <div style={{ background: '#ffcccc', padding: '20px', borderRadius: '8px', color: '#cc0000' }}>
          <h3>Сталася помилка</h3>
          <p>{error}</p>
          <button 
            className="submit-btn" 
            style={{ width: 'auto', padding: '10px 20px', marginTop: '10px' }}
            onClick={() => dispatch(fetchParticipants(eventId))}
          >
            Спробувати ще раз
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="participants-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
          {participants.length > 0 ? (
            participants.map((person) => (
              <div key={person.id} className="participant-card" style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: 'white'}}>
                <h4 style={{margin: '0 0 5px 0'}}>{person.name}</h4>
                <p style={{margin: 0, color: '#666', fontSize: '14px'}}>{person.email}</p>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#666' }}>
              За вашим запитом нікого не знайдено.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParticipantsPage;