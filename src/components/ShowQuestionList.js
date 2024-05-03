import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import ShowQuestion from "./ShowQuestion";
import { selectedQuestionsState } from "../recoil/atoms"; // Importing selectedQuestionsState atom
import '../css/ShowQuestionList.css';

export default function ShowQuestionList({ questions }) {
    const navigate = useNavigate();
    const [selectedQuestions, setSelectedQuestions] = useRecoilState(selectedQuestionsState);

    useEffect(() => {
        setSelectedQuestions(questions.map((q) => ({ ...q, isSelected: false })));
    }, [questions, setSelectedQuestions]);

    const handleSelectQuestion = (item) => {
        setSelectedQuestions((prevSelectedQuestions) =>
            prevSelectedQuestions.map((q) =>
                q.id === item.id ? { ...q, isSelected: !q.isSelected } : q
            )
        );
    };

    const handleSubmitQuestion = () => {
        const selectedItems = selectedQuestions.filter((q) => q.isSelected);
        navigate("../workbooks/create", { state: { selectedQuestions: selectedItems } });
    };

    return (
        <div>
            <button onClick={handleSubmitQuestion} style={{ padding: '10px 20px', backgroundColor: '#5BB6B4', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}>시험지 생성</button>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 8, height: '100vh', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                    {Array.isArray(questions) && questions.length > 0 ? (
                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', listStyle: 'none', padding: 0 }}>
                            {selectedQuestions.map((item, index) => (
                                <li key={index} style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={item.isSelected} onChange={() => handleSelectQuestion(item)} />
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
                        <p style={{ textAlign: 'center' }}>원하는 문제를 선택해주세요.</p>
                    )}

                    {selectedQuestions.filter((q) => q.isSelected).length > 0 && (
                        <div>
                            <h2>선택된 문제들</h2>
                            <ul>
                                {selectedQuestions.filter((q) => q.isSelected).map((item, index) => (
                                    <li key={index}>{item.question}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
