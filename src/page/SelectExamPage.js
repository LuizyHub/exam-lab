import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SelectExamPage.css';
import NavigationBar from '../components/NavigationBar';

export default function SelectExamPage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  // const [inputExamTitleModal, setInputExamTitleModal] = useState(false);
  // const [newExamTitle, setNewExamTitle] = useState('');

  useEffect(() => {
    axios.get(`/api/v1/exams`)
      .then(response => {
        console.log(response.data);
        setExams(response.data.exams);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // 시험 종류 선택
  const handleExamTypeClick = (examId, examTitle) => {
    navigate('/edit', { state: { examId, examTitle } });
  }
  

  // 시험 삭제하기
  const handleExamDelete = (examId) => {
    axios.delete(`/api/v1/exams/${examId}`)
      .then(response => {
        console.log('success', response.data);
        setExams(exams.filter(exam => exam.exam_id !== examId));
      })
      .catch(error => {
        console.error(error);
      });
  }

  // // 시험 추가 모달 열기
  // const openExamTitleModal = () => {
  //   setInputExamTitleModal(true);
  // }

  // // 시험 추가 모달에서 시험 제목 입력
  // const handleNewExamTitleChange = (event) => {
  //   setNewExamTitle(event.target.value);
  // }

  // // 시험 추가 모달 닫기
  // const closeExamTitleModal = () => {
  //   setInputExamTitleModal(false);
  //   setNewExamTitle(''); // 모달이 닫힐 때 입력값 초기화
  // }

  // // 새로운 시험 추가
  // const addNewExam = () => {
  //   // 여기에 새로운 시험 추가하는 로직 구현
  //   console.log('새로운 시험 추가:', newExamTitle);
  //   closeExamTitleModal(); // 모달 닫기

  //   navigate('/editR');

  // }

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
              {exam.exam_id > 2 &&
                <button onClick={() => handleExamDelete(exam.exam_id)}>시험 삭제하기</button>
              }
            </div>
          ))}
          {/* <button onClick={openExamTitleModal}> + 시험 추가 </button> */}

        </div>
      </div>
      <NavigationBar />
      <button onClick={()=> {navigate('/edit')}}> + 시험 추가 </button>
      {/* {inputExamTitleModal &&
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeExamTitleModal}>&times;</span>
            <h2>새로운 시험 추가</h2>
            <input type="text" value={newExamTitle} onChange={handleNewExamTitleChange} />
            <br /> <br />
            <button onClick={addNewExam}>시험지 생성하러 가기</button>
          </div>
        </div>
      } */}
    </div>
  )
}
