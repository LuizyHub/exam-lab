// import parse from 'html-react-parser';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function EnglishExam() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3002/english');
//         setQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // h1/h2/h3 태그를 처리하는 함수
//   const parseHeaders = (text) => {
//     const h1Regex = /<h1>(.*?)<\/h1>/g;
//     const h2Regex = /<h2>(.*?)<\/h2>/g;
//     const h3Regex = /<h3>(.*?)<\/h3>/g;

//     let parsedText = text;
//     parsedText = parsedText.replace(h1Regex, '<h1>$1</h1>');
//     parsedText = parsedText.replace(h2Regex, '<h2>$1</h2>');
//     parsedText = parsedText.replace(h3Regex, '<h3>$1</h3>');

//     return parsedText;
//   };

//   // 표를 처리하는 함수
//   const parseTable = (text) => {
//     const regex = /<table>(.*?)<\/table>/g;
//     let parsedText = text.replace(regex, (match) => {
//       return `<table style="border-collapse: collapse; width: 100%;">${match}</table>`;
//     });

//     parsedText = parsedText.replace(/<thead>/g, '<thead style="background-color: #f2f2f2;">');
//     parsedText = parsedText.replace(/<th>/g, '<th style="border: 1px solid #ddd; padding: 8px;">');
//     parsedText = parsedText.replace(/<td>/g, '<td style="border: 1px solid #ddd; padding: 8px;">');

//     return parsedText;
//   };

//   // <br> 태그를 처리하는 함수
//   const parseLineBreaks = (text) => {
//     const regex = /<br\s*\/?>/gi;
//     const parsedText = text.replace(regex, '<br />');
//     return parsedText;
//   };

  

//   // // <longLine> 태그를 처리하는 함수
//   // const parseLongLine = (text) => {
//   //   const regex = /<longLine>/g;
//   //   const parsedText = text.replace(regex, '<span style="display: inline-block; width: 120px; border-bottom: 1px solid black;"></span>');
//   //   return parsedText;
//   // };

//   // // <longlongLine> 태그를 처리하는 함수
//   // const parseLongLongLine = (text) => {
//   //   const regex = /<longlongLine>/g;
//   //   const parsedText = text.replace(regex, '<span style="display: inline-block; width: 250px; border-bottom: 1px solid black;"></span>');
//   //   return parsedText;
//   // };



//   return (
//     <div>
//       {questions.map((questionData, questionIndex) => (
//         <div key={questionIndex}>
//           {/* parse 함수를 사용하여 HTML을 파싱하여 렌더링 */}
//           {parse(parseHeaders(parseTable(parseContent(questionData.question))))}
//           <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
//             {questionData.options.map((option, optionIndex) => (
//               <li key={optionIndex}>{parse(parseHeaders(parseTable(parseLongLine(parseLongLongLine(parseContent(option))))))}</li>
//             ))}
//           </ul> <br />
//         </div>
//       ))}
//     </div>
//   );
// };
