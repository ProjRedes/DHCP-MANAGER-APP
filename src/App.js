import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hosts from './pages/Hosts';
import CadastroHost from './pages/CadastroHost';
import VLANManager from './pages/VLANManager';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hosts />} />
        <Route path="/cadastro" element={<CadastroHost />} />
        <Route path="/vlan" element={<VLANManager />} />
      </Routes>
    </Router>
  );
}

export default App;
