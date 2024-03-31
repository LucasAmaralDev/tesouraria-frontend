import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/userContext';
import AddTransaction from './pages/AddTransaction';
import Relatorios from './pages/relatorios/Relatorios';
import Login from './pages/Login';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/financeiro/nova-transacao" element={<AddTransaction />} />
          <Route exact path="/financeiro/relatorios" element={<Relatorios />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
