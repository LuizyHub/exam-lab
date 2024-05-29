import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import ShowQuestionList from "./ShowQuestionList";
import { NoneQuestionModal } from "../modals/SelectQuestionModal";
import styled from 'styled-components';


const Container = styled.div`
    border: 1px solid #ccc;
    width: 100%;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #262626;
`;

const ContainerTitle = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin-top: 24px;
    margin-left: 14px;
    margin-bottom: 5px;
`;

const SelectTitle = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-left: 14px;
    margin-bottom: 10px;
`;


const TagsContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
`;

const TagButton = styled.button`
    margin: 5px 10px; 
    background-color: ${({ $selected }) => $selected ? '#D9F1F1' : '#FFFFFF'};
    color: #2D2C2B;
    border: 0.5px solid ${({ $selected }) => $selected ? '#BADEDE' : '#EBEDEF'};
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;
    flex: 1; 
    width: 240px;
    height: 48px;
    font-size: 15px;
    font-weight: 500;
`;
    

const KeywordList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const KeywordContainer = styled.div`
    margin-bottom: 5px;
    display: flex;
    align-items: center;
`;

const KeywordTitle = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-left: 14px;
    margin-bottom: 0px;
`;

const KeywordInput = styled.input`
    width: 85%;
    height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 0;
    padding: 5px 15px;
    border : 1px solid #E2E8EE;
    border-radius: 4px;
    outline: none;
    font-size: 15px;
    font-weight: 500;
    transition: border-color 0.2s; 
    flex: 1;
    &:focus {
        border-color: #5BB6B4; 
    }
`;


const Keyword = styled.button`
    height: 36px;
    padding: 0px 20px;
    font-size: 15px;
    font-weight: 500;
    border: 1px solid #BADEDE;
    color: #262626;
    background-color: #D9F1F1;
    border-radius: 20px;
    margin-top: 10px;
    margin-left: 10px;
    transition: background-color 0.3s, transform 0.2s;
`;

const DeleteKeywordImg = styled.img`
    width: 8px;
    margin-left: 8px;
`;

const SearchImg = styled.img`
    width: 22px;
    height: 22px;
    position: relative;
    padding: 15px;
    top: 22px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:hover {
        border-color: #5BB6B4; 
      }
`;

const QuestionCount = styled.div`
    margin-bottom: 10px;
`;

const CountButton = styled.button`
  margin: 5px 6px;
  background-color: ${({ $selected }) => ($selected ? '#C6E7E7' : '#FFFFFF')};
  color: #2D2C2B;
  border: 0.5px solid ${({ $selected }) => ($selected ? '#C6E7E7' : '#E2E8EE')};
  border-radius: 4px;
  padding: 5px 8px;
  cursor: pointer;
  flex: 1;
  width: 160px;
  height: 48px;
  font-size:15px;
  font-weight: 500;
`;

const CountInput = styled.input`
  margin-left: 6px;
  width: 140px;
  height: 38px;
  background-color: ${({ $selected }) => ($selected ? '#C6E7E7' : '#FFFFFF')};
  color: #2D2C2B;
  border: 0.5px solid ${({ $selected }) => ($selected ? '#E2E8EE' : '#E2E8EE')};
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
  font-size:15px;
  font-weight: 500;
  &:focus {
    background-color: #C6E7E7;
    border-color: #5BB6B4; 
`;



const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: center; 
`;

const SubmitButton = styled.input`
    background-color: #29B8B5;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 10px;
    align-self: center;
    font-size:16px;
    font-weight: 600;
    width: 102px;
    hight: 37px;
    &:hover {
        background-color: #C6E7E7;
    }
