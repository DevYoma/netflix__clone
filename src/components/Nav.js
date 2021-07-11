import React, { useEffect, useState } from 'react';
import '../styles/Nav.css'
import Netflix from '../assets/Netflix.png'
import netflixSmiling from '../assets/netflixSmiling.png'

const Nav = () => {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100){
                handleShow(true);
            }
            else handleShow(false)
        })
        return () => {
            window.removeEventListener('scroll')
        };
    }, [])
    return ( 
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" src={Netflix} alt="Netflix Logo" />
            <img src={netflixSmiling} alt="Netflix Smiling" className="nav__avatar" />
        </div>
     );
}
 
export default Nav;