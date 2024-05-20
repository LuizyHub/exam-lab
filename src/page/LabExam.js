import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Font, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import "../css/style.css"
import { handleShuffle } from '../function/shuffleArray'
import { renderImages, parseImages } from '../function/renderImages'
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';
import '../css/labexam.css';
import axios from "axios";
import Exam from "../components/Exam";

const LabExamContent =
  styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
    transition: margin-left 0.3s ease;
`;

Font.register({
  family: 'NanumGothic-Regular',
  src: '/font/NanumGothic-Regular.ttf', // Font.register 폰트 파일의 경로는 기본 public으로 시작
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontFamily: 'NanumGothic-Regular',
    fontSize: 10,
    width: '90%', // Text 요소의 너비를 100%로 설정하여 부모 요소의 너비를 채우도록 함
    height: 'auto', // Text 요소의 높이를 자동으로 조정하여 내용에 맞게 함
    marginBottom: 10, // Text 요소 간의 하단 여백 추가
    border: '1px solid #F9F9FA', // 각 Text 요소 주변에 테두리 추가
  },
  image: {
    width: 80,
    height: 80,
  },
  input: {
    marginBottom: 10,
  },
  buttonPdf: {
    textDecoration: 'none',
    color: '#24ABA8',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const PdfDocument = ({ isQuestion, isCommentary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* 각 페이지에 대한 컨텐츠를 추가. */}
      {isQuestion.map((question, index) => (
        <div key={index} style={styles.section}>
          {/* 각 질문과 그에 따른 내용을 렌더링. */}
          <Text>{index + 1}. {question.question}</Text>
          {question.question_images_out && question.question_images_out.length > 0 && (
            question.question_images_out.map((image, imageIndex) => (
              <Image key={imageIndex} src={image.url} style={styles.image} />
            ))
          )}
          {/* <Image src={question.question_images_out.url} /> */}
          <Text>{question.options}</Text>
        </div>
      ))}
    </Page>
  </Document>
);

export default function LabExam() {

  const location = useLocation();
  const { selectedQuestions } = location.state;
  const workbookId = location.state.workbookId;

  const [isWorkBook, setWorkBook] = useState([]);
  const [isNewWorkBook, setNewWorkBook] = useState("");
  const [isQuestion, setIsQuestion] = useState([]); //상태변수 이름 변경 필요
  const [isCommentaryQuestion, setIsCommentaryQuestion] = useState(true);//상태변수 이름 변경 필요
  const [isCommentary, setIsCommentary] = useState(false); //상태변수 이름 변경 필요
  const isSidebarOpen = useRecoilValue(isVisibleState);

  useEffect(() => {
    if (workbookId) {
      axios.get(`/api/v1/workbooks/${workbookId}`)
        .then(response => {
          console.log(response.data);
          const res = response.data.message;
          const content = res.content;
          setWorkBook(res);
          setIsQuestion(content.questions);//문제
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setIsQuestion(selectedQuestions);//문제 선택 페이지
    }
  }, [workbookId])

  const handleInputChange = (event) => {
    setNewWorkBook(event.target.value);
  };

  //버튼 클릭 시 답지 생성 토글
  const handleCommentary = () => {
    setIsCommentaryQuestion(false);
    setIsCommentary(true);
  }

  const handleQuestion = () => {
    setIsCommentaryQuestion(true);
    setIsCommentary(false);
  }

  const postData = async () => {
    try {
      const data = {
        title: isNewWorkBook,
        summary: "not",
        content: {
          questions: isQuestion, // Use the state variable here
          size: isQuestion.length // Size of questions array
        }
      };
      console.log(data);
      const response = await axios.post('/api/v1/workbooks', data);
      console.log(response.data); // Handle response as needed
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <LabExamContent $isSidebarOpen={isSidebarOpen}>

        <NavigationBar />
        <div className="lab-exam">
          <div className="button-container">
            <div className="button-main">
              {/* <Exam /> */}
              <div>
                <input className="title" placeholder="시험지 이름 입력" value={isWorkBook.title} onChange={handleInputChange} />
                <div id="button-pdf">
                  <PDFDownloadLink document={<PdfDocument isQuestion={isQuestion} isCommentary={isCommentary} />} fileName="lab_exam.pdf" style={styles.buttonPdf}>
                    {({ loading }) => (loading ? 'Loading...' : 'PDF 다운')}
                  </PDFDownloadLink>
                </div>
                <button onClick={postData}>저장하기</button>
              </div>
            </div>
            <div className="button-bottom-container">

              <div className="button-selection">
                <button onClick={handleQuestion} style={{ textDecoration: isCommentaryQuestion ? 'underline' : 'none' }}>문제</button>
                <button onClick={handleCommentary} style={{ textDecoration: isCommentary ? 'underline' : 'none' }}>해설지</button>
              </div>

              <div className="button-bottom-sub">
                <button id="button-shuffle" onClick={() => handleShuffle(isQuestion, setIsQuestion)}>문제 셔플</button>
                <button>1쪽</button>
                <button style={{ marginLeft: '1%' }}>2쪽</button>
              </div>
              {/* <button onClick={console.log(selectedQuestions)}>test</button> */}
            </div>
          </div>

          <Exam isQuestion={isQuestion} parseImages={parseImages} renderImages={renderImages} isCommentary={isCommentary} isCommentaryQuestion={isCommentaryQuestion} />
        </div>

      </LabExamContent >
    </>

  );
}