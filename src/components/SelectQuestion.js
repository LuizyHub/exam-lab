import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import ShowQuestionList from "./ShowQuestionList";
import styled from 'styled-components';


const Container = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
`;

const Title = styled.h1`
    text-align: center;
`;

const TagsContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;

`;

const TagButton = styled.button`
    margin: 5px 10px; 
    background-color: ${({ selected }) => selected ? '#EDFAFA' : '#FFFFFF'};
    color: #2D2C2B;
    border: 0.5px solid ${({ selected }) => selected ? '#C6E7E7' : '#E2E8EE'};
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;
    flex: 1; 
    width: 220px;
    height: 45px;
    font-size: 14px;
    &:hover {
        background-color: #C6E7E7;
    }
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

const KeywordInput = styled.input`
    width: 85%;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 5px 15px;
    border : 1px solid #E2E8EE;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s; 
    flex: 1;
    &:focus {
        border-color: #5BB6B4; 
    }
`;


const Keyword = styled.button`
    height: 25px;
    padding: 0 10px;;
    font-size: 12px;
    border: 1px solid #C6E7E7;
    background-color: #EDFAFA;
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
    width: 18px;
    position: relative;
    padding: 6px;
    top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const QuestionCount = styled.div`
    margin-bottom: 10px;
`;

const CountButton = styled.button`
  margin: 5px 10px;
  background-color: ${({ selected }) => (selected ? '#EDFAFA' : '#FFFFFF')};
  color: #2D2C2B;
  border: 0.5px solid ${({ selected }) => (selected ? '#C6E7E7' : '#E2E8EE')};
  border-radius: 4px;
  padding: 5px 8px;
  cursor: pointer;
  flex: 1;
  width: 150px;
  height: 45px;
  font-size: 14px;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#C6E7E7' : '#E2E8EE')};
  }
`;

const CountInput = styled.input`
  margin-left: 10px;
  width: 150px;
  height: 35px;
  background-color: ${({ selected }) => (selected ? '#E8F6F6' : '#FFFFFF')};
  color: #2D2C2B;
  border: 0.5px solid ${({ selected }) => (selected ? '#E2E8EE' : '#E2E8EE')};
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  width: 130px;
  text-align: center;

  &:focus {
    background-color: #E2E8EE;
  }
`;



const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: center; 
`;

const SubmitButton = styled.input`
    background-color: #5BB6B4;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 10px;
    align-self: center;

    &:hover {
        background-color: #C6E7E7;
    }
`;

export default function SelectQuestion() {
    const location = useLocation(); // SelectExamPage.js에서 선택된 시험 받아오기
    const { examId, examTitle } = location.state;


    const [tags, setTags] = useState([]); // 태그 종류
    const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 종류
    const [search, setSearch] = useState(""); // 검색어
    const [keywords, setKeywords] = useState([]); // 검색 키워드
    const [selectedQuestionCount, setSelectedQuestionCount] = useState(20);// 선택된 문제 문항 수 
    const [customQuestionCount, setCustomQuestionCount] = useState(""); // 문항 수 직접 입력을 위한 상태 변수
    // 미리 정의된 문항 수 버튼을 위한 상태 변수
    const [selectedPredefinedCount, setSelectedPredefinedCount] = useState(selectedQuestionCount);
    const [selected, setSelected] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [showCustomCountInput, setShowCustomCountInput] = useState(false); // "기타" 버튼을 클릭했는지 여부

    // 태그 가져오기
    useEffect(() => {
        if (examId) {
            const fetchTag = async () => {
                try {
                    const response = await axios.get(`/api/v1/exams/${Number(examId)}`);
                    setTags(response.data.tags);
                } catch (error) {
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
        if ((e.key === 'Enter' || e.type === 'click' || e.key === ' ') && !e.nativeEvent.isComposing) {
            e.preventDefault();
            if (search.trim() !== '') {
                setKeywords([...keywords, search.trim()]); // 입력된 단어를 키워드 배열에 추가
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



    const handleCustomQuestionCountChange = (e) => {
        const value = e.target.value.trim(); // 입력된 값의 양 끝 공백 제거
        const numberValue = value === "" ? 0 : Number(value); // 문자열을 숫자로 변환
        setCustomQuestionCount(numberValue); // 상태 업데이트
        setSelectedQuestionCount(numberValue); // 선택된 문제 수도 업데이트
    }





    // 문항 수 선택 핸들러
    const handleQuestionCountClick = (count) => {
        setSelectedQuestionCount(count);
        setSelectedPredefinedCount(count);
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
        try {
            const response = await axios.get(URL);
            console.log(response.data.questions);
            setQuestions(response.data.questions);
        } catch (error) {
            if (error.response && error.response.status === 404) { // 404 에러 처리
                alert("해당 문제가 없습니다.");
            } else {
                console.error("Error fetching questions:", error);
            }
        }
    }

    return (
        <div>
            <Title>{examTitle}</Title>
            <Container>
                <TagsContainer>
                    {Object.keys(tags).map(tagGroup => (
                        <div key={tagGroup}>
                            <p>{tagGroup}</p>
                            {tags[tagGroup].map(tag => (
                                <TagButton
                                    key={tag}
                                    selected={selectedTags.some(item => item.tagGroup === tagGroup && item.tag === tag)}
                                    onClick={() => handleTagClick(tagGroup, tag)}
                                >
                                    {tag}
                                </TagButton>
                            ))}
                        </div>
                    ))}
                </TagsContainer>
                <div>
                    <p> 키워드 검색  </p>
                    <KeywordInput
                        type="text"
                        value={search}
                        placeholder="원하는 문제의 태그를 입력해주세요."
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
                    <p> 문제 갯수 </p>
                    <div style={{ display: 'inline-flex' }}>
                        {/* <button>
                                        <CountInput
                            type="number"
                            value={customQuestionCount}
                            placeholder="직접 입력"
                            onChange={handleCustomQuestionCountChange}
                            min={1}
                        />
                        </button> */}
                    </div>
                    {/*숫자만 입력 가능하게*/}
                    <CountInput
                        type="text" pattern="[0-9]*"
                        value={customQuestionCount || ""}
                        placeholder={customQuestionCount === "" ? "직접 입력" : ""}
                        onChange={handleCustomQuestionCountChange}
                        min={1}
                        onClick={() => setSelectedQuestionCount(parseInt(customQuestionCount))}
                    />


                    {[10, 20, 30, 40].map(count => (
                        <CountButton
                            key={count}
                            type="button"
                            selected={selectedPredefinedCount === count}
                            onClick={() => handleQuestionCountClick(count)}
                        >
                            {count} 문제
                        </CountButton>
                    ))}

                    {/* 전체 검색 */}
                    {/* <CountButton onClick={() => setSelectedQuestionCount(0)} selected={selectedQuestionCount === 0}> 전체 </CountButton> */}
                </QuestionCount>
                <br />
                <SubmitButtonContainer>
                    <SubmitButton type="submit" value="문제 검색" onClick={handleSubmit} />
                </SubmitButtonContainer>

            </Container>
            <ShowQuestionList questions={questions} />
        </div>
    );

}