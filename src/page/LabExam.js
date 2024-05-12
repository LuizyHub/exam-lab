import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/style.css"
import { handleShuffle } from '../function/shuffleArray'
import { renderImages, parseImages } from '../function/renderImages'
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';


const LabExamContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
    transition: margin-left 0.3s ease;
`;


export default function LabExam() {

  const location = useLocation();
  const { selectedQuestions } = location.state;
  const [isQuestion, setIsQuestion] = useState([]);
  const [isCommentary, setIsCommentary] = useState(false); //답안지 상태관리
  const isSidebarOpen = useRecoilValue(isVisibleState);


  useEffect(() => {
    setIsQuestion(selectedQuestions);
  })


  const handleCommentary = () => {
    setIsCommentary(!isCommentary)
  }

  return (
    <LabExamContent $isSidebarOpen={isSidebarOpen}>
      <h2>Test</h2>
      {/* 문제 섞기 버튼 */}
      <button onClick={() => handleShuffle(isQuestion, setIsQuestion)}>Shuffle</button>
      <button onClick={handleCommentary}>Commentary</button>
      <Link to="/">back</Link>
      <ol style={{ listStylePosition: 'inside' }}>
        {/* , listStyleType: 'none'   */}
        {isQuestion.map((item, index) => (
          <div key={index}>
            <li key={index} style={{ marginBottom: '70px', border: '1px solid black', width: '70%' }}>
              {/* 질문 */}
              <p>{parseImages(item.question, item.question_images_in)}</p>
              {/* 이미지 렌더링 */}
              <div style={{ width: '500px' }}>{renderImages(item.question_images_out)}</div>
              {/* 4선지 */}
              <ol style={{ listStyleType: 'none' }}>
                {item.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ol>
            </li>
            <p style={{ display: isCommentary ? 'block' : 'none', marginBottom: '70px', border: '1px solid black', width: '70%' }}>해설 : {item.commentary}</p>
          </div>
        ))}
      </ol>
      <NavigationBar />
    </LabExamContent >
  );
}
