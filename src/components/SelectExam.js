import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SelectExam.css';
import axios from 'axios';

export default function SelectExam() {
  const navigate = useNavigate();
  const [selectedExamType, setSelectedExamType] = useState(); //시험지 종류
  const [selectedSubExamType, setSelectedSubExamType] = useState(); // 세부 시험지 종류
  const [tags, setTags] = useState([]); // 태그 종류
  const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 종류
  const [search, setSearch] = useState(""); // 검색어
  const [keywords, setKeywords] = useState([]); // 검색 키워드
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(20);// 선택된 문제 문항 수 
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부


  // 태그 가져오기
  useEffect(() => {
    if (selectedSubExamType) {
      // API 요청을 보내서 태그 데이터를 가져옴
      axios.get(`http://54.180.211.174/api/v1/exams/${Number(selectedSubExamType)}/type`)
        .then(response => {
          console.log(response.data.tags)
          setTags(response.data.tags); // 태그 데이터 설정
        })
        .catch(error => {
          console.error('Tags Error fetching data:', error);
        });
    }
  }, [selectedSubExamType]); // selectedSubExamType가 바뀔 때마다 실행되도록 설정



  // 모달 열기
   const openModal = () => {
    setShowModal(true);
  }

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedTags([]); // 선택된 태그 초기화
    setKeywords([]); // 키워드 초기화
    setSelectedQuestionCount(20); // 문항수 초기화

  }

  // 시험지 종류 선택
  const handleExamTypeClick = (e) => {
    setSelectedExamType(e.target.value);
  }

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
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    } else {
        setSelectedTags([...selectedTags, tag]);
    }
  }

  // 문항 수 선택
  const handleQuestionCountClick = (e) => {
    e.preventDefault();
    setSelectedQuestionCount(parseInt(e.target.textContent));
  }

  // 제출  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const format_info = {
      exam_title: selectedExamType,
      exam_id: Number(selectedSubExamType),
      tags: selectedTags,
      includes: keywords,
      count: Number(selectedQuestionCount),
    };
  
    // console.log(format_info);

    let url = `http://54.180.211.174/api/v1/exams/${Number(selectedSubExamType)}/questions?count=${format_info.count}`;

    // 태그 추가
    if (format_info.tags.length > 0) {
      format_info.tags.forEach(tag => {
        url += `&tags=${tag}`;
      });
    }

    // 포함어 추가
    if (format_info.includes.length > 0) {
      format_info.includes.forEach(include => {
        url += `&includes=${include}`;
      });
    }
    
    console.log(url);


    // 유형 정보 API 전달
    axios.post(url, format_info)
      .then((response) => {
        console.log(response.data);
        navigate(url);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  
  return (
    <div>
       <div className="examList">
        <button value="운전면허" onClick={handleExamTypeClick} >운전면허</button>
        <button value="수능">수능</button>
        <button value="컴퓨터활용능력">컴퓨터활용능력</button>
      </div>
   
    <form action="" onSubmit={handleSubmit} >
     
    
      {selectedExamType && (
          <select onChange={(e)=> {setSelectedSubExamType(e.target.value); openModal(); }}>
            <option value="">선택</option>
            <option value={1}>1종 보통</option>
            <option value={2}>2종 보통</option>
            <option value={3}>대형</option>
            <option value={4}>특수</option>
            <option value={5}>소형</option>
            <option value={6}>원동기</option>
          </select>
        )}
      
        {showModal && (
          <div className="modal" >
            <div className="modal-content">
            <button onClick={closeModal}> X </button>
            <br />
            <span> 태그 </span>
            <div className="tags">
            {tags.map(tag => (
              <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  style={{ backgroundColor: selectedTags.includes(tag) ? "blue" : "initial" }}
              >
                  #{tag}
              </button>
             ))}
            </div>
            <span> 검색어 </span>
            <input type="text" value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handlePushKeyword}/>
            <br />
            {keywords.map((keyword, index) => (
              <div key={index} >
                <span className="keyword">{keyword} </span>
                <button type="button" onClick={()=> handelDeleteKeyword(index)}>x</button>
              </div>
            ))}
            <br />
            <span>문항수 </span>
            <div>
            {[5, 10, 15, 20].map(count => (
                <button 
                  key={count}
                  value={count}
                  onClick={handleQuestionCountClick}
                  style={{backgroundColor: selectedQuestionCount === count ? "blue" : "initial"}}
                >{count}</button>
                ))}
             </div>

              <br />  
              <input type="submit" value="시험지 생성" />
            </div>
          </div>
        )}
    </form>
    </div>
  )
}

