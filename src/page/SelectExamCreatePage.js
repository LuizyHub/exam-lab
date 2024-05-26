import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../components/NavigationBar';
import LoginModal from "../modals/LoginModal";
import styled from "styled-components";

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

const ExamTypeButton = styled.button`
  border: none;
  color: ${({ $selected }) => ($selected ? '#262626' : '#9A9DA0')};
  background-color: #fff;
  font-size: 18px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: ${({ $selected }) => ($selected ? '2px solid #000' : 'none')};
  font-weight: bold;
  padding-bottom: 5px;
`;

const ExamButton = styled.button`
  background-color: #fff;
  border: 0.5px solid #E2E8EE;
  color: #262626;
  padding: 15px 32px;
  text-align: center;
  border-radius: 7px;
  font-size: 18px;
  margin: 4px 2px;
  margin-right: 15px;
  text-align: left;
  width: 384px;
  height: 91px;
  &:hover {
    background-color: #ECF7F7;
  }
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
      <SelectExam>
        <PageTitle>시험지 제작소</PageTitle>
        {/* <p>등록된 문제를 조합해서 나만의 시험지를 제작해보세요</p> */}


        <div>
          <ExamTypeButton $selected={showResearchExams} onClick={() => setShowResearchExams(true)}>
            연구소 문제
          </ExamTypeButton>
          <ExamTypeButton $selected={!showResearchExams} onClick={() => setShowResearchExams(false)}>
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
                <p style={{fontSize: '18px',  marginTop:'0px', marginBottom:'0px', fontWeight: 'bold'}}>{exam.exam_title} </p>
                <p style={{fontSize: '16px', marginTop:'6px', marginBottom:'0px'}}> {exam.size}문제 </p>
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