`;

export default function SelectQuestion() {
    const location = useLocation(); 
    const { examId, examTitle } = location.state; // SelectExamPage.js에서 선택된 시험 받아온다.


    const [tags, setTags] = useState([]); // 태그 종류
    const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 종류
    const [search, setSearch] = useState(""); // 검색어
    const [keywords, setKeywords] = useState([]); // 검색 키워드
    const [selectedQuestionCount, setSelectedQuestionCount] = useState(20);// 선택된 문제 문항 수 
    const [customQuestionCount, setCustomQuestionCount] = useState(""); // 문항 수 직접 입력을 위한 상태 변수
    const [selectedCountType, setSelectedCountType] = useState('button'); // 선택된 문항 수 버튼 파악
    const [questions, setQuestions] = useState([]);
    const [showNoneQuestion, setShowNoneQuestion] = useState(false); // 에러 발생 시 NoneQuestion 보이기 여부를 관리하는 상태 추가
    
    

    // 태그 가져오기
    useEffect(() => {
        if (examId) {
            const fetchTag = async () => {
                try {
                    const response = await axios.get(`/api/v1/exams/${Number(examId)}`);
                    setTags(response.data.tags);
                } catch(error) {
                    console.error('Tags Error fetching data:', error);
                }
            };
            fetchTag();
        }
    }, [examId]);
    


    // 태그 선택
    const handleTagClick = (tagGroup, tag) => {
        const tagIndex = selectedTags.findIndex(item => item.tagGroup === tagGroup && item.tag === tag);
        if (tagIndex !== -1) {
            setSelectedTags(prevTags => prevTags.filter((item, index) => index !== tagIndex));
        } else {
            setSelectedTags(prevTags => [...prevTags, { tagGroup, tag }]);
        }
    }

    // 키워드 추가
    const handlePushKeyword = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && !e.nativeEvent.isComposing) {
            e.preventDefault();
            const trimmedSearch = search.replace(/\s+/g, ''); // 정규식을 사용하여 모든 공백 제거
            if (trimmedSearch !== '') { // 빈 문자열이 아닌 경우에만 추가
                setKeywords([...keywords, trimmedSearch]); // 입력된 단어를 키워드 배열에 추가
                setSearch(''); // 검색어를 초기화
            }
        }
    };    

  
    // 키워드 삭제
    const handelDeleteKeyword = (index) => { 
        const deleteKeywords = [...keywords];
        deleteKeywords.splice(index, 1); // 선택된 인덱스의 키워드를 제거
        setKeywords(deleteKeywords); // 변경된 키워드 배열을 업데이트
    }


    // CountInput onChange 이벤트 핸들러
    const handleCustomQuestionCountChange = (e) => {
        const value = e.target.value.trim(); // 입력된 값의 양 끝 공백 제거
        const numberValue = value === "" ? 0 : Number(value); // 문자열을 숫자로 변환
        setCustomQuestionCount(numberValue); 
        setSelectedQuestionCount(numberValue); // 선택된 문제 수도 업데이트
    }
    
    // CountInput 클릭 이벤트 핸들러
    const handleInputClick = () => {
        setSelectedCountType('input');  // CountInput 선택 상태 설정
    };

    // 문항 수 선택 핸들러
    const handleQuestionCountClick = (count) => {
        setSelectedCountType('button'); // CountButton 선택 상태 설정
        setSelectedQuestionCount(count); 
        setCustomQuestionCount(""); // CountInput 값 초기화
    }

    // 유형 정보 API 전달
    const handleSubmit = async (e) => {
        e.preventDefault();

        let URL = `/api/v1/exams/${Number(examId)}/questions?count=${Number(selectedQuestionCount)}`;

        // 태그 추가
        selectedTags.forEach(({ tagGroup, tag }) => {
            URL += `&tags_${tagGroup}=${tag}`;
        });

        // 검색어 추가
        if (keywords.length > 0) {
            keywords.forEach(include => {
                URL += `&includes=${include}`;
            });
        }

        console.log(URL);

        // API 호출
        // API 호출
        try {
            const response = await axios.get(URL);
            setQuestions(response.data.questions);
            console.log(response.data.questions);
        } catch (error) {
            if (error.response && error.response.status === 404) { // 404 에러 처리 
                setShowNoneQuestion(true);
                    
            } else {
                console.error("Error fetching questions:", error);
            }
        }   
        
    }

    return (
        <div>
            <Title>{examTitle}</Title>
            <Container>
                <ContainerTitle>문제 검색</ContainerTitle>
                <TagsContainer>
                    {Object.keys(tags).map(tagGroup => (
                        <div key={tagGroup}>
                            <SelectTitle>{tagGroup}</SelectTitle>
                            {tags[tagGroup].map(tag => (
                                <TagButton
                                    key={tag}
                                    $selected={selectedTags.some(item => item.tagGroup === tagGroup && item.tag === tag)}
                                    onClick={() => handleTagClick(tagGroup, tag)} >
                                    {tag}
                                </TagButton>
                            ))}
                        </div>
                    ))}
                </TagsContainer>
                <div>
                    <KeywordTitle>키워드 검색</KeywordTitle>
                    <KeywordInput
                        type="text"
                        value={search}
                        placeholder="원하는 문제의 키워드를 입력해주세요."
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handlePushKeyword}
                    />
                    <SearchImg
                        src="/img/검색돋보기.png"
                        alt="search Img"
                        onClick={handlePushKeyword}
                    />
                    <br />
                    <KeywordList>
                        {keywords.map((keyword, index) => (
                            <KeywordContainer key={index}>
                                <Keyword>
                                   {keyword} 
                                     <DeleteKeywordImg src="/img/x버튼.png" alt="delete img" onClick={() => handelDeleteKeyword(index)} />
                                </Keyword>
                            </KeywordContainer>
                        ))}
                    </KeywordList>
                </div>
                <br />
                <QuestionCount>
                    <SelectTitle> 문항수 </SelectTitle>

                    {/* 전체 검색 버튼 */}
                    <CountButton onClick={() => setSelectedQuestionCount(0)} $selected={selectedQuestionCount === 0 && selectedCountType === 'button'}> 전체 </CountButton>
                    

                    {/* 미리 정의된 문제 수 버튼 */}
                    {[10, 20, 30, 40].map(count => (
                        <CountButton
                        key={count}
                        type="button"
                        $selected={selectedQuestionCount === count && selectedCountType === 'button'}
                        onClick={() => handleQuestionCountClick(count)}
                        >
                        {count} 문항
                        </CountButton>
                    ))}

                     {/*숫자만 입력 가능하게*/}
                    {/* 숫자 입력란 */}
                    <CountInput
                    type="text" pattern="[0-9]*" 
                    value={customQuestionCount || ""}
                    placeholder={customQuestionCount === "" ? "직접 입력" : ""}
                    onChange={handleCustomQuestionCountChange}
                    onClick={handleInputClick} // 클릭 이벤트 핸들러 추가
                    $selected={selectedCountType === 'input'} // 선택된 상태에 따라 배경색 변경
                    />
  
                </QuestionCount>
                <br />  
                <SubmitButtonContainer>
                    <SubmitButton type="submit" value="문제 검색" onClick={handleSubmit} />
                </SubmitButtonContainer>

                </Container>
                {showNoneQuestion && <NoneQuestionModal onClose={() => setShowNoneQuestion(false)} />} 
            <ShowQuestionList questions={questions} questionsSize={questions.length}/>
        </div>
    );
    
}