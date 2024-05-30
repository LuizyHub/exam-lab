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
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 26px;
  flex-grow: 1;
`;

const ModalBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.span`
  font-size: 34px;
  cursor: pointer;
  right: 0px;
`;

const PageIcon = styled.img`
  width: 58px;
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const CreateCompleteModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
            <ModalBody>
                <PageIcon src="/img/문제관리소_colorIcon.svg" alt="page Icon" />
                <ModalTitle>문제가 저장되었습니다.</ModalTitle>
            </ModalBody>
        </ModalHeader>
      </ModalContent>
    </ModalOverlay>
  );
};
