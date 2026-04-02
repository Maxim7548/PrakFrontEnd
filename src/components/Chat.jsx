import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://event-gallery-backend.onrender.com', {
    withCredentials: true,
    transports: ['websocket', 'polling']
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
                time: new Date().toLocaleTimeString('uk-UA').slice(0, 5),
                id: Math.random().toString(36).substr(2, 9)
            };
            socket.emit('sendMessage', newMessage);
            setInput('');
        }
    };

    if (!isOpen) {
        return (
            <button style={styles.openChatBtn} onClick={() => setIsOpen(true)}>
                💬
            </button>
        );
    }

    return (
        <div style={styles.chatContainer}>
            <div style={styles.header}>
                <span style={{fontWeight: 'bold'}}>💬 Чат підтримки</span>
                {/* Кнопка закриття чату (хрестик) */}
                <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>✖</button>
            </div>
            
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
                <button type="submit" style={styles.sendBtn}>➤</button>
            </form>
        </div>
    );
};

const styles = {
    openChatBtn: {
        position: 'fixed', bottom: '20px', right: '20px',
        width: '60px', height: '60px', borderRadius: '50%',
        backgroundColor: '#007bff', color: 'white', fontSize: '24px',
        border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    chatContainer: { 
        position: 'fixed', bottom: '20px', right: '20px', width: '320px', 
        backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '12px', 
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)', zIndex: 1000, fontFamily: 'sans-serif',
        display: 'flex', flexDirection: 'column', overflow: 'hidden'
    },
    header: { 
        backgroundColor: '#007bff', color: 'white', padding: '12px 15px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px' 
    },
    closeBtn: {
        backgroundColor: 'transparent', color: 'white', border: 'none',
        fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
    },
    messagesArea: { 
        height: '300px', overflowY: 'auto', padding: '15px', display: 'flex', 
        flexDirection: 'column', gap: '10px', backgroundColor: '#f8f9fa' 
    },
    message: { 
        backgroundColor: '#e9ecef', padding: '10px 14px', borderRadius: '15px', 
        fontSize: '14px', width: 'fit-content', maxWidth: '85%', color: '#333'
    },
    time: { fontSize: '11px', color: '#888', marginRight: '8px' },
    inputArea: { 
        display: 'flex', padding: '12px', borderTop: '1px solid #eee', backgroundColor: 'white' 
    },
    input: { 
        flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #ccc', 
        marginRight: '10px', outline: 'none', fontSize: '14px' 
    },
    sendBtn: { 
        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#007bff', 
        color: 'white', border: 'none', cursor: 'pointer', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', fontSize: '16px' 
    }
};

export default Chat;