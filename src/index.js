import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProjectsContextProvider from './context/ProjectsContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProjectsContextProvider>
      <Routes>
        <Route path='/' element={<App />}>

        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ProjectsContextProvider>
  </BrowserRouter>
);
