import React, { useState } from 'react';
import Navigate from './Navigate';
import '../css/NavigationBar.css'; 


export default function NavigationBar({ userName, login }){

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
            {/* 로그인 상태에 따른 조건부 렌더링 */}
            {login == true ? (
                <>
                    <button className='user-lab'>
                      <p>{userName}님의 연구소</p>
                    </button>
                    <button className="login-button">
                        <a href={`/users/logout`} style={{ textDecoration: 'none', color: 'inherit' }}>로그아웃</a>
                    </button>
                </>
            ) : (
                <>
                    <button className="login-button">
                        <a href={`/users/login`} style={{ textDecoration: 'none', color: 'inherit' }}>로그인</a>
                    </button>
                    <button className="signup-button">
                        <a href={`/users/add`} style={{ textDecoration: 'none', color: 'inherit' }}>회원가입</a>
                    </button>
                </>
            )}
            <nav>
                
            </nav>
        </div>
    );
}
