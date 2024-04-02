import React, { useState } from 'react';
import Navigate from './Navigate';
import '../css/NavigationBar.css'; // 스타일 파일 import

export default function NavigationBar(){

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return(
        <div className={`navigation-bar ${isVisible ? 'visible' : 'hidden'}`}>
            <button onClick={toggleVisibility}>{isVisible ? 'X' : '=>'}</button>
            <div className="navigation-content">
                {/* <button>로그인</button>
                <button>회원가입</button> */}
                <Navigate />
            </div>
        </div>
    );
}
