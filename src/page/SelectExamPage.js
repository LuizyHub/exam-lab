import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavigationBar from '../components/NavigationBar';
import { DeleteExamModal }from '../modals/DeleteModal';


const SelectExam = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 320px;
  margin-right: 18%;
  margin-top: 16px;
  transition: margin-left 0.3s ease;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ExamButton = styled.button`
    background-color: #fff;
    border: 0.5px solid #C6E7E7;
    color: #262626;
    padding: 15px 32px;
    border-radius: 7px;
    font-size: 16px;
    margin: 4px 2px;
    margin-right: 15px;
    font-size: 15px;
    text-align: left;
    width: 384px;
    height: 91px;
    position: relative;
    &:hover {
      background-color: #ECF7F7;
    }
`;

const ExamCreateButton = styled(ExamButton)`
    background-color: #F5F5F7;
    border: 0.5px solid #fff;
    width: 384px;
    height: 91px;
    &:hover {
      background-color: #EDFAFA;
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

export default function SelectExamPage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [modalStates, setModalStates] = useState({}); // 시험별 모달 상태


  useEffect(() => {
    axios.get(`/api/v1/exams`)
      .then(response => {
        setExams(response.data.exams);
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
    <SelectExam>
        <div>
        <PageTitle>문제 관리소</PageTitle>
        <p>문제를 새롭게 등록해보세요</p>
        <ButtonContainer>
          <ExamCreateButton onClick={() => {navigate('/edit')}}> 
            <CreateImg src="/img/추가하기.png" alt="Create Icon" />
          </ExamCreateButton>
          {exams.map(exam => (
            <div key={exam.exam_id}>
              <ExamButton onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
                <p style={{fontSize: '18px',  marginTop:'0px', marginBottom:'0px', fontWeight: 'bold'}}>{exam.exam_title} </p>
                <p style={{fontSize: '16px', marginTop:'6px', marginBottom:'0px'}}> {exam.size}문제 </p>
                <DeleteImg src="/img/쓰레기통.png" alt="Delete Icon" onClick={(e) => { e.stopPropagation(); handleOpenModal(exam.exam_id); }} />
              </ExamButton>  

              {modalStates[exam.exam_id] && 
                <DeleteExamModal 
                  exam={exam} 
                  handleExamDelete={handleExamDelete}  
                  handleCloseModal={handleCloseModal}  
                />
              }
            </div>
          ))}
        </ButtonContainer>
      </div>

      <NavigationBar />
    </SelectExam>
  );
}