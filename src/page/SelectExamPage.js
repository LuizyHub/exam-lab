import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SelectExamPage.css';


export default function SelectExamPage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 완료 플래그

  useEffect(() => {
    axios.get(`/api/v1/exams`)
    .then (response => {
      console.log(response.data);
      setExams(response.data.exams); // exams 배열만 저장
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
      <div className="examList">
        {exams.map(exam => (
          <button key={exam.exam_id} onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
            {exam.exam_title}
          </button>
        ))}
      </div>
    </div>
  )
}
