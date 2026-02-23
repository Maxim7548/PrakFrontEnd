import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { z } from 'zod'; 
import { useDispatch, useSelector } from 'react-redux';
import { registerForEvent } from '../store/eventsSlice';

const registrationSchema = z.object({
  fullName: z.string().min(3, "ПІБ має містити мінімум 3 символи"),
  email: z.string().email("Введіть коректну email адресу"),
  birthDate: z.string()
  .regex(/^\d{2}\.\d{2}\.\d{4}$/, "Формат: ДД.ММ.РРРР")
  .refine((val) => {
    const [day, month, year] = val.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date(); 
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18; 
  }, "Реєстрація від 18 років"),
  
  source: z.enum(["social", "friends", "found_myself"], {
    errorMap: () => ({ message: "Оберіть звідки ви дізналися про подію" })
  })
});

const RegisterPage = () => {  
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  const event = useSelector((state) => 
    state.events.items.find((e) => e.id === Number(eventId))
  );

  const [errors, setErrors] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  if (!event) return <div className="container">Подію не знайдено</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); 

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const result = registrationSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, eventId }) 
      });

      dispatch(registerForEvent(Number(eventId))); 

      alert("Реєстрація успішна!");
      navigate('/');
    } catch {
      alert("Сталася помилка при відправці");
    } finally {
      setIsSubmitting(false);
    }
  }; 

  return (
    <div className="form-container">
      <Link to="/" style={{ display: 'inline-block', marginBottom: '15px', color: '#555' }}>
        ← На головну
      </Link>
      <h2>Реєстрація: {event.title}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ПІБ:</label>
          <input name="fullName" type="text" className="form-input" required />
          {errors.fullName && <div style={{color: 'red', fontSize: '12px'}}>{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input name="email" type="email" className="form-input" required />
          {errors.email && <div style={{color: 'red', fontSize: '12px'}}>{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Дата народження (ДД.ММ.РРРР):</label>
          <input 
          name="birthDate" 
          type="text" 
          className="form-input" 
           placeholder="01.02.2000" 
          required
         />
         {errors.birthDate && <div style={{color: 'red', fontSize: '12px'}}>{errors.birthDate}</div>}
        </div>

        <div className="form-group">
          <label>Звідки дізналися?</label>
          <div className="radio-group">
            <label className="radio-label"><input type="radio" name="source" value="social" /> Соцмережі</label>
            <label className="radio-label"><input type="radio" name="source" value="friends" /> Друзі</label>
            <label className="radio-label"><input type="radio" name="source" value="found_myself" /> Сам</label>
          </div>
          {errors.source && <div style={{color: 'red', fontSize: '12px'}}>{errors.source}</div>}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Відправка' : 'Зареєструватися'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;