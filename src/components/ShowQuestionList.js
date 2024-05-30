import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowQuestion from "./ShowQuestion";
import styled from 'styled-components';
import { OneMoreQuestionModal } from "../modals/SelectQuestionModal";

const ShowQuestionContent = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 10px;
    margin-bottom: 20px;
    margin-top: 30px;
    overflow: auto;
    width: 101.7%;
    height: ${({ $noQuestions }) => $noQuestions ? '200px' : 'auto'};
`;

const ChoseContainer = styled.div`
    border: 1px solid #ccc;
    background-color: #fff;
    position: relative;
    padding: 20px;
    width: 100%;
`;

const ContainerTitle = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin-left: 14px;
    margin-bottom: 5px;
`;

const QuestionSize = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: #6B6E72;
    margin-left: 14px;
`;

const ChosseText = styled.div`
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 10px;
`;

const CreateButton = styled.button`
    width: 144px;
    padding: 10px;
    border-radius: 5px;
    color: #FFFFFF;
    background-color: ${({ $selectedCount }) => $selectedCount > 0 ? '#29B8B5' : '#9A9DA0'};
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const ListButton = styled.button`
    padding: 10px 20px;
    background-color: #fff;
    color: #6B6E72;
    border: 1px solid #DCDCDD;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    &:hover {
        color: #24ABA8;
        background-color: #D9F1F1;
        border: 1px solid #BADEDE;
    }
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    background-color: ${({ $show }) => $show ? '#D9F1F1' : '#fff'};
    color: ${({ $selectedCount }) => $selectedCount > 0 ? '#24ABA8' : '#ccc'};
    border: 1px solid #DCDCDD;
    border-radius: 5px;
    cursor: ${({ $selectedCount }) => $selectedCount > 0 ? 'pointer' : 'not-allowed'};
    font-size: 16px;
    font-weight: 500;
    pointer-events: ${({ $selectedCount }) => $selectedCount > 0 ? 'auto' : 'none'};
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const QuestionContainer = styled.div`
    flex: 8;
    height: 100vh;
    padding: 5px 10px;
    border-radius: 10px;
`;

const QuestionList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    list-style: none;
    padding: 5px;
`;

const QuestionItem = styled.li`
    font-size: 14px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid ${({ $selected }) => $selected ? '#5BB6B4' : '#ccc'};
    border-radius: 3px;
    background-color: ${({ $selected }) => $selected ? '#D9F1F1' : '#fff'};
    transition: background-color 0.3s; 
    cursor: pointer;
`;

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin: 10px;
    cursor: pointer;
`;

const NoneQuestion = styled.p`
  position: absolute;
  top: 70%;
  left: 50%;
  color: #9A9DA0;
  transform: translate(-50%, -50%);
`;


export default function ShowQuestionList({ questions, questionsSize }) {
    const navigate = useNavigate();
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [showSelectedQuestions, setShowSelectedQuestions] = useState(false);
    const [showSelectedQuestionsCount, setShowSelectedQuestionsCount] = useState("");
    const [selectOneMore, setSelectOneMore] = useState(false); // 에러 발생 시 NoneQuestion 보이기 여부를 관리하는 상태 추가

    useEffect(() => {
        setShowSelectedQuestionsCount(selectedQuestions.length);
    }, [selectedQuestions]);

    const handleSelectQuestion = (item) => {
        const selectedIndex = selectedQuestions.findIndex((q) => q.id === item.id);
        if (selectedIndex === -1) {
            setSelectedQuestions([...selectedQuestions, item]);
        } else {
            setSelectedQuestions(selectedQuestions.filter((q) => q.id !== item.id));
        }
    };

    const handleSelectAllQuestions = () => {
        const newQuestions = questions.filter(item => !selectedQuestions.some(q => q.id === item.id));
        setSelectedQuestions([...selectedQuestions, ...newQuestions]);
    };

    const handleDeleteAllQuestions = () => {
        setSelectedQuestions([]);
    };

    const handleSubmitQuestion = () => {
        if (showSelectedQuestionsCount > 0) {
            navigate("../workbooks/create", { state: { selectedQuestions: selectedQuestions } });
        } else {
            setSelectOneMore(true);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
          <ChoseContainer>
            <ChosseText>
              <ContainerTitle>문제 고르기</ContainerTitle>
              {questionsSize <= 0 ? (
                <QuestionSize>총 0문제</QuestionSize>
              ) : (
                <QuestionSize>총 {questionsSize}문제</QuestionSize>
              )}
            </ChosseText>
            <ButtonContainer>
                <CreateButton onClick={handleSubmitQuestion} $selectedCount={selectedQuestions.length}>시험지 생성하기</CreateButton>
                <ButtonGroup>
                    <ListButton onClick={handleSelectAllQuestions}>전체 선택</ListButton>
                    <ListButton onClick={handleDeleteAllQuestions}>전체 삭제</ListButton>
                    <ToggleButton onClick={() => setShowSelectedQuestions(!showSelectedQuestions)} $show={showSelectedQuestions} $selectedCount={selectedQuestions.length}>
                        선택 문제만 보기 ({showSelectedQuestionsCount})
                    </ToggleButton>
                </ButtonGroup>
            </ButtonContainer>
          </ChoseContainer>
          <ShowQuestionContent $noQuestions={questionsSize <= 0}>
            {questionsSize > 0 ? (
              <Container>
                <QuestionContainer>
                  <QuestionList>
                    {showSelectedQuestions ? (
                      selectedQuestions.map((item, index) => (
                        <QuestionItem
                          key={index}
                          onClick={() => handleSelectQuestion(item)}
                          $selected={selectedQuestions.some((q) => q.id === item.id)}
                        >
                          <StyledLabel onClick={() => handleSelectQuestion(item)}>
                            <ShowQuestion
                              question={item.question}
                              question_images_out={item.question_images_out}
                              question_images_in={item.question_images_in}
                              options={item.options}
                            />
                          </StyledLabel>
                        </QuestionItem>
                      ))
                    ) : (
                      questions.map((item, index) => (
                        <QuestionItem
                          key={index}
                          onClick={() => handleSelectQuestion(item)}
                          $selected={selectedQuestions.some((q) => q.id === item.id)}
                        >
                          <StyledLabel onClick={() => handleSelectQuestion(item)}>
                            <ShowQuestion
                              question={item.question}
                              question_images_out={item.question_images_out}
                              question_images_in={item.question_images_in}
                              options={item.options}
                            />
                          </StyledLabel>
                        </QuestionItem>
                      ))
                    )}
                  </QuestionList>
                </QuestionContainer>
              </Container>
            ) : (
              <QuestionContainer>
                <NoneQuestion>문제를 검색해주세요</NoneQuestion>
              </QuestionContainer>
            )}
          </ShowQuestionContent>
          {selectOneMore && <OneMoreQuestionModal onClose={() => setSelectOneMore(false)} />} 
        </div>
      );
}