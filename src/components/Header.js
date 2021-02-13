import React, { useState, useContext } from 'react';
import ThemeContext from './Context/ThemeContext';

const Header = () => {

    const color = useContext(ThemeContext);

    const [darkMode, setDarkMode] = useState(false);
    const back = document.querySelector("body");

    const handleClick = () => {
        setDarkMode(!darkMode);
    }
    
    function dM () {
        back.style.backgroundColor = "black"
        back.style.color = "white"
        return (
            <h5>Press for Light Mode</h5>
        )
    }
    function lM () {
        back.style.backgroundColor = "white"
        back.style.color = "black"
        return (
            <h5>Press for Dark Mode</h5>
        )
    }
    return (
        <>
        <h1 style={{ color }}>API With React</h1>
        <button type="button" onClick={ handleClick } className="Mode">
            { darkMode ? lM() : dM() }
        </button>
        </>
    )
};


export default Header