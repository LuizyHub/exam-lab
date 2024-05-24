import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowQuestion from "./ShowQuestion";
import styled from 'styled-components';

const ShowQuestionContent = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
    overflow: auto;
`;

const CreateButton = styled.button`
    width: 100%;
    height: 100px;
    padding: 10px 20px;
    border: 1px solid black;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ListButton = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #5BB6B4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    background-color: ${({ show }) => show ? '#EDFAFA' : '#F5F5F7'};
    color: ${({ show }) => show ? '#24ABA8' : '#9A9DA0'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    top: 120px;
    right: 10px;
`;


const CheckBox = styled.input`
    position: absolute; 
    top: 0px;
    right: 0px; 
    width: 20px; 
    margin: 10px;
    height: 20px; 
    background-color: black;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const QuestionContainer = styled.div`
    flex: 8;
    height: 100vh;
    padding: 20px;
    border-radius: 10px;
`;

const QuestionList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    list-style: none;
    padding: 0;
`;

const QuestionItem = styled.li`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: ${({ selected }) => selected ? '#EDFAFA' : '#fff'};
    transition: background-color 0.3s; 
    cursor: pointer;
`;

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin: 10px;
`;

export default function ShowQuestionList({ questions }) {
    const navigate = useNavigate();
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [showSelectedQuestions, setShowSelectedQuestions] = useState(false);
    const [showSelectedQuestionsCount, setShowSelectedQuestionsCount] = useState("");

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

    // 전체 선택 버튼 클릭 -> 모든 문제를 선택된 문제로 설정
    const handleSelectAllQuestions = () => {
        const newQuestions = questions.filter(item => !selectedQuestions.some(q => q.id === item.id));
        setSelectedQuestions([...selectedQuestions, ...newQuestions]);
    };

    // 전체 삭제 버튼 클릭 -> 선택된 문제 모두 초기화
    const handleDeleteAllQuestions = () => {
        setSelectedQuestions([]);
    };

    const handleLabelClick = (item) => {
        handleSelectQuestion(item); // 라벨 클릭 시 CheckBox 선택/해제 기능과 동일한 기능 수행
    };

    const handleSubmitQuestion = () => {
        if (showSelectedQuestionsCount > 0) {
            navigate("../workbooks/create", { state: { selectedQuestions: selectedQuestions } });
        } else {
            alert("한 문제 이상 선택해야합니다.")
        }
    };

    return (
        <div style={{position: 'relative'}}>
            <CreateButton onClick={handleSubmitQuestion}>시험지 생성 </CreateButton>
            {showSelectedQuestions ? (
                <ListButton onClick={handleDeleteAllQuestions}>전체 삭제</ListButton>
            ) : (
                <ListButton onClick={handleSelectAllQuestions}>전체 선택</ListButton>
            )}
            <ToggleButton onClick={() => setShowSelectedQuestions(!showSelectedQuestions)} show={showSelectedQuestions}>
                선택된 문제 {showSelectedQuestionsCount}
            </ToggleButton>
        <ShowQuestionContent>
            
            <Container>
                <QuestionContainer>
                    <QuestionList>
                        {showSelectedQuestions ? (
                            selectedQuestions.map((item, index) => (
                                <QuestionItem
                                    key={index}
                                    onClick={() => handleSelectQuestion(item)} // 버튼 클릭 시 배경색 변경
                                    selected={selectedQuestions.some((q) => q.id === item.id)} // 선택된 문제에 따라 배경색 변경
                                >
                                    <StyledLabel onClick={() => handleLabelClick(item)}>
                                        <CheckBox type="checkbox" checked={selectedQuestions.some((q) => q.id === item.id)} onChange={() => handleSelectQuestion(item)} />
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
                                    onClick={() => handleSelectQuestion(item)} // 버튼 클릭 시 배경색 변경
                                    selected={selectedQuestions.some((q) => q.id === item.id)} // 선택된 문제에 따라 배경색 변경
                                >
                                    <StyledLabel>
                                        <CheckBox type="checkbox" checked={selectedQuestions.some((q) => q.id === item.id)} onChange={() => handleSelectQuestion(item)} />
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
        </ShowQuestionContent>
        </div>
    );
}