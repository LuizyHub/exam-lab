import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { getLoginInfo } from '../function/LoginState';
import '../css/Navigate.css'

export default function Navigate() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = async (path) => {
    try {
      const { loginStatus } = await getLoginInfo();
      if (loginStatus) {
        navigate(path);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Failed to retrieve login information', error);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-item">
        <img src="/img/시험지샘플.png" alt="Main Image" className="nav-icon" />
        <Link to="/exams" className="nav-link" style={{textDecorationLine: "none"}}>
          나만의 시험지 제작하기
        </Link>
      </div>
      <div className="nav-item">
        <button className="nav-link" onClick={() => handleNavigate('/exams')}>
        <img src="/img/시험지제작.png" alt="Main Image" className="nav-icon" />
          내 문제 관리하기
        </button>
      </div>
      <div className="nav-item">
        <img src="/img/시험지제작.png" alt="Main Image" className="nav-icon" />
        <button className="nav-link" onClick={() => handleNavigate('/workbooks')}>
          내 시험지 관리하기
        </button>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}
