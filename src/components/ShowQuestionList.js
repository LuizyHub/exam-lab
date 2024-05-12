import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowQuestion from "./ShowQuestion";
import '../css/ShowQuestionList.css';

export default function ShowQuestionList({ questions }) {
    const navigate = useNavigate();
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [showSelectedQuestions, setShowSelectedQuestions] = useState(false);
    const [showSelectedQuestionsCount, setShowSelectedQuestionsCount] = useState("");
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        const storedSelectedQuestions = localStorage.getItem("selectedQuestions");
        if (storedSelectedQuestions) {
            setSelectedQuestions(JSON.parse(storedSelectedQuestions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedQuestions", JSON.stringify(selectedQuestions));
        setShowSelectedQuestionsCount(selectedQuestions.length);
    }, [selectedQuestions]);

    const handleSelectQuestion = (item) => {
        const selectedIndex = selectedQuestions.findIndex((q) => q.id === item.id);
        if (selectedIndex === -1) {
            setSelectedQuestions([...selectedQuestions, item]);
        } else {
            setSelectedQuestions(selectedQuestions.filter((q) => q.id !== item.id));
        }
    };

    // 모든 문제를 선택된 문제로 설정
    const handleSelectAllQuestions = () => {
        const newQuestions = questions.filter(item => !selectedQuestions.some(q => q.id === item.id));
        setSelectedQuestions([...selectedQuestions, ...newQuestions]); 
    };


    const handleSubmitQuestion = () => {
        if(showSelectedQuestionsCount > 0) {
            navigate("../workbooks/create", { state: { selectedQuestions: selectedQuestions } });
        } else {
            alert("한 문제 이상 선택해야합니다.")
        }
    };

    return (
        <div>
            <button onClick={handleSubmitQuestion} style={{ padding: '10px 20px', backgroundColor: '#5BB6B4', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}>시험지 생성</button>
            <button onClick={handleSelectAllQuestions}>전체 선택</button>
            <button onClick={() => setShowSelectedQuestions(!showSelectedQuestions)}>선택된 문제 {showSelectedQuestionsCount}</button>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 8, height: '100vh', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                    {showSelectedQuestions === false ? (
                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', listStyle: 'none', padding: 0 }}>
                            {questions.map((item, index) => (
                                <li key={index} style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={selectedQuestions.some((q) => q.id === item.id)} onChange={() => handleSelectQuestion(item)} />
                                        <ShowQuestion
                                            question={item.question}
                                            question_images_out={item.question_images_out}
                                            question_images_in={item.question_images_in}
                                            options={item.options}
                                        />
                                    </label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <h2>선택된 문제들</h2>
                            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', listStyle: 'none', padding: 0 }}>
                                {selectedQuestions.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                         <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={selectedQuestions.some((q) => q.id === item.id)} onChange={() => handleSelectQuestion(item)} />
                                        <ShowQuestion
                                            question={item.question}
                                            question_images_out={item.question_images_out}
                                            question_images_in={item.question_images_in}
                                            options={item.options}
                                        />
                                    </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
