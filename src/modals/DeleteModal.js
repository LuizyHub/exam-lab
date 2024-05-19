import styled from "styled-components";

const DeleteConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;  
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
`;

const ModalBody = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;


const ModalButton = styled.button`
    background-color: ${props => props.primary ? '#29B8B5' : '#EBF0F6'};
    color: ${props => props.primary ? '#fff' : '#A2ACB9'};
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;
`;

export const DeleteExamModal = ({exam, handleExamDelete, handleCloseModal}) => {
    return(
        <DeleteConfirmModal>
            <ModalBody>
                <h3>{exam.exam_title}에 대한 모든 문제들이 삭제됩니다. 정말로 삭제하시겠습니까? </h3>
                <ModalButton primary="true" onClick={() => { handleExamDelete(exam.exam_id); }}>삭제하기</ModalButton>
                <ModalButton onClick={() => handleCloseModal(exam.exam_id)}>취소</ModalButton>
            </ModalBody>
        </DeleteConfirmModal>
    );
};

export const DeleteWorkBookModal = ({workbook, handleWorkBookDelete, handleCloseModal}) => {
    return(
        <DeleteConfirmModal>
            <ModalBody>
                <h3>{workbook.title}에 대한 모든 문제들이 삭제됩니다. 정말로 삭제하시겠습니까? </h3>
                <ModalButton primary="true" onClick={() => handleWorkBookDelete(workbook.id)}>삭제하기</ModalButton>
                <ModalButton onClick={() => handleCloseModal(workbook.id)}>취소</ModalButton>
            </ModalBody>
        </DeleteConfirmModal>
    );
}