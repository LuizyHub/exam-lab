import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import axios from "axios";
import SideBar from "../components/SideBar";
import Bottom from "../components/Bottom";
import {DeleteWorkBookModal} from '../modals/DeleteModal';
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
  margin-bottom: 600px;
  flex-direction: column;
  margin-left: 320px;
  margin-right: 18%;
  margin-top: 16px;
`;

const WorkBooksContent = styled.div`
    display: flex;
    flex-wrap: wrap; 
`;


const PageContent = styled.div`
  display: flex;
  flex-direction: column; 
  margin-left: 20px;
`;


const PageIcon = styled.img`
  width: 50px;
  background-color: #D9F1F1;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 15px;
  margin-right: 5px;
`;

const PageTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 0px;
    width: 300px;
  
`;

const PageIntro = styled.p`
  margin-top: 8px;
  font-size: 19px;
  color: #313132;
`;

const PageName = styled.p`
  color: #262626;
  font-size: 18px;
  font-weight: 600;
  margin-top: 108px;
  margin-bottom: 20px;
  padding-bottom: 5px;
`;


const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const WorkBookButton = styled.button`
    background-color: #fff;
    border: 1px solid #E2E8EE;
    color: #262626;
    padding: 10px 25px;
    border-radius: 7px;
    font-size: 16px;
    margin: 4px 2px;
    margin-right: 15px;
    font-size: 15px;
    text-align: left;
    width: 375px;
    height: 91px;
    position: relative;
    cursor: pointer;
    &:hover {
        background-color: #D9F1F1;
        border: 1px solid #BADEDE;
    }
`;


const WorkBookTitle = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin-top: 0px;
    margin-bottom: 0px;
    color: #262626;
`;

// 날짜
const StyledParagraph = styled.p`
    font-size: 16px;
    font-weight: 400;
    margin-top: 8px;
    margin-bottom: 0px;
    color: #3E3F41;
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
    width: 384px;
    height: 91px;
    &:hover {
      background-color: #C2C3C6;
    }
`;

const CreateImg = styled.img`
    width: 30px;
`;

const DeleteImg = styled.img`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
`;

const NoneContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoneExam = styled.p`
  color: #6D6D6D;
  font-size: 18px;
`;

export default function WorkBooks() {

    const navigate = useNavigate();
    const [workbooks, setWorkbooks] = useState([]);
    const [modalStates, setModalStates] = useState({}); // 시험별 모달 상태


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
            <Container>
                <Content>
               <div style={{ display: "flex" }}>
                    <PageIcon src="/img/시험지저장소.svg" alt="page Icon" />
                    <PageContent>
                        <PageTitle>시험지 저장소</PageTitle>
                        <PageIntro>제작한 시험지는 저장소에 모여있어요.</PageIntro>
                    </PageContent>
                </div>

                <PageName> 제작한 시험지 </PageName>
                 {workbooks.length === 0 ? (
                        <NoneContent>
                            <NoneExam> 제작한 시험지가 없습니다</NoneExam>
                        </NoneContent>
                    ) : (
                        <WorkBooksContent>
                            {/* <WorkBookCreateButton onClick={() => {navigate('/exams/create')}}> 
                                <CreateImg src="/img/추가하기.png" alt="Create Icon" />
                                </ WorkBookCreateButton> */}
                            {workbooks.map(workbook => (
                                <ButtonContainer key={workbook.id}>
                                    <WorkBookButton onClick={() => handleWorkBookClick(workbook.id)}>
                                        <WorkBookTitle>{workbook.title}</WorkBookTitle>
                                        <StyledParagraph> {workbook.updated_date}</StyledParagraph>
                                        <DeleteImg src="/img/쓰레기통.png" alt="Delete Icon" onClick={(e) => { e.stopPropagation(); handleOpenModal(workbook.id); }} />
                                    </WorkBookButton>
                                    {modalStates[workbook.id] && (
                                        <DeleteWorkBookModal workbook={workbook} handleWorkBookDelete={handleWorkBookDelete} handleCloseModal={handleCloseModal} />
                                    )}
                                </ButtonContainer>
                            ))}
                        </WorkBooksContent>
                    )}


            </Content>

            <SideBar />
            <NavigationBar />
            <footer>
                <Bottom />
            </footer>
            </Container>
        );
};