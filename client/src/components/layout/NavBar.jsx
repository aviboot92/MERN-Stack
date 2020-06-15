import React from 'react';
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"/> DevConnector</Link>
      </h1>
      <ul>
        <Link to="/profiles">Developers </Link>
        <Link to="/register">Register </Link>
        <Link to="/login">Login</Link>
      </ul>
    </nav>
    )
}
