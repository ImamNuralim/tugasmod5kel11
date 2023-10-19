// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Halaman Utama</Link>
        </li>
        <li>
          <Link to="/countries">Data Negara</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;