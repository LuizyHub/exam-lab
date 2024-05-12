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
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  text-align: center;
`;

const CloseButton = styled.span`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 16px;
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalButton = styled.button`
  background-color: ${props => props.primary ? '#5BB6B4' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'black'};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.primary ? '#ECF7F7' : 'rgba(0, 0, 0, 0.1)'};
  }
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
          <p>나만의 문제와 시험지 저장소 페이지를 이용하시려면 <br/> 로그인이 필요합니다.</p>
        </ModalBody>
        <ModalFooter>
          <a href='/users/login' style={{color: "black",textDecorationLine: "none"}}>로그인</a>
          <ModalButton onClick={onClose}>취소</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
