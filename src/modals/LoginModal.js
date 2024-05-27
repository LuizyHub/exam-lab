import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 707px;
  z-index: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 26px;
  flex-grow: 1;
`;

const CloseButton = styled.span`
  font-size: 34px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 16px;
  text-align: center;
  hr {
    border: 0;
    height: 1px;
    background-color: #EBEDEF;
  }
`;

const ModalText = styled.p`
  font-size: 21px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const LoginA = styled.a`
  background-color: #5BB6B4;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 15px;
  width: 140px;
  height: 51px;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: flex;
  justify-content: center; 
  align-items: center; 
  text-align: center; 
`;


const LoginModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>로그인이 필요한 페이지입니다.</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <hr />
          <ModalText>문제 관리소와 시험지 저장소 페이지를 이용하시려면 로그인이 필요합니다.</ModalText>
        </ModalBody>
        <ModalFooter>
          <LoginA href='/users/login'>로그인</LoginA>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
