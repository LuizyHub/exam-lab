import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AttributeManager({ examId }) {
    const [attributes, setAttributes] = useState([{ name: '', values: [''] }]);
    const [examTitle, setExamTitle] = useState('');

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

    const handleDeleteTag = (attributeIndex, tagIndex) => {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].values.splice(tagIndex, 1);
        setAttributes(newAttributes);
    };

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
    

    return (
        <div>
            <input value={examTitle} onChange={handleExamTitleChange} placeholder="시험지 제목" />
            {attributes.map((attribute, index) => (
                <div key={index}>
                    <input value={attribute.name} onChange={(event) => handleAttributeChange(index, event)} placeholder="속성" />
                    {attribute.values.map((value, tagIndex) => (
                        <div key={tagIndex}>
                            <input value={value} onChange={(event) => handleTagChange(index, tagIndex, event)} placeholder="태그" />
                            <button onClick={() => handleDeleteTag(index, tagIndex)}>태그 삭제</button>
                        </div>
                    ))}
                    <button onClick={() => handleAddTag(index)}>태그 추가</button>
                    <button onClick={() => handleDeleteAttribute(index)}>속성 삭제</button>
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
