import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import ShowQuestionList from "./ShowQuestionList";
import "../css/SelectQuestion.css";


export default function SelectQuestion() {
  
    const location = useLocation(); // SelectExamPage.js에서 선택된 시험 받아오기
    const { examId, examTitle } = location.state;

    // console.log(examId, examTitle);

    const [tags, setTags] = useState([]); // 태그 종류
    const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 종류
    const [search, setSearch] = useState(""); // 검색어
    const [keywords, setKeywords] = useState([]); // 검색 키워드
    const [selectedQuestionCount, setSelectedQuestionCount] = useState(20);// 선택된 문제 문항 수 
    const [questions, setQuestions] = useState([]);
    const [showCustomCountInput, setShowCustomCountInput] = useState(false); // "기타" 버튼을 클릭했는지 여부


    // 태그 가져오기
    useEffect(() => {
      if (examId) {
        const fetchTag = async () => {
          try {
            console.log(examId)
            const response = await axios.get(`/api/v1/exams/${Number(examId)}`);
            setTags(response.data.tags);
          } catch(error) {
            console.error('Tags Error fetching data:', error);
          }
        };
        fetchTag();
      }
    }, [examId]);
    
    // 키워드 추가
    const handlePushKeyword = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        if (!e.nativeEvent.isComposing) { 
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

    // 태그 선택
    const handleTagClick = (tagGroup, tag) => {
        const tagIndex = selectedTags.findIndex(item => item.tagGroup === tagGroup && item.tag === tag);
        if (tagIndex !== -1) {
            setSelectedTags(prevTags => prevTags.filter((item, index) => index !== tagIndex));
        } else {
            setSelectedTags(prevTags => [...prevTags, { tagGroup, tag }]);
        }
    }

    // 문항 수 선택
    const handleQuestionCountClick = (e) => {
        const count = e.target.value;
        if (count === "기타") {
            setShowCustomCountInput(true);
        } else {
            setSelectedQuestionCount(parseInt(count));
        }
    }

    // 커스텀 문항 수 입력
    const handleCustomQuestionCountChange = (e) => {
        setSelectedQuestionCount(parseInt(e.target.value));
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

        if (response.data.questions.length === 0) {
            alert("해당 문제가 없습니다.");
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}
    
    
    
    return(
        <div className="select-question-container">
            <div>
                <h1 style={{ textAlign: 'center' }}>{examTitle}</h1>
                <div className="tags">
                {Object.keys(tags).map(tagGroup => (
                    <div key={tagGroup}>
                        <span>{tagGroup} </span>
                        {tags[tagGroup].map(tag => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagClick(tagGroup, tag)} // 수정된 부분
                                className={selectedTags.some(item => item.tagGroup === tagGroup && item.tag === tag) ? "selected-tag" : ""}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                ))}

                </div>
                <div className="selectWord-container">
                    <span>검색어  </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handlePushKeyword}
                    />
                    <br />
                    <div className="keyword-list">
                        {keywords.map((keyword, index) => (
                            <div key={index} className="keyword-container">
                                <span className="keyword">{keyword}</span>
                                <button type="button" onClick={()=> handelDeleteKeyword(index)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>

                <br />
                <div className="question-count">
                    <span>문항수  </span>
                    {[5, 10, 15, 20, "기타"].map(count => (
                        <button 
                            key={count}
                            value={count}
                            onClick={handleQuestionCountClick}
                            className={selectedQuestionCount === count ? "selected-count" : ""}
                        >
                            {count}
                        </button>
                    ))}
                    {showCustomCountInput && (
                        <input
                            type="number"
                            value={selectedQuestionCount}
                            placeholder="직접 입력하기"
                            onChange={handleCustomQuestionCountChange}
                        />
                    )}
                </div>
                <br />  
                <input type="submit" onClick={handleSubmit} value="문제 보기" />
            </div>
            <hr />
            <ShowQuestionList questions={questions}/>
        </div>
    );
}
