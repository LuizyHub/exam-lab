import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../components/NavigationBar';
import { useRecoilValue } from 'recoil';
import { isVisibleState, loginState } from '../recoil/atoms';
import LoginModal from "../modals/LoginModal";
import { getLoginInfo } from '../function/LoginState';
import styled from "styled-components";

const SelectExam = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
  transition: margin-left 0.3s ease;
`;

const ExamTypeButton = styled.button`
  border: none;
  color: ${({ selected }) => (selected ? '#262626' : '#9A9DA0')};
  background-color: #fff;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: ${({ selected }) => (selected ? '2px solid #000' : 'none')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  padding-bottom: 5px;
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


const NoneContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoneExam = styled.p`
  color: #6D6D6D;
  font-size: 14px;
`;

export default function SelectExamCreatePage() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isSidebarOpen = useRecoilValue(isVisibleState);
  const [showResearchExams, setShowResearchExams] = useState(true);

  useEffect(() => {
    axios.get(`/api/v1/exams?sample=true`)
      .then(response => {
        console.log(response.data);
        setExams(response.data.exams); 
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
  }, []);

  // const handleNavigate = async (path) => {
  //   try {
  //     const { loginStatus } = await getLoginInfo();
  //     if (loginStatus) {
  //       navigate(path);
  //     } else {
  //       setShowModal(true);
  //     }
  //   } catch (error) {
  //     console.error('Failed to retrieve login information', error);
  //   }
  // };

  const handleExamTypeClick = (examId, examTitle) => {
    navigate('/selectQuestion', { state: { examId, examTitle } });
  }

  const filteredExams = showResearchExams
    ? exams.filter(exam => exam.exam_id <= 2)
    : exams.filter(exam => exam.exam_id > 3);

  return (
    <div>
      <SelectExam $isSidebarOpen={isSidebarOpen}>
        <h1>나만의 시험지</h1>
        <p>등록된 문제를 조합해서 나만의 시험지를 제작해보세요</p>

        {/* <ExamCreateButton onClick={() => handleNavigate('/edit')}>
          <CreateImg src="/img/추가하기.png" alt="Create Icon" />
        </ExamCreateButton> */}

        <div>
          <ExamTypeButton selected={showResearchExams} onClick={() => setShowResearchExams(true)}>
            연구소 문제
          </ExamTypeButton>
          <ExamTypeButton selected={!showResearchExams} onClick={() => setShowResearchExams(false)}>
            나만의 문제
          </ExamTypeButton>
        </div>

        <div>
          {filteredExams.length === 0 ? (
            <NoneContent>
              <NoneExam>등록된 나만의 문제가 없습니다</NoneExam>
            </NoneContent>
          ) : (
            filteredExams.map(exam => (
              <ExamButton key={exam.exam_id} onClick={() => handleExamTypeClick(exam.exam_id, exam.exam_title)}>
                {exam.exam_title}
              </ExamButton>
            ))
          )}
        </div>
      </SelectExam>

      <NavigationBar />
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
