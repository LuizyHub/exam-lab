import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import "./style.css";

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  //API import
  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data.slice(0, limit));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  //클래스 추가
  // inside 이미지 파싱 후 렌더링 함수 수정
  const parseImageTag = (question, questionImgUrls) => {
    let parsedQuestion = question;

    // 이미지 URL 배열이 정의되었는지 확인합니다.
    if (Array.isArray(questionImgUrls) && questionImgUrls.length > 0) {
      // 이미지 URL 배열의 각 요소를 반복하여 이미지 태그를 생성하고 질문에 삽입합니다.
      questionImgUrls.forEach((imageUrl) => {
        // 정규 표현식 리터럴을 사용하여 이미지 태그를 대체합니다.
        const regex = /src=\d+/g;
        parsedQuestion = parsedQuestion.replace(regex, `src="${imageUrl.url}"`);
      });
    }
    return parse(parsedQuestion);
  };



  // outside 이미지 렌더링 함수 수정
  const renderImages = (imageData) => {
    if (Array.isArray(imageData) && imageData.length > 0) {
      return imageData.map((image, imageIndex) => (
        <img
          key={imageIndex}
          src={image.url} // 이미지 객체에서 URL을 가져옵니다.
          alt={`Image ${imageIndex}`}
          style={{ width: '100%' }}
        />
      ));
    } else {
      return null;
    }
  };

  return (
    <div>
      <h2>Test</h2>
      <select onChange={(e) => { setLimit(parseInt(e.target.value)); }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <Link to="/">back</Link>
      <ol style={{ listStylePosition: 'inside', listStyleType: 'none' }}>
        {data.map((item, index) => (
          <li key={index} style={{ marginBottom: '70px', border: '1px solid black', width: '70%' }}>
            {/* 질문 */}
            <p>{item.id}. {parseImageTag(item.question, item.question_images_in)}</p>
            {/* 이미지 렌더링 */}
            <div>{renderImages(item.question_images_out)}</div>
            {/* 4선지 */}
            <ol style={{ listStyleType: 'none' }}>
              {item.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
