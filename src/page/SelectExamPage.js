import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SelectExamPage.css';
import NavigationBar from '../components/NavigationBar';


export default function SelectExamPage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 완료 플래그

  useEffect(() => {
    axios.get(`/api/v1/exams`)
    .then (response => {
      console.log(response.data);
      setExams(response.data.exams); 
      setIsDataLoaded(true); 
    })
    .catch(error => {
      // 에러 처리
      console.error(error);
    });
  }, []);

  

  // 시험지 종류 선택
  const handleExamTypeClick = (examId, examTitle) => {
    navigate('/selectQuestion', { state: { examId, examTitle } }); // exam_id와 title 전달
  }
  
  return (
    <div>
        <div className="exam-create-content">
        <h1>나만의 시험지 제작하기</h1>
        <h3>step1. 시험 선택하기</h3>
        <div className="examList">
          {exams.map(exam => (
            <button key={exam.exam_id} onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
              {exam.exam_title}
            </button>
          ))}
        </div>
      </div>
      <NavigationBar />
    </div>
  )
}

