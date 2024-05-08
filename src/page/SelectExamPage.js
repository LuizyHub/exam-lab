import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SelectExamPage.css';
import NavigationBar from '../components/NavigationBar';

export default function SelectExamPage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [modalStates, setModalStates] = useState({}); // 시험별 모달 상태

  useEffect(() => {
    axios.get(`/api/v1/exams`)
      .then(response => {
        console.log(response.data);
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
    <div>
      <div className="exam-create-content">
        <h1>내 문제 관리하기</h1>
        <div className="examList">
          {exams.map(exam => (
            <div key={exam.exam_id}>
              <button className="exam" onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
                {exam.exam_title}
              </button>
              <button onClick={() => handleOpenModal(exam.exam_id)}>시험 삭제하기</button>
              {modalStates[exam.exam_id] && 
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <div style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 5,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                  }}>
                    <h3>{exam.exam_title}에 대한 모든 문제들이 삭제됩니다. 정말로 삭제하시겠습니까? </h3>
                    <button onClick={() => { handleExamDelete(exam.exam_id); }}>삭제하기</button>
                    <button onClick={() => handleCloseModal(exam.exam_id)}>취소</button>
                  </div>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
      <NavigationBar />
      <button onClick={() => {navigate('/edit')}}> + 시험 추가 </button>
    </div>
  );
}
