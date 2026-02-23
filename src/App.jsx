import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        registeredCount={0} 
      />
      
      <main className="container">
        <Outlet context={{ searchQuery }} />
      </main>
    </div>
  );
}

export default App;