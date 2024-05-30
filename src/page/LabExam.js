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
  margin-top: 0px;
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
  margin-top: 0px;
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
Font.register({
  family: 'NanumGothic-Bold',
  src: '/font/NanumGothic-Bold.ttf',
});
Font.register({
  family: 'NanumGothic-ExtraBold',
  src: '/font/NanumGothic-ExtraBold.ttf',
});


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NanumGothic-ExtraBold',
    marginTop: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    padding: 10,
    marginLeft: 8,
    marginRight: 17,
    marginTop: 0,
    flexGrow: 1,
    fontFamily: 'NanumGothic-Regular',
    fontSize: 10,
    width: '100%',
    height: 'auto',
    marginBottom: '15px',
  },
  questionText: {
    marginBottom: '15px'
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
  horizontalLine: {
    borderTop: '1.5px solid black', // 가로로 그어진 줄
    marginTop: 0,
    marginBottom: 15
  },
  verticalLine: {
    borderLeft: '1.5px solid black', // 세로로 그어진 줄
    height: '88%', // 페이지 높이만큼 세로로 그어집니다.
    position: 'absolute',
    marginTop: '65px',
    marginBottom: '10px',
    left: '50%', // 페이지의 가운데에 위치하도록 설정합니다.
  },
  tableContainer: {
    display: 'table',
    width: '100%',
    fontFamily: 'NanumGothic-Regular',
  },
   tableContainer: {
    display: 'table',
    width: '100%',
  },
  tableRow: {
    display: 'table-row',
  },
  tableCell: {
    display: 'table-cell',
    padding: '8px',
    border: '1px solid #000',
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  tableCellLast: {
    display: 'table-cell',
    padding: '5px',
    fontFamily: 'NanumGothic-Regular',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontFamily: 'NanumGothic-Regular',
  },
  // 격자 형식의 테이블 스타일
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row', // 가로로 출력
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  gridItem: {
    width: 'calc(20% - 20px)', // 패딩과 보더 등의 추가적인 공간을 고려하여 너비 조정
    height: '50px', // 임의로 높이 설정
    padding: '8px',
    boxSizing: 'border-box',
    marginLeft: '0px',
    marginRight: '0px'
  },
  
  gridContent: {
    width: '100%',
    height: '100%',
    border: '1px solid #000',
  },
  gridHeaderText: {
    fontWeight: 'bold',
    fontFamily: 'NanumGothic-Regular', // 폰트 추가
    fontSize: 12, // 폰트 크기 조정
  },
  answerText: {
    fontFamily: 'NanumGothic-Regular', // 폰트 추가
  },
  pageContent : {
    marginLeft: '15px',
    marginRight: '15px',
  }
});


const PdfDocument = ({ pdfTitle, isQuestion, isCommentaryQuestion }) => {
  const PAGE_SIZE = 5; // 각 페이지에 출력할 문제 수

  const [reloadImage, setReloadImage] = useState({}); // 이미지 재로드 상태 추가

  // 이미지 로드 오류 처리 함수 추가
  const handleImageError = (index) => {
    setReloadImage((prevState) => ({
      ...prevState,
      [index]: (prevState[index] || 0) + 1
    }));
  };

  // Divide questions into pages
  const pages = [];
  for (let i = 0; i < isQuestion.length; i += PAGE_SIZE * 2) {
    const firstColumnQuestions = isQuestion.slice(i, i + PAGE_SIZE);
    const secondColumnQuestions = isQuestion.slice(i + PAGE_SIZE, i + PAGE_SIZE * 2);
    pages.push({ firstColumnQuestions, secondColumnQuestions });
  }

  return (
    <Document>
      {isCommentaryQuestion ? (
        pages.map((page, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page} wrap>
            <Text style={styles.title}>{pdfTitle}</Text>
            <View style={styles.horizontalLine} /> {/* 가로로 그어진 줄 추가 */}
            <View style={{ flexDirection: 'row' }}>
              {/* First Column */}
              <View style={{ flex: 1, marginLeft:10, marginRight:20 }}>
                {page.firstColumnQuestions.map((question, questionIndex) => (
                  <View key={questionIndex} style={styles.section}>
                    <Text style={styles.questionText}>{pageIndex * PAGE_SIZE * 2 + questionIndex + 1}. {question.question}</Text>
                    {/* 이미지 출력 */}
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
  
                    {/* 문제에 해당하는 옵션들 출력 */}
                    {question.options.map((option, optionIndex) => (
                      <Text key={optionIndex} style={{marginBottom: '5px'}}>
                        {String.fromCharCode(9312 + optionIndex)} {option}
                      </Text>
                    ))}
  
                  </View>
                ))}
              </View>
              {/* Second Column */}
              <View style={{ flex: 1, marginLeft:10, marginRight:20 }}>
                {page.secondColumnQuestions.map((question, questionIndex) => (
                  <View key={questionIndex} style={styles.section}>
                    <Text style={styles.questionText}>{pageIndex * PAGE_SIZE * 2 + PAGE_SIZE + questionIndex + 1}. {question.question}</Text>
                    {/* 이미지 출력 */}
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
                    {/* 문제에 해당하는 옵션들 출력 */}
                    {question.options.map((option, optionIndex) => (
                      <Text key={optionIndex} style={{marginBottom: '5px'}}>
                        {String.fromCharCode(9312 + optionIndex)} {option}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.verticalLine} /> {/* 전체 페이지의 세로줄 */}
          </Page> 
        ))
      ) : ( // 해설 페이지
          <Page size="A4" style={[styles.page]} wrap>
            <Text style={styles.title}>{pdfTitle} 답안지</Text>
            <View style={styles.horizontalLine} />

            <View style={styled.pageContent}>
            {/* 테이블 형식으로 답과 해설을 표시하는 부분 */}
            <View style={styles.gridContainer}>
              {isQuestion.map((question, index) => (
                <View key={index} style={styles.gridItem}>
                  {/* 문제 번호와 답 */}
                  <View style={styles.gridContent}>
                    <Text style={styles.gridHeaderText}>{index + 1}.</Text>
                    <Text style={styles.answerText}> {String.fromCharCode(9311 + parseInt(question.answers))}</Text>
                  </View>
                </View>
              ))}
            </View>



            <View style={styles.tableContainer}>
              {isQuestion.map((question, index) => (
                <View key={index} style={styles.tableRow}>

                  
                  {/* 해설 */}
                  <View style={styles.tableCellLast}>
                  <Text style={styles.tableHeaderText}> {index + 1}. </Text>
                    <Text style={styles.tableHeaderText}>해설</Text>
                    <Text>{question.commentary}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>

    
    
      )}
    </Document>
  );
}





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