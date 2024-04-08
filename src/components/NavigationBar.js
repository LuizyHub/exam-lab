import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigate from './Navigate';
import '../css/NavigationBar.css'; 

const domain = "https://exam-lab.store";

export default function NavigationBar(){

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return(
        <div className={`navigation-bar ${isVisible ? 'visible' : 'hidden'}`}>
            <img src="/img/examLab_logo.png" alt="logo" style={{width:"60%", padding:"30px"}}/>
            <button className="close-button" onClick={toggleVisibility}>{isVisible ? 'X' : '=>'}</button>
            <div className="navigation-content">
                <Navigate />
            </div>
            <nav>
            <button className="login-button">
                    <a href={`${domain}/users/login`} style={{ textDecoration: 'none', color: 'inherit' }}>로그인</a>
                </button>
                <button className="signup-button">
                    <a href={`${domain}/users/add`} style={{ textDecoration: 'none', color: 'inherit' }}>회원가입</a>
                </button>
            </nav>
        </div>
    );
}
