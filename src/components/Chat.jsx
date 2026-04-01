import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://event-gallery-backend.onrender.com', {
    withCredentials: true
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chatHistory', (historyData) => {
            setMessages(historyData);
        });

        socket.on('receiveMessage', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off('chatHistory');
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newMessage = {
                text: input,
                time: new Date().toLocaleTimeString().slice(0, 5),
                id: Math.random().toString(36).substr(2, 9)
            };
            socket.emit('sendMessage', newMessage);
            setInput('');
        }
    };

    return (
        <div style={styles.chatContainer}>
            <h3 style={styles.header}>💬 Чат підтримки</h3>
            <div style={styles.messagesArea}>
                {messages.length === 0 ? (
                    <p style={{textAlign: 'center', color: '#888', fontSize: '14px'}}>Немає повідомлень. Напишіть першим!</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} style={styles.message}>
                            <span style={styles.time}>[{msg.time}]</span> {msg.text}
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={sendMessage} style={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ваше повідомлення..."
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>➤</button>
            </form>
        </div>
    );
};

const styles = {
    chatContainer: { position: 'fixed', bottom: '20px', right: '20px', width: '300px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', zIndex: 1000, fontFamily: 'sans-serif' },
    header: { backgroundColor: '#007bff', color: 'white', margin: 0, padding: '12px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', fontSize: '16px', textAlign: 'center' },
    messagesArea: { height: '250px', overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f9f9f9' },
    message: { backgroundColor: '#e9ecef', padding: '8px 12px', borderRadius: '15px', fontSize: '14px', width: 'fit-content', maxWidth: '80%' },
    time: { fontSize: '11px', color: '#666', marginRight: '6px' },
    inputArea: { display: 'flex', padding: '10px', borderTop: '1px solid #ddd', backgroundColor: 'white', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' },
    input: { flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #ccc', marginRight: '8px', outline: 'none' },
    button: { padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Chat;