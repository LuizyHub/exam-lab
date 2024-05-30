import styled from "styled-components";

const ModalContent = styled.div`
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

const ModalBody = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 650px;
    height: 150px;
    display: flex;
    flex-direction: column;
`;

const ModalTitle = styled.p`
    font-size: 26px;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 0px;
`;

const ModalIntro = styled.p`
    font-size: 21px;
    font-weight: 400;
`;

const ModalCloseButton = styled.button`
    background-color: #29B8B5;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 5px;
    font-size:16px;
    font-weight: 600;
    width: 102px;
    hight: 37px;
    align-self: flex-end; /* 오른쪽 정렬 */
`;

export function NoneQuestionModal({ onClose }) {
    return (
        <ModalContent>
            <ModalBody >
                <ModalTitle>해당 문제가 없습니다.</ModalTitle>
                <ModalIntro>문제를 다시 검색해주세요.</ModalIntro>
                <ModalCloseButton onClick={onClose}>확인</ModalCloseButton>
            </ModalBody>
        </ModalContent>
    );
}

export function OneMoreQuestionModal({ show, onClose }) {
    return (
        <ModalContent>
            <ModalBody>
                <ModalTitle>문제를 선택해주세요.</ModalTitle>
                <ModalIntro> 시험지를 생성하기 위해서는 최소한 한 문제 이상 선택해야합니다.</ModalIntro>
                <ModalCloseButton onClick={onClose}>확인</ModalCloseButton>
            </ModalBody>
        </ModalContent>
    );
}
