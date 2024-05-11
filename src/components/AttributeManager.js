import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AttributeManager({ examId }) {
    const [attributes, setAttributes] = useState([{ name: '난이도', values: ['상', '중', '하'] }]); // 속성,태그에 대한 default을 설정한다.
    const [examTitle, setExamTitle] = useState('');
    const [isShowModal, setIsShowModal] = useState(attributes.map(() => false)); 
    // 선택한 속성에 대한 모달을 띠우기 위해 배열로 만드며 false로 초기화한다.



    useEffect(() => {
        if (examId) {
            axios.get(`/api/v1/exams/${examId}`)
                .then(response => {
                    const { exam_title, tags } = response.data;
                    const attributesArray = Object.entries(tags).map(([name, values]) => ({ name, values }));
                    setAttributes(attributesArray);
                    setExamTitle(exam_title);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [examId]);

    const handleExamTitleChange = (event) => {
        setExamTitle(event.target.value);
    };
    

    const handleAttributeChange = (index, event) => {
        const newAttributes = [...attributes];
        newAttributes[index].name = event.target.value;
        setAttributes(newAttributes);
    };

    const handleTagChange = (attributeIndex, tagIndex, event) => {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].values[tagIndex] = event.target.value;
        setAttributes(newAttributes);
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', values: [''] }]);
    };

    const handleAddTag = (index) => {
        const newAttributes = [...attributes];
        newAttributes[index].values.push('');
        setAttributes(newAttributes);
    };

    const handleDeleteAttribute = (index) => {
        const newAttributes = [...attributes];
        newAttributes.splice(index, 1);
        setAttributes(newAttributes);
    };

    // 속성 삭제 메세지 창에 대한 모달 상태 제어
    // 해당 속성에 대한 모달창이 뜰 수 있게 해당 index만 true로 설정한다.
    const handleDeleteConfirm = (index) => {
        const newIsShowModal = [...isShowModal]; 
        newIsShowModal[index] = true; // 해당 인덱스의 모달 표시 여부를 true로 설정
        setIsShowModal(newIsShowModal);
    };

    // 모든 모달 닫기
    const handleCloseModal = () => {
        setIsShowModal(attributes.map(() => false)); 
    };

    const handleDeleteTag = (attributeIndex, tagIndex) => {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].values.splice(tagIndex, 1);
        setAttributes(newAttributes);
    };

    // 시험 제목과 속성, 태그들을 생성한다.
    const handleExamDataSubmit = () => {
        const data = {
            exam_title: examTitle,
            tags: {}
        };

        attributes.forEach((attribute) => {
            data.tags[attribute.name] = attribute.values.filter(tag => tag.trim() !== '');
        });

        axios.post('/api/v1/exams', data)
            .then(response => {
                console.log('success', response.data);
            })
            .catch(error => {
                console.error('error', error);
            });
    };

    // 시험 제목과 속성, 태그들을 업데이트한다.
    const handleUpdateExamData = () => {
        const data = {
            exam_title: examTitle,
            tags: {}
        };
    
        attributes.forEach((attribute) => {
            data.tags[attribute.name] = attribute.values.filter(tag => tag.trim() !== '');
        });
    
        axios.put(`/api/v1/exams/${examId}`, data) 
            .then(response => {
                console.log('success', response.data);
            })
            .catch(error => {
                console.error('error', error);
            });
    };

    // 속성과 태그의 input에 스페이스바 입력을 막는다.
    const handleSpaceKeyPress = (event) => {
        if (event.key === ' ') {
            event.preventDefault();
        }
    };
    
    

    return (
        <div>
            <input value={examTitle} onChange={handleExamTitleChange} placeholder="시험지 제목" />
            {attributes.map((attribute, index) => (
                <div key={index}>
                    <input 
                        value={attribute.name} 
                        onChange={(event) => handleAttributeChange(index, event)} 
                        placeholder="속성" 
                        onKeyDown={(event) => handleSpaceKeyPress(event)}
                    />

                    {attribute.values.map((value, tagIndex) => (
                        <div key={tagIndex}>
                            <input 
                                value={value} 
                                onChange={(event) => handleTagChange(index, tagIndex, event)} 
                                placeholder="태그" 
                                onKeyDown={(event) => handleSpaceKeyPress(event)}
                            />

                            <button onClick={() => handleDeleteTag(index, tagIndex)}>태그 삭제</button>
                        </div>
                    ))}
                    <p> 속성과 태그를 입력하세요. 예시: 난이도(상중하), 주차(1,2,3) </p>
                    <button onClick={() => handleAddTag(index)}>태그 추가</button>
                    <button onClick={()=> handleDeleteConfirm(index) }>속성 삭제</button>
                    {isShowModal[index] &&  // 배열에서 해당 인덱스의 모달 표시 여부를 확인
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 5,
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                            }}>
                                <h3>속성 삭제시, 모든 문제에 대한 속성이 삭제됩니다. 진행하시겠습니까?</h3>
                                <button onClick={() => { handleDeleteAttribute(index); handleCloseModal(); }}>삭제하기</button>
                                <button onClick={handleCloseModal}>취소</button>
                            </div>
                        </div>
                    }


                </div>
            ))}
            <button onClick={handleAddAttribute}>속성 추가</button>
            <div>
                <button onClick={handleExamDataSubmit}>저장</button>
                <button onClick={handleUpdateExamData} >수정하기</button>
            </div>
        </div>
    );
}
