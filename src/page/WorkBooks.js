import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import styled from 'styled-components';

const WorkBooksContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '250px' : '60px'};
    transition: margin-left 0.3s ease;
`;

const StyledParagraph = styled.p`
    margin-right: 25px;
`;

const WorkBookButton = styled.button`
    display: flex; 
    align-items: center; 
    justify-content: center;
    background-color: #fff;
    border: 0.5px solid #C6E7E7;
    color: #6D6D6D;
    padding: 15px 32px;
    border-radius: 4px;
    font-size: 16px;
    margin: 4px 2px;
    margin-right: 25px;
    font-size: 15px;
    width: 700px;
    position: relative;
    text-align: center;
    &:hover {
        background-color: #ECF7F7;
    }
`;


const WorkBookCreateButton = styled.button`
    background-color: #F5F5F7;
    border: 0.5px solid #fff;
    color: #6D6D6D;
    padding: 15px 32px;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    margin: 4px 2px;
    margin-right: 15px;
    font-size: 15px;
    width: 800px;
    &:hover {
      background-color: #C2C3C6;
    }
`;

const CreateImg = styled.img`
    width: 30px;
`;

const DeleteImg = styled.img`
    position: absolute;
    top: 6px ;
    right: 6px;
    width: 15px;
`;

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

export default function WorkBooks() {

    const navigate = useNavigate();
    const [workbooks, setWorkbooks] = useState([]);
    const [modalStates, setModalStates] = useState({}); // 시험별 모달 상태

    const isSidebarOpen = useRecoilValue(isVisibleState);

    // 시험지 불러오기
    useEffect(() => {
        axios.get(`/api/v1/workbooks`)
          .then(response => {
            console.log(response.data);
            setWorkbooks(response.data.message); // 배열 전체를 저장
            console.log(workbooks);

            // 시험지별 삭제 모달을 띠우기 위함
            const initialModalStates = {};
            response.data.message.forEach(workbook => { 
              initialModalStates[workbook.id] = false;
            });
            setModalStates(initialModalStates);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    

        // 시험지 선택
        const handleWorkBookClick = (workbookId) => {
            navigate('/workbooks/create', { state: { workbookId } });
        }

        // 시험지 삭제하기 모달 열기
        const handleOpenModal = (workbookId) => {
            const newModalStates = { ...modalStates };
            newModalStates[workbookId] = true; // 해당 시험의 모달 상태를 true로 변경
            setModalStates(newModalStates);
        };

        // 시험지 삭제하기 모달 닫기
        const handleCloseModal = (workbookId) => {
            const newModalStates = { ...modalStates };
            newModalStates[workbookId] = false; // 해당 시험의 모달 상태를 false로 변경
            setModalStates(newModalStates);
        };

        // 시험지 삭제하기
        const handleWorkBookDelete = (workbookId) => {
            axios.delete(`/api/v1/workbooks/${workbookId}`)
            .then(response => {
                console.log('success', response.data);
                setWorkbooks(prevWorkbooks => prevWorkbooks.filter(workbook => workbook.id !== workbookId));
                handleCloseModal(workbookId); // 삭제 후 모달 닫기
            })
            .catch(error => {
                console.error(error);
            });
        }


        return (
            <WorkBooksContent $isSidebarOpen={isSidebarOpen}>
               <h1>시험지 저장소</h1>
                <WorkBookCreateButton onClick={() => {navigate('/exams/create')}}> 
                    <CreateImg src="/img/추가하기.png" alt="Create Icon" />
                </WorkBookCreateButton>
               <div>
               {workbooks && workbooks.map(workbook => (
                <div key={workbook.id}>
                    <WorkBookButton onClick={() => handleWorkBookClick(workbook.id)}>
                        <StyledParagraph>{workbook.title}</StyledParagraph>
                        <StyledParagraph>{workbook.created_date}</StyledParagraph>
                        <StyledParagraph>{workbook.updated_date}</StyledParagraph>
                        <DeleteImg src="/img/쓰레기통.png" alt="Delete Icon" onClick={(e) => { e.stopPropagation(); handleOpenModal(workbook.id); }} />
                    </WorkBookButton>
                    {modalStates[workbook.id] && (
                        <DeleteConfirmModal>
                            <ModalBody>
                                <h3>{workbook.title}에 대한 모든 문제들이 삭제됩니다. <br/>
                                정말로 삭제하시겠습니까? </h3>
                                <ModalButton primary="true" onClick={() => handleWorkBookDelete(workbook.id)}>삭제하기</ModalButton>
                                <ModalButton onClick={() => handleCloseModal(workbook.id)}>취소</ModalButton>
                            </ModalBody>
                        </DeleteConfirmModal>
                    )}
                </div>
            ))}
               </div>
                <NavigationBar />
            </WorkBooksContent>
        );
};
