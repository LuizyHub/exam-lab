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
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #5BB6B4;
    color: white;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const ListButton = styled.button`
    padding: 10px 20px;
    background-color: #5BB6B4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    background-color: ${({ show }) => show ? '#C6E7E7' : '#5BB6B4'};
    color: white;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
`;

const CheckBox = styled.input`
    position: absolute; /* 절대 위치 설정 */
    top: 0;
    right: 0px; /* 오른쪽에 위치 */
    width: 20px; /* 너비 조절 */
    height: 20px; /* 높이 조절 */
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
    transition: background-color 0.3s; /* 배경색 변경에 대한 transition 효과 추가 */
    cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능한 것처럼 보이게 함 */
`;

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
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

    // 모든 문제를 선택된 문제로 설정
    const handleSelectAllQuestions = () => {
        const newQuestions = questions.filter(item => !selectedQuestions.some(q => q.id === item.id));
        setSelectedQuestions([...selectedQuestions, ...newQuestions]); 
    };

    const handleSubmitQuestion = () => {
        if (showSelectedQuestionsCount > 0) {
            navigate("../workbooks/create", { state: { selectedQuestions: selectedQuestions } });
        } else {
            alert("한 문제 이상 선택해야합니다.")
        }
    };

    return (
        <ShowQuestionContent>
            <Button onClick={handleSubmitQuestion}>시험지 생성</Button>
            <ListButton onClick={handleSelectAllQuestions}>전체 선택</ListButton>
            <ToggleButton onClick={() => setShowSelectedQuestions(!showSelectedQuestions)} $show={showSelectedQuestions}>
                선택된 문제 {showSelectedQuestionsCount}
            </ToggleButton>
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
    );
}
