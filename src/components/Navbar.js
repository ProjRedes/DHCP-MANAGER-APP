import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>DHCP Manager</h2>
      <ul>
        <li><Link to="/">Hosts</Link></li>
        <li><Link to="/cadastro">Cadastrar Host</Link></li>
        <li><Link to="/vlan">VLANs</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
