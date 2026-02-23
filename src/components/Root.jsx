import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Root = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        registeredCount={0} // Поки що 0, логіку лічильника оновимо пізніше
      />
      
      <main className="container">
        <Outlet context={{ searchQuery }} />
      </main>
    </div>
  );
};

export default Root;