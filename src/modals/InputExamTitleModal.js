import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DeleteConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;  
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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

const InputExamTitle = styled.input`
  width: 95%;
  height: 30px;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.48px;
  text-align: left;
  margin-top: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 10px;
  background-color: #F5F5F7;
  &::placeholder {
    color: #999; 
    font-weight: 400;
  }
`;

const CloseButton = styled.span`
  font-size: 34px;
  cursor: pointer;
`;

const ModalBody = styled.div`
    margin-bottom: 0px;
    text-align: center;
    hr {
    border: 0;
    height: 1px;
    background-color: #EBEDEF;
    }
`;

const ContainerTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-left: 14px;
    margin-top: 30px;
    margin-bottom: 0px;
`;

const ModalButton = styled.button`
    width: 140px;
    height: 51px;    
    background-color: #29B8B5;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 10px;

    margin-top: 15px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
`;

export const InputExamTitleModal = ({ onClose }) => {
    const [examTitle, setExamTitle] = useState("");
    const [examId, setExamId] = useState('');

    const navigate = useNavigate();

    const handleExamDataSubmit = () => {
        const data = {
            exam_title: examTitle,
            tags: { '난이도': ['상', '중', '하']}
        };
    
        axios.post('/api/v1/exams', data)
            .then(response => {
                console.log('success', response.data);
                console.log('success', response.data.message);
    
                // 문자열로 된 examId를 숫자로 변환하여 상태에 저장
                const examIdString = response.data.message;
                const examId = parseInt(examIdString, 10); // 문자열을 숫자로 변환
    
                
                setExamId(examId); 
                setExamTitle(examTitle);
                console.log(examId);
                console.log(examTitle);
    
                
                navigate("/edit", { state: { examId, examTitle } });
            })
            .catch(error => {
                console.error('error', error);
            });
    };
    

    return (
        <DeleteConfirmModal>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>새로운 문제 등록</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <hr />
                <ContainerTitle>문제 제목</ContainerTitle>
                <ModalBody>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <InputExamTitle 
                            value={examTitle} 
                            onChange={(e) => setExamTitle(e.target.value)} 
                            placeholder="제목을 입력해주세요" 
                        />
                    </div>
                    <ModalButton onClick={handleExamDataSubmit}>문제 생성하기</ModalButton>
                </ModalBody>
            </ModalContent>
        </DeleteConfirmModal>
    );
};
