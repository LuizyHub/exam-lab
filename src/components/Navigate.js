import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { getLoginInfo } from '../function/LoginState';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
  padding: 10px 0px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
  font-size: 14px;
  transition: height 0.3s ease;
  &:hover {
    background-color: #ECF7F7;
    height: 40px;
  }
`;

const NavButton = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  textDecorationLine: none;
`;

const NavIcon = styled.img`
  width: 20px;
  margin-right: 8px;
  margin-left: 30px
`;

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
    <NavigationContainer>
      <NavItem>
        <NavIcon src="/img/나만의 시험지.png" alt="Main Image" />
        <Link to='/exams/create' style={{color: 'black', textDecorationLine:'none'}}>나만의 시험지</Link>
      </NavItem>
      <NavItem>
          <NavIcon src="/img/나만의 문제.png" alt="Main Image" />
          <NavButton onClick={() => handleNavigate('/exams')}> 나만의 문제 </NavButton>
      </NavItem>
      <NavItem>
        <NavIcon src="/img/시험지저장소.png" alt="Main Image" />
        <NavButton onClick={() => handleNavigate('/workbooks')}> 시험지 저장소 </NavButton>
      </NavItem>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </NavigationContainer>
  );
}
