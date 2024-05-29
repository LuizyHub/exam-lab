import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../components/NavigationBar';
import LoginModal from "../modals/LoginModal";
import styled from "styled-components";
import Bottom from "../components/Bottom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  margin-bottom: 600px;
`;

const SelectExam = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 320px;
  margin-right: 18%;
  margin-top: 16px;
  transition: margin-left 0.3s ease;
`;

const PageIcon = styled.img`
  width: 50px;
  background-color: #D9F1F1;
  padding: 20px 20px;
  border-radius: 20px;
  margin-top: 15px;
  margin-right: 25px;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0px;
`;

const PageIntro = styled.p`
  margin-top: 8px;
  font-size: 19px;
  color: #313132;
`;

const StepNumberStyle = styled.p`
    color: #24ABA8;
    font-size: 16px;
    margin-bottom: 14px;
    margin-left: 140px;
    font-weight: bold;
`;

const StepsContainer = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-between;
    margin-top: 40px;
`;

const StepBy = styled.div`


`;

const NextStepIcon = styled.img`
    width: 20px;
    margin: 3px 10px;
    margin-top: 40px;
`;

const StepButton = styled.button`
    background-color : ${({ $primary }) => $primary ? '#D9F1F1' : '#FFFFFF'};    
    color: #3E3F41;
    border: 1px solid ${({ $primary }) => $primary ? '#BADEDE' : '#EBEDEF'};
    border-radius: 8px;
    padding: 5px 8px;
    flex: 1; 
    width: 310px;
    height: 65px;
    font-size: 18px;
    margin: 0 10px;
`;


const StepIntro = styled.p`
    font-size: 16px;
    color: #313132;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ExamTypeButton = styled.button`
  border: none;
  color: ${({ $selected }) => ($selected ? '#262626' : '#9A9DA0')};
  background-color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-top: 108px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-bottom: ${({ $selected }) => ($selected ? '2.5px solid #000' : 'none')};
  padding-bottom: 5px;
`;

const ExamButton = styled.button`
  background-color: #fff;
  border: 1px solid #E2E8EE;
  color: #262626;
  padding: 15px 32px;
  text-align: center;
  border-radius: 7px;
  font-size: 18px;
  margin: 4px 2px;
  margin-right: 15px;
  text-align: left;
  width: 375px;
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
  font-size: 18px;
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
  };

  const filteredExams = showResearchExams
    ? exams.filter(exam => exam.exam_id <= 2)
    : exams.filter(exam => exam.exam_id > 3);

  return (
    <Container>
      <Content>
        <SelectExam>
          <div style={{ display: "flex" }}>
            <PageIcon src="/img/시험지제작소.svg" alt="page Icon" />
            <div>
              <PageTitle>시험지 제작소</PageTitle>
              <PageIntro>등록된 문제를 조합해서 나만의 시험지를 제작해보세요</PageIntro>
            </div>
          </div>
          <StepsContainer>
                    <StepBy>
                        <StepNumberStyle $primary="true"> STEP1 </StepNumberStyle>
                        <StepButton $primary="true"> 시험 종류 선택</StepButton>
                    </StepBy>
                    <StepBy>
                        <NextStepIcon src="/img/polygon_icon.png" alt="polygon Icon" />
                    </StepBy>
                    <StepBy>
                        <StepNumberStyle> STEP2 </StepNumberStyle>
                        <StepButton>문제 검색 및 선택 </StepButton>
                    </StepBy>
                    <StepBy>
                        <NextStepIcon src="/img/polygon_icon.png" alt="polygon Icon" />
                    </StepBy>
                    <StepBy>
                        <StepNumberStyle> STEP3 </StepNumberStyle>
                        <StepButton> 나만의 시험지 제작 완료</StepButton>
                    </StepBy>
                </StepsContainer>

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
                  <p style={{ fontSize: '18px', marginTop: '0px', marginBottom: '0px', fontWeight: 'bold', color: '#262626' }}>{exam.exam_title} </p>
                  <p style={{ fontSize: '16px', marginTop: '6px', marginBottom: '0px', color: '#3E3F41' }}> {exam.size}문제 </p>
                </ExamButton>
              ))
            )}
          </div>
        </SelectExam>
      </Content>

      <NavigationBar />
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      <footer>
          <Bottom />
      </footer>
    </Container>
  );
}
