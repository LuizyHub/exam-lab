import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/attribute.css'
import { DeleteAttributeModal } from "../modals/DeleteModal";
import axios from 'axios';

export default function AttributeManager({ examId, setExamId }) {
    const [attributes, setAttributes] = useState([{ name: '난이도', values: ['상', '중', '하'] }]); // 속성,태그에 대한 default을 설정한다.
    const [examTitle, setExamTitle] = useState('');
    const [isShowModal, setIsShowModal] = useState(attributes.map(() => false));
    // 선택한 속성에 대한 모달을 띠우기 위해 배열로 만드며 false로 초기화한다.
    const [isState, setState] = useState(true);
    useEffect(() => {
        if (examId) {
        axios.get(`/api/v1/exams/${examId}`)
            .then(response => {
                const { exam_title, tags } = response.data;
                const attributesArray = Object.entries(tags).map(([name, values]) => ({ name, values }));
                setAttributes(attributesArray);
                setExamTitle(exam_title);
                if (exam_title !== 'undefined') {
                    setState(false);
                } else { 
                    setState(true);
                }
                console.log(exam_title)
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [examId]);//attributes

//     useEffect(() => {
//     if (examTitle === 'undefined') {
//       setState(false);
//     }
//   }, [examTitle]);

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
        setState(!isState);
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
                console.log('success', response.data.message);
                setExamId(response.data.message);
            })
            .catch(error => {
                console.error('error', error);
            });
    };

    // 시험 제목과 속성, 태그들을 업데이트한다.
    const handleUpdateExamData = () => {
        // setState(!isState);
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





    return (
        <div className='attribute-mgr'>
            <input className='title' value={examTitle} onChange={handleExamTitleChange} placeholder="시험지 제목" />
            <div className='server-button'>
                <button style={{width: '130px', marginRight: '20px'}}><Link to="http://localhost:3000/exams/create" style={{ color: 'inherit', textDecoration: 'inherit' }}>시험지 제작하기</Link></button>
                {/* <button id='server-button-save' onClick={handleExamDataSubmit}>저장</button>
                <button id='server-button-edit' onClick={handleUpdateExamData} >수정</button> */}
                {isState ? (
                    <button id='server-button-save' onClick={handleExamDataSubmit}>저장</button>
                ) : (
                    <button id='server-button-save' onClick={handleUpdateExamData} >수정</button>
                )}
            </div>
            <div className='attribute-input'>
                {attributes.map((attribute, index) => (

                    <div key={index}>
                        <div className='tag-input'>
                            <input
                                value={attribute.name}
                                onChange={(event) => handleAttributeChange(index, event)}
                                placeholder="속성"
                                style={{ width: '100px' }}
                            />

                            {attribute.values.map((value, tagIndex) => (
                                <div key={tagIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ backgroundColor: '#F5F5F7' }}>
                                        <input
                                            value={value}
                                            onChange={(event) => handleTagChange(index, tagIndex, event)}
                                            placeholder="태그"
                                            style={{ backgroundColor: 'transparent', width: '30px' }}
                                        />

                                        <button onClick={() => handleDeleteTag(index, tagIndex)} style={{ backgroundColor: 'transparent', borderStyle: 'none' }}>x</button>
                                    </div>
                                    <button style={{ backgroundColor: '#F5F5F7', borderStyle: 'none', marginLeft: '10px', marginRight: '10px', paddingTop: '3px', borderRadius: '50px' }} onClick={() => handleAddTag(index)}>+</button>
                                </div>
                            ))}
                            {/* <p> 속성과 태그를 입력하세요. 예시: 난이도(상중하), 주차(1,2,3) </p> */}
                        </div>

                        <div className='button-attribute'>
                            <button onClick={handleAddAttribute}>+ 속성 추가</button>
                            <button onClick={() => handleDeleteConfirm(index)}>- 속성 삭제</button>
                        </div>

                        {isShowModal[index] && (
                            <DeleteAttributeModal
                                key={index}
                                onClose={() => handleCloseModal(index)}
                                handleDeleteAttribute={handleDeleteAttribute}
                            />
                        )}

                    </div>
                ))}
            </div>
        </div >
    );
}
