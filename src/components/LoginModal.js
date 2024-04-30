import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginModal.css'

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>로그인이 필요한 페이지입니다.</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p>내 문제 관리하기와 내 시험지 관리하기 기능을 사용하려면 로그인이 필요합니다.</p>
        </div>
        <div className="modal-footer">
          <Link to='/users/login' className="modal-button">
            로그인하기
          </Link>
          <button className="modal-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
