import React from 'react';
// import BlogCard from './components/BlogCard';

import Header from './components/Header';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Header />
      <main className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
