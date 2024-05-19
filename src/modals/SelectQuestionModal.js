import styled from "styled-components";

const ModalContent = styled.div`
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

export function NoneQuestion () {
    return(
        <ModalContent>
            <ModalBody>
                <h3> 해당하는 문제가 없습니다. </h3>
                
            </ModalBody>
        </ModalContent>
    );
};

export function OneMoreQuestion() {
    return(
        <ModalContent>
            <ModalBody>
                <h3> 한개 이상의 문제를 선택하셔야합니다. </h3>
                
                
            </ModalBody>
        </ModalContent>
    );
}