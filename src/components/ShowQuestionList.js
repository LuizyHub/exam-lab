import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowQuestion from "./ShowQuestion";
import SelectedQuestionList from "./SelectedQuestionList";
import '../css/ShowQuestionList.css'


export default function ShowQuestionList({questions}){


    const navigate = useNavigate();
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [showSelectedList, setShowSelectedList] = useState(true);


     // 처음 렌더링될 때 모든 문제를 선택된 문제 리스트에 추가
     useEffect(() => {
        setSelectedQuestions(questions);
    }, [questions]);


     // 문제 선택 핸들러
     const handleSelectQuestion = (item) => {
        // 이미 선택된 문제인지 확인
        const isAlreadySelected = selectedQuestions.find(q => q.id === item.id);

        if (isAlreadySelected) {
            // 이미 선택되었다면, 선택 목록에서 제거
            setSelectedQuestions(selectedQuestions.filter(q => q.id !== item.id));
        } else {
            // 선택되지 않았다면, 선택 목록에 추가
            setSelectedQuestions([...selectedQuestions, item]);
        }
    };

    // 시험지 생성 버튼을 누르면, 선택된 문제 리스트가 LabExam으로 넘어간다. 
    const handleSubmitQuestion = () => {
        navigate('../lab', {state : {selectedQuestions}})

    }



return (
    <div>
         <button onClick={handleSubmitQuestion} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}>시험지 생성</button>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        
    {/* 선택된 문제 리스트 */}
    <div style={{ flex: 2, marginLeft: showSelectedList ? 0 : '-200px', transition: 'margin 0.3s', marginRight: '20px', listStylePosition: 'inside', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
       
        <button style={{ padding: '10px 0px', marginLeft: '300px'}} onClick={() => setShowSelectedList(!showSelectedList)}>
                    {showSelectedList ? 'X' : '+'}
                </button>
        <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #333', textAlign: 'center' }}>선택된 문제 리스트</h2>
        <ol style={{ padding: 0 }}>
        {selectedQuestions.map((item, index) => (
                            <li key={index} className="slide-item">
                                <ShowQuestion
                                    question={item.question}
                                    question_images_out={item.question_images_out}
                                    question_images_in={item.question_images_in}
                                    options={item.options}
                                    style={{ width: '50%', height: 'auto' }} // 스타일 추가하여 크기 조절
                                />
                            </li>
                        ))}
        </ol>
    </div>


    {/* 문제 고르기 */}
    <div style={{ flex: 8, height: '100vh', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
        <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #333', textAlign:'center' }}>문제 고르기</h2>
        {Array.isArray(questions) && questions.length > 0 ? (
            <ol style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', listStylePosition: 'inside', padding: 0 }}>
                {questions.map((item, index) => (
                    <li key={index} style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} onClick={() => handleSelectQuestion(item)}>
                        <ShowQuestion
                            question={item.question}
                            question_images_out={item.question_images_out}
                            question_images_in={item.question_images_in}
                            options={item.options}
                        />
                    </li>
                ))}
            </ol>
        ) : (
            <p style={{ textAlign: 'center' }}>원하는 문제를 선택해주세요.</p>
        )}
    </div>
</div>
</div>

);}
