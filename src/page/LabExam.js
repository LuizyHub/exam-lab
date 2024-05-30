import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Font, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import "../css/style.css"
import { handleShuffle } from '../function/shuffleArray'
import { renderImages, parseImages } from '../function/renderImages'
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components';
import '../css/labexam.css';
import axios from "axios";
import Exam from "../components/Exam";
import SideBar from "../components/SideBar";

const LabExamContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 270px;
    margin-right: 18%;
    margin-top: 16px;
    transition: margin-left 0.3s ease;
    justify-content: center;
    align-items: center;
`;

Font.register({
  family: 'NanumGothic-Regular',
  src: '/font/NanumGothic-Regular.ttf',
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
    width: '100%',
    height: 'auto',
    marginBottom: 10,
    // border: '1px solid #F9F9FA',
  },
  image: {
    width: '30%',
    height: 'auto',
    marginBottom: 5,
  },
  fullWidthImage: {
    width: '100%',
    height: 'auto',
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

const PdfDocument = ({ isQuestion, isCommentaryQuestion}) => {
  const [reloadImage, setReloadImage] = useState({}); // 이미지 재로드 상태 추가

  // 이미지 로드 오류 처리 함수 추가
  const handleImageError = (index) => {
    setReloadImage((prevState) => ({
      ...prevState,
      [index]: (prevState[index] || 0) + 1
    }));
  };

  return (
    <Document>
    {isCommentaryQuestion ? (
        // 문제 페이지
        <Page size="A4" style={[styles.page]} wrap>
            {isQuestion.map((question, index) => (
                <View key={index} style={styles.section}>
                    <Text>{index + 1}. {question.question}</Text>
                    {question.question_images_out && question.question_images_out.length > 0 && (
                        question.question_images_out.map((image, imageIndex) => (
                            image.url ? (
                                <View key={imageIndex} style={{ width: '100%' }}> {/* 이미지를 포함하는 뷰 추가 */}
                                    <Image
                                        src={`${image.url}?reload=${reloadImage[imageIndex] || 0}`}
                                        style={styles.image}
                                        onError={() => handleImageError(imageIndex)}
                                    />
                                </View>
                            ) : null
                        ))
                    )}
                    {question.options.map((option, optionIndex) => (
                        <Text key={optionIndex}>
                            {String.fromCharCode(9312 + optionIndex)} {option}
                        </Text>
                    ))}
                </View>
            ))}
        </Page>
    ) : (
        // 해설 페이지
        <Page size="A4" style={[styles.page]} wrap>
            {isQuestion.map((question, index) => (
                <View key={index} style={styles.section}>
                    <View style={{ display: 'flex' }}>
                        <Text style={{ marginRight: '5px' }}><b>{index + 1}.</b></Text>
                        <View style={{ padding: '1px' }}>
                            <View style={{ marginBottom: '10px' }}>
                                <Text style={{ margin: '0px' }}>답 : {String.fromCharCode(9311 + parseInt(question.answers))}</Text>
                            </View>
                            <View>
                                <Text style={{ margin: '0px' }}>해 : {question.commentary}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </Page>
    )}
</Document>
  );
};

export default function LabExam() {
  const location = useLocation();
  const { selectedQuestions } = location.state;
  const workbookId = location.state.workbookId;

  const [isWorkBook, setWorkBook] = useState([]);
  const [isNewWorkBook, setNewWorkBook] = useState("");
  const [isQuestion, setIsQuestion] = useState([]); //상태변수 이름 변경 필요
  const [isCommentaryQuestion, setIsCommentaryQuestion] = useState(true);//상태변수 이름 변경 필요
  const [isCommentary, setIsCommentary] = useState(false); //상태변수 이름 변경 필요

  useEffect(() => {
    if (workbookId) {
      axios.get(`/api/v1/workbooks/${workbookId}`)
        .then(response => {
          const res = response.data.message;
          const content = res.content;
          setWorkBook(res);
          setIsQuestion(content.questions);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setIsQuestion(selectedQuestions);
    }
  }, [workbookId]);

  const handleInputChange = (event) => {
    setNewWorkBook(event.target.value);
  };

  const handleCommentary = () => {
    setIsCommentaryQuestion(false);
    setIsCommentary(true);
  };

  const handleQuestion = () => {
    setIsCommentaryQuestion(true);
    setIsCommentary(false);
  };

  const postData = async () => {
    try {
      const data = {
        title: isNewWorkBook,
        summary: "not",
        content: {
          questions: isQuestion,
          size: isQuestion.length
        }
      };
      const response = await axios.post('/api/v1/workbooks', data);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <LabExamContent>
        <SideBar />
        <NavigationBar />
        <div className="lab-exam">
          <div className="button-container">
            <div className="button-main">
              <div>
                <input className="title" placeholder="시험지 이름 입력" value={isWorkBook.title} onChange={handleInputChange} />
                <div id="button-pdf">
                  <PDFDownloadLink document={<PdfDocument isQuestion={isQuestion} isCommentary={isCommentary} isCommentaryQuestion={isCommentaryQuestion} />} fileName="lab_exam.pdf" style={styles.buttonPdf}>
                    {({ loading }) => (loading ? 'Loading...' : 'PDF 다운')}
                  </PDFDownloadLink>
                </div>
                <button onClick={postData} style={{ display: isWorkBook.title === undefined ? 'block' : 'none' }}>저장하기</button>
              </div>
            </div>
            <div className="button-bottom-container">
              <div className="button-selection">
                <button onClick={handleQuestion} style={{ textDecoration: isCommentaryQuestion ? 'underline' : 'none' }}>문제</button>
                <button onClick={handleCommentary} style={{ textDecoration: isCommentary ? 'underline' : 'none' }}>해설지</button>
              </div>
              <div className="button-bottom-sub">
                <button id="button-shuffle" onClick={() => handleShuffle(isQuestion, setIsQuestion)}>문제 셔플</button>
                {/* <button>1쪽</button>
                <button style={{ marginLeft: '1%' }}>2쪽</button> */}
              </div>
            </div>
          </div>
          <Exam isQuestion={isQuestion} parseImages={parseImages} renderImages={renderImages} isCommentary={isCommentary} isCommentaryQuestion={isCommentaryQuestion} />
        </div>
      </LabExamContent>
    </>
  );
}
