import './navigation.css';

import { Link } from 'react-router-dom';


export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link to='/' className="nav-link">Home</Link>
                <Link to='/about' className="nav-link">About</Link>
                <Link to='/catalog' className="nav-link">Catalog</Link>
                <Link to='/contact' className="nav-link">Contact</Link>
            </div>
        </nav>
    )
}