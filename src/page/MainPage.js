import React from 'react';
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import { Link } from 'react-router-dom';
import MainInto from '../components/MainIntro';
import NavigationBar from '../components/NavigationBar';
import Bottom from '../components/Bottom';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${props => props.isSidebarOpen ? '235px' : '0px'};
    transition: margin-left 0.3s ease;
`;

const PageContent = styled.div`
    position: relative;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 400px;
    background: linear-gradient(102.06deg, #E0F9F8 12.5%, #E2E6FA 98.35%);
    top: 0;
    left: 0;
`;

const LogoWrapper = styled.div`
    width: 300px; 
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.img`
    width: 200px; 
    position: relative;
    margin-right: 20px;
`;


const ImageWrapper = styled.div`
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MainImage = styled.img`
    width: 500px;
    position: relative;
    margin-left : 100px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Navigation = styled.nav`
    display: flex;
    justify-content: center;
`;

const NavButton = styled.button`
    background-color: ${props => props.primary ? '#29B8B5' : '#EBF0F6'};
    color: ${props => props.primary ? '#fff' : '#A2ACB9'};
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 16px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${props => props.primary ? '#238C8A' : '#D3DCE6'};
    }
`;

export default function MainPage() {
    const isSidebarOpen = useRecoilValue(isVisibleState);

    return (
        <MainContainer isSidebarOpen={isSidebarOpen}>
            <PageContent>
                <ContentWrapper>
                    <LogoWrapper>
                        <h3 style={{ position: 'relative' }}>쉽고 빠르게 나만의 시험지 만들기</h3>
                        <Logo src="/img/examLab_logo.png" alt="logo" />
                    </LogoWrapper>
                    <ImageWrapper>
                        <MainImage src="/img/mainImage.png" alt="Main Image" />
                    </ImageWrapper>
                </ContentWrapper>
            </PageContent>

            <Navigation>
                <NavButton primary>
                    <StyledLink to='/exams/create'>나만의 시험지</StyledLink>
                </NavButton>
                <NavButton>
                    <StyledLink to='/exams'>나만의 문제</StyledLink>
                </NavButton>
                <NavButton primary>
                    <StyledLink to='/workbooks'>시험지 저장소</StyledLink>
                </NavButton>
            </Navigation>
            <MainInto />
            <footer>
                <Bottom />
            </footer>
            <NavigationBar />
        </MainContainer>
    );
}
