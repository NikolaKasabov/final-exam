import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProjectsContextProvider from './context/ProjectsContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonProjectsList from './components/CommonProjectsList/CommonProjectsList';
import FilteredCommonProjectsList from './components/FilteredCommonProjectsList/FilteredCommonProjectsList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProjectsContextProvider>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<CommonProjectsList />} />
          <Route path='/filtered/:id' element={<FilteredCommonProjectsList />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ProjectsContextProvider>
  </BrowserRouter>
);
