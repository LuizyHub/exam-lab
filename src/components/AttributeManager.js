import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AttributeManager() {
    const [examTitle, setExamTitle] = useState(''); // 시험지 제목
    const [newAttribute, setNewAttribute] = useState(''); // 새로 추가될 속성
    const [attributes, setAttributes] = useState([{ name: '', tags: [''] }]); // 속성(속성 이름과 태그 배열)
    const [isUpdate, setIsUpdate] = useState(false); // 업데이트 여부

    useEffect(() => {
        // 데이터가 업데이트되면 setIsUpdate를 false로 설정하여 다음 저장을 추가로 저장으로 처리합니다.
        if (isUpdate) {
            setIsUpdate(false);
        }
    }, [attributes, examTitle]);

    // 시험지 제목 저장
    const handleTitleChange = (event) => {
        setExamTitle(event.target.value);
    };

    // 속성 배열에 새로운 속성과 태그들 저장한다.
    const handleAddAttribute = () => {
        const newTags = ['']; // 기본적으로 빈 태그 입력칸을 하나 생성
        setAttributes([...attributes, { name: newAttribute, tags: newTags }]);
        setNewAttribute(''); // 새로운 속성이 추가되면 초기화한다.
    };

    // 해당 속성의 태그를 추가한다.
    const handleAddTag = (index) => {
        const newAttributes = [...attributes];
        newAttributes[index].tags.push(''); // 해당 인덱스의 속성의 태그 배열에 빈 문자열을 추가
        setAttributes(newAttributes);
    };

    // 태그의 변화를 저장한다.
    const handleTagChange = (attributeIndex, tagIndex, event) => {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].tags[tagIndex] = event.target.value;
        setAttributes(newAttributes);
    };

    // 속성을 삭제한다.
    const handleDeleteAttribute = (index) => {
        const newAttributes = [...attributes];
        newAttributes.splice(index, 1);
        setAttributes(newAttributes);
    };

    // 태그를 삭제한다.
    const handleDeleteTag = (attributeIndex, tagIndex) => {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].tags.splice(tagIndex, 1);
        setAttributes(newAttributes);
    };

    const handleExamDataSubmit = () => {
        const examData = {
            myExam: [
                {
                    exam_title: examTitle,
                    attributes: attributes.map((attribute) => ({
                        attribute_name: attribute.name,
                        attribute_tags: attribute.tags,
                    })),
                },
            ],
        };

        // 데이터가 존재할 경우, update 요청을 수행합니다.
        if (isUpdate) {
            axios.put('http://localhost:3001/myExam', examData)
                .then(response => {
                    console.log('success', response.data);
                })
                .catch(error => {
                    console.error('error', error);
                });
        } else { // 데이터가 없는 경우에는 post 요청을 수행합니다.
            axios.post('http://localhost:3001/myExam', examData)
                .then(response => {
                    console.log('success', response.data);
                    setIsUpdate(true); // 저장 후 다음에는 업데이트로 처리하기 위해 설정합니다.
                })
                .catch(error => {
                    console.error('error', error);
                });
        }
    };

    return (
        <div>
            <input onChange={handleTitleChange} value={examTitle} placeholder="시험지 제목" />
            <p>시험지 속성 설정하기</p>
            {attributes.map((attribute, attributeIndex) => (
                <div key={attributeIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <input value={attribute.name} onChange={(event) => {
                        const newAttributes = [...attributes];
                        newAttributes[attributeIndex].name = event.target.value;
                        setAttributes(newAttributes);
                    }} placeholder="속성" />
                    {attribute.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} style={{ display: 'flex', alignItems: 'center' }}>
                            <input value={tag} onChange={(event) => handleTagChange(attributeIndex, tagIndex, event)} placeholder="태그" style={{ marginLeft: '8px' }} />
                            <button onClick={() => handleDeleteTag(attributeIndex, tagIndex)} onMouseEnter={(event) => event.target.style.backgroundColor = 'red'} onMouseLeave={(event) => event.target.style.backgroundColor = ''}>X</button>
                        </div>
                    ))}

                    <button onClick={() => handleAddTag(attributeIndex)}>태그 추가</button>
                    <button onClick={() => handleDeleteAttribute(attributeIndex)}>속성 삭제</button>
                </div>
            ))}

            <div>
                <button onClick={handleAddAttribute}>속성 추가</button>
            </div>

            <button onClick={handleExamDataSubmit}>저장하기</button>
        </div>
    );
}
