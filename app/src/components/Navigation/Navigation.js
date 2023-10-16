import { useContext, useState } from 'react';
import './navigation.css';

import { Link } from 'react-router-dom';
import { context } from '../../context/context';


export default function Navigation() {


    const [toggleMenu, setToggleMenu] = useState(false);


    const toggleNavMenu = () => {
        setToggleMenu(!toggleMenu);
    }
    return (
        <>
            <nav className="navigation">
                <div className="nav-container">
                    <Link to='/' className="nav-link">Home</Link>
                    <Link to='/about' className="nav-link">About</Link>
                    <Link to='/catalog' className="nav-link">Catalog</Link>
                    <Link to='/contact' className="nav-link">Contact</Link>
                </div>
            </nav>

            <nav className={toggleMenu ? "navigation-mobile open" : "navigation-mobile"}>
                <div className={toggleMenu ? "nav-container-mobile nav-menu" : "nav-container-mobile"}>
                    <Link to='/' className="nav-link" onClick={toggleNavMenu}>Home</Link>
                    <Link to='/about' className="nav-link" onClick={toggleNavMenu}>About</Link>
                    <Link to='/catalog' className="nav-link" onClick={toggleNavMenu}>Catalog</Link>
                    <Link to='/contact' className="nav-link" onClick={toggleNavMenu}>Contact</Link>

                </div>
                {toggleMenu
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="nav-icon" viewBox="0 0 16 16" onClick={toggleNavMenu}>
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="nav-icon" viewBox="0 0 16 16" onClick={toggleNavMenu}>
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                }
            </nav>

        </>
    )
}