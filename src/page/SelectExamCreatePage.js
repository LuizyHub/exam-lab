import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../components/NavigationBar';
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';

import styled from "styled-components";

const SelectExam = styled.div`
      display: flex;
      flex-direction: column;
      margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
      transition: margin-left 0.3s ease;
`;

const ExamButton = styled.button`
    background-color: #fff;
    border: 0.5px solid #E2E8EE;
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



export default function SelectExamCreatePage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const isSidebarOpen = useRecoilValue(isVisibleState);


  useEffect(() => {
    axios.get(`/api/v1/exams?sample=true`)
    .then (response => {
      console.log(response.data);
      setExams(response.data.exams); 

    })
    .catch(error => {
      // 에러 처리
      console.error(error);
    });
  }, []);

  

  // 시험 종류 선택
  const handleExamTypeClick = (examId, examTitle) => {
    navigate('/selectQuestion', { state: { examId, examTitle } }); // exam_id와 title 전달
  }



  
  return (
    <div>
        <SelectExam $isSidebarOpen={isSidebarOpen}>
        <h1>나만의 시험지</h1>
        <p>등록된 문제를 조합해서 나만의 시험지를 제작해보세요</p>
        <ExamCreateButton onClick={() => {navigate('/edit')}}>
           <CreateImg src="/img/추가하기.png" alt="Create Icon" />
        </ExamCreateButton>
        <div className="examList">
          {exams.map(exam => (
            <ExamButton className="exam" key={exam.exam_id} onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
              {exam.exam_title}
            </ExamButton>
          ))}
        </div>
      </SelectExam>

      <NavigationBar />

    </div>
  )
}

