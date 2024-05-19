import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import {DeleteWorkBookModal} from '../modals/DeleteModal';
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
            setWorkbooks(response.data.message.map(workbook => ({
                ...workbook,
                created_date: formatDateString(workbook.created_date),
                updated_date: formatDateString(workbook.updated_date)
            }))); // 배열 전체를 저장
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

    // 날짜 문자열 포맷팅 함수
    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

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
                        <StyledParagraph>작성일: {workbook.created_date}</StyledParagraph>
                        <StyledParagraph>수정일: {workbook.updated_date}</StyledParagraph>
                        <DeleteImg src="/img/쓰레기통.png" alt="Delete Icon" onClick={(e) => { e.stopPropagation(); handleOpenModal(workbook.id); }} />
                    </WorkBookButton>
                    {modalStates[workbook.id] && (
                        <DeleteWorkBookModal workbook={workbook} handleWorkBookDelete={handleWorkBookDelete} handleCloseModal={handleCloseModal} />
                    )}
                </div>
            ))}
               </div>
                <NavigationBar />
            </WorkBooksContent>
        );
};
