import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import PaginationComponent from './components/Produscts';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/page/:pageNumber" element={<PaginationComponent />} />
        <Route path="/" element={<PaginationComponent />} />
      </Routes>
    </>
  );
};

export default App;
