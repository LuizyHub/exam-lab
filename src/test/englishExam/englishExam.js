import parse from 'html-react-parser';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EnglishExam()  {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/english');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const parseUnderline = (item) => {
    // 정규 표현식을 사용하여 <u> 태그로 감싸인 부분을 실제 밑줄로 파싱합니다.
    const regex = /<u>(.*?)<\/u>/g;
    const parsedItem = item.replace(regex, '<u>$1</u>');
    return parsedItem;
  }

  const parseContent = (text) => {
    const regex = /<content>(.*?)<\/content>/g; // <content> 태그를 찾는 정규표현식
    let parsedText = text;
    let match;
    while ((match = regex.exec(text)) !== null) {
      // <content> 태그로 감싸인 텍스트를 네모 박스로 감싸기
      const contentText = match[1];
      parsedText = parsedText.replace(match[0], `<p style="border: 1px solid black; padding: 10px; margin: 5px 0;">${contentText}</p>`);
    }
    return parsedText;
  };

  return (
    <div>
      {questions.map((questionData) => (
        <div key={questionData.id}>
          {/* parse 함수를 사용하여 HTML을 파싱하여 렌더링 */}
          {parse(parseContent(questionData.question))}
          <ul>
            {questionData.options.map((option, index) => (
              <ol key={index}>{option}</ol>
            ))}
          </ul>
          
        </div>
      ))}
    </div>
  );
};
