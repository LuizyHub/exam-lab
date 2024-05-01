
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Bottom from '../components/Bottom';
import './MainPage.css'
import axios from 'axios';
import { getLoginInfo } from '../function/LoginState';


export default function MainPage(){
  

    return(
        <div className="main-page">

            <div className="page-content" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '400px', background: 'linear-gradient(102.06deg, #E0F9F8 12.5%, #E2E6FA 98.35%)', top: 0, left: 0 }}>
                    <div style={{ paddingLeft: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ position: 'relative' }}>쉽고 빠르게 나만의 시험지 만들기</h3>
                    <img src="/img/examLab_logo.png" alt="logo" style={{ width: '200px', position: 'relative', marginRight: '20px' }} />
                    </div>
                    <div style={{ paddingRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/img/mainImage.png" alt="Main Image" style={{ width: '500px', position: 'relative' }} />
                    </div>
                </div>
            </div>


            
                <nav>
                    <button className='sample-navigate-button'>
                        <Link to='/exams' style={{ textDecoration: 'none', color: 'inherit' }}>나만의 시험지 제작하기</Link>
                    </button>
                    <button className='myExam-navigate-button'>
                        <Link to='/exams' style={{ textDecoration: 'none', color: 'inherit' }}>내 문제 관리하기</Link>
                    </button>
                    <button className='sample-navigate-button'>
                        <Link to='/workbooks' style={{ textDecoration: 'none', color: 'inherit' }}>내 시험지 관리하기</Link>
                    </button>

                </nav>

                
            <footer>
                <Bottom />
            </footer>
            <NavigationBar />
        </div>
    );
}

