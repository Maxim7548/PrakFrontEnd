import React, { useState } from 'react';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', organizer: '', image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://event-gallery-backend.onrender.com/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Подію створено!');
        setFormData({ title: '', description: '', date: '', organizer: '', image: '' });
        window.location.reload();
      } else {
        alert('Помилка при створенні.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <h3>Створити нову подію</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Назва події" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Опис" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} placeholder="Організатор" required />
        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="URL картинки" required />
        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>➕ Додати</button>
      </form>
    </div>
  );
};

export default CreateEventForm;