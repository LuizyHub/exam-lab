import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import "../css/style.css"
// shuffleArray(Fisher-Yates) 알고리즘을 사용하여 배열을 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

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

  // 문제를 섞는 함수를 호출하는 버튼 클릭 핸들러
  const handleShuffle = () => {
    const shuffledData = shuffleArray(data);
    setData([...shuffledData]); // 새로운 배열로 설정하여 React가 업데이트를 감지할 수 있게 함
  };


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
        parsedQuestion = parsedQuestion.replace(regex, `src="${imageUrl.url}" class="${imageUrl.attribute}"`);
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
          class={image.attribute}
          alt={`Image ${imageIndex}`}
        // style={{ width: '100%' }}
        />
      ));
    } else {
      return null;
    }
  };

  return (
    <div>
      <h2>Test</h2>
      {/* 문제 섞기 버튼 */}
      <button onClick={handleShuffle}>Shuffle</button>
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
          <li key={index} style={{ marginBottom: '70px', border: '1px solid black', width: '70%' }}>
            {/* 질문 */}
            <p>{parseImageTag(item.question, item.question_images_in)}</p>
            {/* 이미지 렌더링 */}
            <div style={{ width: '500px' }}>{renderImages(item.question_images_out)}</div>
            {/* 4선지 */}
            <ol style={{ listStyleType: 'none' }}>
              {item.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div >
  );
}
