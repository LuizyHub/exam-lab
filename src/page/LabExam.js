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
import shuffle_Icon from "../img/shuffle_icon.svg"


const LabExamContainer = styled.div`
`;

const LabExamContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 320px;
  margin-right: 18%;
  margin-top: 16px;
  transition: margin-left 0.3s ease;
`;


const PageIntroContainer = styled.div`
  top:0;
  width: 100%;
  height: 120px;
  background: linear-gradient(102.06deg, #E0F9F8 12.5%, #E2E6FA 98.35%);
  margin-top: 0px;

`;

const PageIntroContent = styled.div`
  margin-left: 320px;
  margin-top: 16px;
`;



const StepsContainer = styled.div`
    display: flex;
`;

const StepBy = styled.div`
    margin-top: 26px;

`;

const StepButton = styled.button`
    background-color : #29B8B5;    
    color: #3E3F41;
    border: 1.5px solid #29B8B5;
    border-radius: 8px;
    padding: 5px 8px;
    flex: 1; 
    width: 250px;
    height: 65px;
    font-size: 18px;
    margin: 0 10px;
    margin-left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StepNumberStyle = styled.p`
    color : #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0px;
    font-weight: bold;
`;

const StepTitle = styled.p`
    font-size: 16px;
    font-weight: 500;
    color : #FFFFFF;
    margin-top: 6px;
    margin-bottom: 10px;
`;

const NextStepIcon = styled.img`
    width: 18px;
    margin: 3px 10px;
    margin-top: 20px;
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NanumGothic-Regular',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  image: {
    width: '30%',
    height: 'auto',
    marginBottom: 5,
  },
  buttonPdf: {
    textDecoration: 'none',
    color: '#24ABA8',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '123px',
    height: '39px',
  },
});


const PdfDocument = ({ pdfTitle, isQuestion, isCommentaryQuestion}) => {
  const [reloadImage, setReloadImage] = useState({}); // 이미지 재로드 상태 추가

  // 이미지 로드 오류 처리 함수 추가
  const handleImageError = (index) => {
    setReloadImage((prevState) => ({
      ...prevState,
      [index]: (prevState[index] || 0) + 1
    }));
  };

  // Divide questions into two separate arrays for two columns
  const halfIndex = Math.ceil(isQuestion.length / 2);
  const firstColumnQuestions = isQuestion.slice(0, halfIndex);
  const secondColumnQuestions = isQuestion.slice(halfIndex);

  return (
    <Document>
      {isCommentaryQuestion ? (
        // 문제 페이지
      <Page size="A4" style={[styles.page]} wrap>
        <Text style={styles.title}>{pdfTitle}</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* First Column */}
          <View style={{ flex: 1 }}>
            {firstColumnQuestions.map((question, index) => (
              <View key={index} style={styles.section}>
                <Text>{index + 1}. {question.question}</Text>
                {question.question_images_out && question.question_images_out.length > 0 && (
                  question.question_images_out.map((image, imageIndex) => (
                    image.url ? (
                      <View key={imageIndex} style={{ width: '100%' }}>
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
          </View>

          {/* Second Column */}
          <View style={{ flex: 1 }}>
            {secondColumnQuestions.map((question, index) => (
              <View key={index + halfIndex} style={styles.section}>
                <Text>{index + halfIndex + 1}. {question.question}</Text>
                {question.question_images_out && question.question_images_out.length > 0 && (
                  question.question_images_out.map((image, imageIndex) => (
                    image.url ? (
                      <View key={imageIndex} style={{ width: '100%' }}>
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
          </View>
        </View>
      </Page>
          ) : ( // 해설 페이지
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
  const { selectedQuestions, workbookId, workbookPage } = location.state;
  

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
    <div>
      {workbookPage ? 
        (<div> 
          <PageIntroContainer>
              <PageIntroContent>
                  <StepsContainer>
                          <StepBy>
                              <StepButton> 
                              <div>
                                  <StepNumberStyle> Step 1 </StepNumberStyle>
                                  <StepTitle>시험지 선택</StepTitle>
                              </div>
                              </StepButton>
                          </StepBy>

                              <StepBy>
                                  <NextStepIcon src="/img/polygon_icon.svg" alt="polygon Icon" />
                              </StepBy>
                              <StepBy>
                                  <StepButton>
                                  <div>
                                      <StepNumberStyle> Step 2 </StepNumberStyle>
                                      <StepTitle>PDF 다운로드 </StepTitle>
                                  </div>
                                  </StepButton>
                              </StepBy>
                  </StepsContainer>
              </PageIntroContent>
          </PageIntroContainer>
        
        </div>) : (
      <PageIntroContainer>
              <PageIntroContent>
                  <StepsContainer>
                          <StepBy>
                              <StepButton> 
                              <div>
                                  <StepNumberStyle> Step 1 </StepNumberStyle>
                                  <StepTitle>시험 종류 선택</StepTitle>
                              </div>
                              </StepButton>
                          </StepBy>

                              <StepBy>
                                  <NextStepIcon src="/img/polygon_icon.svg" alt="polygon Icon" />
                              </StepBy>
                              <StepBy>
                                  <StepButton>
                                  <div>
                                      <StepNumberStyle> Step 2 </StepNumberStyle>
                                      <StepTitle>문제 검색 및 선택</StepTitle>
                                  </div>
                                  </StepButton>
                              </StepBy>
                              <StepBy>
                                  <NextStepIcon src="/img/polygon_icon.svg" alt="polygon Icon" />
                              </StepBy>
                              <StepBy>
                                  <StepButton>
                                  <div>
                                      <StepNumberStyle> Step 3 </StepNumberStyle>
                                      <StepTitle>나만의 시험지 제작 완료</StepTitle>
                                  </div>
                                  </StepButton>
                              </StepBy>
                  </StepsContainer>
              </PageIntroContent>
          </PageIntroContainer>
        )}
    <LabExamContainer>
      <LabExamContent>
        <SideBar />
        <NavigationBar />
        <div className="lab-exam">
          <div className="button-container">
            <div className="button-main">
              <div>
                <input className="title" placeholder="시험지 이름 입력" value={isWorkBook.title} onChange={handleInputChange} />
                <div id="button-pdf">
                  <PDFDownloadLink document={<PdfDocument  pdfTitle={isWorkBook.title} isQuestion={isQuestion} isCommentary={isCommentary} isCommentaryQuestion={isCommentaryQuestion} />} fileName={`${isWorkBook.title}.pdf`}  style={styles.buttonPdf}>
                    {/* 수정 */}
                    {({ loading }) => (
                      <span id="button">
                      {loading ? 'Loading...' : 'PDF 다운'}
                    </span>
                    )}
                  </PDFDownloadLink>
                </div>
                <button id="button-save" onClick={postData} style={{ display: isWorkBook.title === undefined ? 'block' : 'none', width: '123px', height: '39px' }}>저장하기</button>
              </div>
            </div>
            <div className="button-bottom-container">
              <div className="button-selection">
                <button onClick={handleQuestion} style={{ textDecoration: isCommentaryQuestion ? 'underline' : 'none' }}>문제</button>
                <button onClick={handleCommentary} style={{ textDecoration: isCommentary ? 'underline' : 'none' }}>해설지</button>
              </div>
              <div className="button-bottom-sub">
                <img src={shuffle_Icon} alt="shuffle_Icon"></img>
                <button id="button-shuffle" onClick={() => handleShuffle(isQuestion, setIsQuestion)}>문제 셔플</button>
                {/* <button>1쪽</button>
                <button style={{ marginLeft: '1%' }}>2쪽</button> */}
              </div>
            </div>
          </div>
          <Exam isQuestion={isQuestion} parseImages={parseImages} renderImages={renderImages} isCommentary={isCommentary} isCommentaryQuestion={isCommentaryQuestion} />
        </div>
      </LabExamContent>
    </LabExamContainer>
    </div>
  );
}