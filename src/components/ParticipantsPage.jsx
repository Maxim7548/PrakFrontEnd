import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ParticipantsPage = () => {
  const { eventId } = useParams(); 
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`https://event-gallery-backend.onrender.com/participants/${eventId}`, {
        credentials: 'include' 
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            setParticipants(data);
        }
      })
      .catch(err => console.error("Помилка завантаження учасників:", err));
  }, [eventId]);

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Учасники події</h2>
      <Link to="/">← На головну</Link>

      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Пошук учасників за ім'ям або email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {filteredParticipants.length > 0 ? (
            filteredParticipants.map(p => (
              <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', minWidth: '250px', backgroundColor: '#fff' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{p.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{p.email}</p>
              </div>
            ))
        ) : (
            <p>Ще немає учасників або нікого не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default ParticipantsPage;