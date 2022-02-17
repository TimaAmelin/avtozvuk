import React from 'react';
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
    const navStyle = {
        backgroundColor : '#ed0000'
    }


    return(
        <nav className="navbar navbar-dark navbar-expand-lg" style={navStyle}>
            <div className="navbar-brand">
                <h3 className = "logo">СТОК АВТО</h3>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link"to="/" exact>
                        Главная 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/catalog">
                        Каталог 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link"to="/wishlist">
                        Избранное 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link"to="/account">
                        Личный кабинет 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link"to="/contacts">
                        Контакты 
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}