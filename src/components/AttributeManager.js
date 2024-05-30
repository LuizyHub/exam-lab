import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DeleteAttributeModal } from "../modals/DeleteModal";
import { IntroduceAttribute } from "../modals/IntroduceModal";
import axios from 'axios';

const AttributeManagerContainer = styled.div`
  margin: 0;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  font-size: 30px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 2px;
  outline: none;
  &:focus {
    border: 1px solid #9A9DA0;
  }
`;

const AttributeContainer = styled.div`
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Attribute = styled.input`
  font-size: 16px;
  font-weight: 600;
  color: #3E3F41;
  border: 1px solid transparent;
  border-radius: 2px;
  outline: none;
  padding: 7px 7px;
  width: 50px;
  &:focus {
    border: 1px solid #9A9DA0;
  }
`;

const AttributeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AttributeContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  outline: none;
`;

const TagContainer = styled.div`
  background-color: #F5F5F7;
  border-radius: 5px;
  padding: 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const TagInputField = styled.input`
  width: 45px;
  background-color: #F5F5F7;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  color: #262626;
  padding: 7px 7px;
  &:focus {
    border: 1px solid #9A9DA0;
  }
`;

const AttributeCreateButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  color: #9A9DA0;
  margin-bottom: 0;
  &:hover {
    color: #24ABA8;
  }
`;

const AttributeDeleteButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
`;

const ServerButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ServerButton = styled.button`
  background-color: #29B8B5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 20px;
  align-self: center;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: #C6E7E7;
  }
`;

const DeleteTagButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DeleteImg = styled.img`
  width: 20px;
`;

const AddTagButton = styled.button`
  background-color: #F5F5F7;
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  padding: 8px 10px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusImg = styled.img`
  width: 12px;
  margin-top: 2px;
`;

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const IntroduceImg = styled.img`
    width: 10px;
    background-color: #D9F1F1;
    padding: 5px 7px;;
    border-radius: 50px;
    margin-left: 15px;
    cursor: pointer;
`;


export default function AttributeManager({ examId, setExamId }) {
    const [attributes, setAttributes] = useState([{ name: '난이도', values: ['상', '중', '하'] }]);
    const [examTitle, setExamTitle] = useState('');
    const [isShowModal, setIsShowModal] = useState(attributes.map(() => false));
    const [isState, setState] = useState(true);
    const [isShowIntro, setIsShowIntro] = useState(false);
  
    useEffect(() => {
      if (examId) {
        axios.get(`/api/v1/exams/${examId}`)
          .then(response => {
            const { exam_title, tags } = response.data;
            const attributesArray = Object.entries(tags).map(([name, values]) => ({ name, values }));
            setAttributes(attributesArray);
            setExamTitle(exam_title);
            setState(exam_title === 'undefined');
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
  
    const handleDeleteConfirm = (index) => {
      const newIsShowModal = [...isShowModal];
      newIsShowModal[index] = true;
      setIsShowModal(newIsShowModal);
    };
  
    const handleCloseModal = () => {
      setIsShowModal(attributes.map(() => false));
    };
  
    const handleDeleteTag = (attributeIndex, tagIndex) => {
      const newAttributes = [...attributes];
      newAttributes[attributeIndex].values.splice(tagIndex, 1);
      setAttributes(newAttributes);
    };

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
      <AttributeManagerContainer>
        <TitleInput
          value={examTitle}
          onChange={handleExamTitleChange}
          placeholder="시험지 제목"
        />
        <ServerButtonContainer>
          <ServerButton>
            <Link to="https://exam-lab.store/exams/create" style={{ color: 'inherit', textDecoration: 'inherit' }}>
              시험지 제작하기
            </Link>
          </ServerButton>
          <ServerButton onClick={handleUpdateExamData}>
                저장하기
          </ServerButton>
        </ServerButtonContainer>
        <AttributeInputContainer>
          {attributes.map((attribute, index) => (
            <div key={index}>
              <AttributeContent>
                <AttributeContainer>
                  <Attribute
                    value={attribute.name}
                    onChange={(event) => handleAttributeChange(index, event)}
                    placeholder="속성"
                  />
                  <AttributeDeleteButton onClick={() => handleDeleteConfirm(index)}>
                    <DeleteImg src="/img/delete_icon.svg" />
                  </AttributeDeleteButton>
                </AttributeContainer>
  
                {attribute.values.map((value, tagIndex) => (
                  <div key={tagIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                    <TagContainer>
                      <TagInputField
                        value={value}
                        onChange={(event) => handleTagChange(index, tagIndex, event)}
                        placeholder="태그"
                      />
                      <DeleteTagButton onClick={() => handleDeleteTag(index, tagIndex)}>
                        <DeleteImg src="/img/delete_icon.svg" />
                      </DeleteTagButton>
                    </TagContainer>
                  </div>
                ))}
                <AddTagButton onClick={() => handleAddTag(index)}>
                  <PlusImg src="/img/plus_icon.svg" />
                </AddTagButton>
              </AttributeContent>
  
              {isShowModal[index] && (
                  <DeleteAttributeModal
                      key={index}
                      attribute={attribute}
                      onClose={() => handleCloseModal(index)}
                      onDelete={() => {
                          handleDeleteAttribute(index);
                          handleCloseModal();
                      }}
                  />
              )}
  
            </div>
          ))}
        </AttributeInputContainer>
         <BottomContainer>
              <AttributeCreateButton onClick={handleAddAttribute}> + 속성 추가 </AttributeCreateButton>
              <IntroduceImg src="/img/물음표_icon.svg" alt="? icon" onClick={()=> setIsShowIntro(true)}/>
        </BottomContainer>
        {isShowIntro && <IntroduceAttribute onClose={()=> setIsShowIntro(false)} />}
      </AttributeManagerContainer>
    );
  }