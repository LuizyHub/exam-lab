import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/style.css"

import labExamAxios from "../function/labExamAxios";
import { handleShuffle } from '../function/shuffleArray'
import { renderImages, parseImages } from '../function/renderImages'

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [isCommentary, setIsCommentary] = useState(false); //답안지 상태관리

  //api연결
  useEffect(() => {
    labExamAxios(limit, setData)
  }, [limit]);

  const handleCommentary = () => {
    setIsCommentary(!isCommentary)
  }

  return (
    <div>
      <h2>Test</h2>
      {/* 문제 섞기 버튼 */}
      <button onClick={() => handleShuffle(data, setData)}>Shuffle</button>
      <button onClick={handleCommentary}>Commentary</button>
      <select onChange={(e) => { setLimit(e.target.value); }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <Link to="/">back</Link>
      <ol style={{ listStylePosition: 'inside' }}>
        {/* , listStyleType: 'none'   */}
        {data.map((item, index) => (
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
    </div >
  );
}
