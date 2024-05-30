import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 707px;
  z-index: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 26px;
  flex-grow: 1;
`;

const CloseButton = styled.span`
  font-size: 34px;
`;

const ModalBody = styled.div`
  margin-bottom: 10px;
  text-align: left;
  hr {
    border: 0;
    height: 1px;
    background-color: #EBEDEF;
  }
`;

const ModalTextTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ModalIntroContent = styled.div`
    margin-bottom: 50px;
`;

const ModalText = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

const AttributeContainer = styled.div`
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Attribute = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #3E3F41;
  border: 1px solid transparent;
  border-radius: 2px;
  outline: none;
  padding: 7px 7px;
  width: 60px;
  margin-top: 2px;
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
  margin-bottom: 0px;
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
  height: 30px;
`;

const TagInputField = styled.p`
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

const DeleteTagButton = styled.button`
  background-color: transparent;
  border: none;
`;

const DeleteImg = styled.img`
  width: 20px;
`;

const AddTagButton = styled.button`
  background-color: #F5F5F7;
  border: none;
  padding: 0px 5px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const PlusImg = styled.img`
  width: 12px;
`;


export const IntroduceAttribute = ({ onClose }) => {
  // 예시 데이터
  const attributeData = [
    { name: '난이도', tags: ['상', '중', '하'] },
    { name: '주차', tags: ['1주차', '2주차', '3주차', '4주차'] },
    { name: '문제 종류', tags: ['문법', '화작', '문학', '비문학'] }
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>문제 속성 및 태그</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <hr />
          <ModalTextTitle>문제 속성 및 태그란?</ModalTextTitle>
          <ModalIntroContent>
            <ModalText>문제 속성 및 태그는 각 문제를 분류하는 데 사용됩니다. <br/> 상단에 문제 속성과 태그를 입력하면 각 문제에서 해당 속성과 태그를 선택할 수 있습니다.</ModalText>
          </ModalIntroContent>
          <ModalTextTitle>문제 속성 및 태그</ModalTextTitle>
          <AttributeInputContainer>
            {attributeData.map((attribute, index) => (
              <AttributeContent key={index}>
                <AttributeContainer>
                  <Attribute>{attribute.name}</Attribute>
                </AttributeContainer>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {attribute.tags.map((tag, tagIndex) => (
                    <TagContainer key={tagIndex}>
                      <TagInputField>{tag}</TagInputField>
                      <DeleteTagButton>
                        <DeleteImg src="/img/delete_icon.svg" />
                      </DeleteTagButton>
                    </TagContainer>
                  ))}
                  <AddTagButton>
                    <PlusImg src="/img/plus_icon.svg" />
                  </AddTagButton>
                </div>
              </AttributeContent>
            ))}
          </AttributeInputContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};
