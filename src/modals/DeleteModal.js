import styled from "styled-components";

const DeleteConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;  
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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

const ModalText = styled.p`
  font-size: 21px;
  
`;

const HighlightText = styled.span`
  font-weight: bold;
  color: #29B8B5;
`;

const CloseButton = styled.span`
  font-size: 34px;
  cursor: pointer;
`;

const ModalBody = styled.div`
    margin-bottom: 0px;
    text-align: center;
    hr {
    border: 0;
    height: 1px;
    background-color: #EBEDEF;
    }
`;


const ModalButton = styled.button`
    width: 140px;
    height: 51px;    
    background-color: #29B8B5;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 10px;

    margin-top: 15px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
`;

export const DeleteExamModal = ({exam, handleExamDelete, handleCloseModal}) => {
    return(
        <DeleteConfirmModal>
            <ModalContent>
            <ModalHeader>
                <ModalTitle> 문제 삭제 </ModalTitle>
                <CloseButton onClick={() => handleCloseModal(exam.exam_id)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
                <hr />
                <ModalText>
                    <HighlightText>{exam.exam_title}</HighlightText>에 대한 모든 문제들이 삭제됩니다. 정말로 삭제하시겠습니까?
                </ModalText>
                <ModalButton onClick={() => { handleExamDelete(exam.exam_id); }}>삭제하기</ModalButton>
            </ModalBody>
            </ModalContent>
        </DeleteConfirmModal>
    );
};


export const DeleteAttributeModal = ({ attribute, onClose, onDelete }) => {
    return (
        <DeleteConfirmModal>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle> 속성 삭제 </ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <hr />
                    <ModalText>
                        <HighlightText>{attribute.name}</HighlightText> 속성과 관련 태그들이 모든 문제에서 삭제됩니다. 정말로 삭제하시겠습니까?
                    </ModalText>
                    <ModalButton onClick={onDelete}>삭제하기</ModalButton>
                </ModalBody>
            </ModalContent>
        </DeleteConfirmModal>
    );
}




export const DeleteWorkBookModal = ({workbook, handleWorkBookDelete, handleCloseModal}) => {
    return(
        <DeleteConfirmModal>
            <ModalContent>
            <ModalHeader>
                <ModalTitle> 시험지 삭제 </ModalTitle>
                <CloseButton onClick={() => handleCloseModal(workbook.id)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
                <hr />
                <ModalText>
                    <HighlightText>{workbook.title}</HighlightText> 시험지가 삭제됩니다. 정말로 삭제하시겠습니까?
                </ModalText>
                <ModalButton onClick={() => handleWorkBookDelete(workbook.id)}>삭제하기</ModalButton>
            </ModalBody>
            </ModalContent>
        </DeleteConfirmModal>
    );
}
