import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'https://event-gallery-backend.onrender.com/login' : 'https://event-gallery-backend.onrender.com/register';
        
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role: 'organizer' }),
                credentials: 'include' 
            });

            const data = await res.json();
            
            if (res.ok) {
                alert(data.message);
                
                if (data.user && data.user.role) {
                    localStorage.setItem('userRole', data.user.role);
                } else if (!isLogin) {
                    localStorage.setItem('userRole', 'organizer'); 
                }

                if (isLogin) navigate('/'); 
                else setIsLogin(true); 
            } else {
                alert(data.message || 'Помилка');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
            <Link to="/">← На головну</Link>
            <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Вхід для організаторів' : 'Реєстрація організатора'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#007bff' }} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Немає акаунту? Зареєструйтесь' : 'Вже є акаунт? Увійдіть'}
            </p>
        </div>
    );
};

export default AuthPage;