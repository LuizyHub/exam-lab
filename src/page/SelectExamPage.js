import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavigationBar from '../components/NavigationBar';
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';


const SelectExam = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
   transition: margin-left 0.3s ease;
`;

const ExamButton = styled.button`
    background-color: #fff;
    border: 0.5px solid #C6E7E7;
    color: #6D6D6D;
    padding: 15px 32px;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    margin: 4px 2px;
    margin-right: 15px;
    font-size: 15px;
    width: 300px;
    position: relative;
    &:hover {
      background-color: #ECF7F7;
    }
`;

const ExamCreateButton = styled.button`
    background-color: #F5F5F7;
    border: 0.5px solid #fff;
    color: #6D6D6D;
    padding: 15px 32px;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    margin: 4px 2px;
    margin-right: 15px;
    font-size: 15px;
    width: 300px;
    &:hover {
      background-color: #C2C3C6;
    }
`;

const CreateImg = styled.img`
    width: 30px;
`;

const DeleteImg = styled.img`
    position: absolute;
    top: 6px ;
    right: 6px;
    width: 15px;
`;

const DeleteConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;  
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
`;

const ModalBody = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;


const ModalButton = styled.button`
    background-color: ${props => props.primary ? '#29B8B5' : '#EBF0F6'};
    color: ${props => props.primary ? '#fff' : '#A2ACB9'};
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
`;


export default function SelectExamPage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [modalStates, setModalStates] = useState({}); // 시험별 모달 상태
  const isSidebarOpen = useRecoilValue(isVisibleState);

  useEffect(() => {
    axios.get(`/api/v1/exams`)
      .then(response => {
        console.log(response.data);
        setExams(response.data.exams);
        console.log(exams);
        const initialModalStates = {};
        response.data.exams.forEach(exam => {
          initialModalStates[exam.exam_id] = false; // 각 시험의 모달 상태를 초기화
        });
        setModalStates(initialModalStates);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);




  // 시험 종류 선택
  const handleExamTypeClick = (examId, examTitle) => {
    navigate('/edit', { state: { examId, examTitle } });
  }

  // 시험 삭제하기 모달 열기
  const handleOpenModal = (examId) => {
    const newModalStates = { ...modalStates };
    newModalStates[examId] = true; // 해당 시험의 모달 상태를 true로 변경
    setModalStates(newModalStates);
  };

  // 시험 삭제하기 모달 닫기
  const handleCloseModal = (examId) => {
    const newModalStates = { ...modalStates };
    newModalStates[examId] = false; // 해당 시험의 모달 상태를 false로 변경
    setModalStates(newModalStates);
  };

  // 시험 삭제하기
  const handleExamDelete = (examId) => {
    axios.delete(`/api/v1/exams/${examId}`)
      .then(response => {
        console.log('success', response.data);
        setExams(prevExams => prevExams.filter(exam => exam.exam_id !== examId));
        handleCloseModal(examId); // 삭제 후 모달 닫기
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <SelectExam $isSidebarOpen={isSidebarOpen}>
      <div>
        <h1>나만의 문제</h1>
        <p>문제를 새롭게 등록해보세요</p>
        <ExamCreateButton onClick={() => {navigate('/edit')}}> 
          <CreateImg src="/img/추가하기.png" alt="Create Icon" />
        </ExamCreateButton>
        <div>
          {exams.map(exam => (
            <div key={exam.exam_id}>
              <ExamButton onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
                {exam.exam_title}
                <DeleteImg src="/img/쓰레기통.png" alt="Delete Icon" onClick={(e) => { e.stopPropagation(); handleOpenModal(exam.exam_id); }} />
              </ExamButton>

              
              {modalStates[exam.exam_id] && 
                <DeleteConfirmModal>
                  <ModalBody>
                    <h3>{exam.exam_title}에 대한 모든 문제들이 삭제됩니다. 정말로 삭제하시겠습니까? </h3>
                    <ModalButton primary="true" onClick={() => { handleExamDelete(exam.exam_id); }}>삭제하기</ModalButton>
                    <ModalButton onClick={() => handleCloseModal(exam.exam_id)}>취소</ModalButton>
                  </ModalBody>
                </DeleteConfirmModal>
              }
            </div>
          ))}
        </div>
      </div>
      <NavigationBar />
    </SelectExam>
  );
}
