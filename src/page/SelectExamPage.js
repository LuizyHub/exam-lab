import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SelectExam.css';

export default function SelectExamPage() {
  const navigate = useNavigate();
  const [selectedExamType, setSelectedExamType] = useState(""); //시험지 종류
  const [selectedSubExamType, setSelectedSubExamType] = useState(""); // 세부 시험지 종류
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 완료 플래그

  useEffect(() => {
    if (selectedExamType && selectedSubExamType) {
      if(isDataLoaded) {
        console.log(selectedExamType);
        console.log(selectedSubExamType);
        navigate('/selectQuestion', { state: { selectedExamType, selectedSubExamType } }); // 선택된 값으로 다음 화면으로 이동하는 로직
      }
    }
  }, [selectedSubExamType, selectedSubExamType, isDataLoaded]);

  // 시험지 종류 선택
  const handleExamTypeClick = (e) => {
    setSelectedExamType(e.target.value);
  }
  
  const handleSubExamTypeClick = (e) => {
    setSelectedSubExamType(parseInt(e.target.value));
    setIsDataLoaded(true);
  }
 
  return (
    <div>
      <div className="examList">
        <button value="운전면허" onClick={handleExamTypeClick} >운전면허</button>
        <button value="수능">수능</button>
        <button value="컴퓨터활용능력">컴퓨터활용능력</button>
      </div>
   
      {selectedExamType && (
        <select onChange={handleSubExamTypeClick}>
          <option value="">선택</option>
          <option value={1}>1종 보통</option>
          <option value={2}>2종 보통</option>
          <option value={3}>대형</option>
          <option value={4}>특수</option>
          <option value={5}>소형</option>
          <option value={6}>원동기</option>
        </select>
      )}

    </div>
  )
}

