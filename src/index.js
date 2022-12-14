import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WorkspaceContent from './components/WorkspaceContent';

const root = ReactDOM.createRoot(document.getElementById('root'));
if(process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start();
}
root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='workspace/:id' element={<WorkspaceContent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
