import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import styled from 'styled-components';

const WorkBooksContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${props => props.isSidebarOpen ? '250px' : '60px'};
    transition: margin-left 0.3s ease;
`;

const WorkBooks = () => {
    const isSidebarOpen = useRecoilValue(isVisibleState);

    return (
        <WorkBooksContent isSidebarOpen={isSidebarOpen}>
           <h1>시험지 저장소</h1>
            <NavigationBar />
        </WorkBooksContent>
    );
};

export default WorkBooks;
