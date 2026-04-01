import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Header';
import Chat from './Chat'; 
import '../App.css';

function Root() {
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
      
      <Chat />
    </div>
  );
}

export default Root;