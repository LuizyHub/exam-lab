import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import { Link } from 'react-router-dom';
import MainIntroExam from '../components/MainIntroExam';
import MainIntroQuestion from '../components/MainIntroQuestion';
import NavigationBar from '../components/NavigationBar';
import Bottom from '../components/Bottom';
import styled, { StyleSheetManager } from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '235px' : '0px'};
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
    height: 500px;
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
    margin-right: 100px;
    left: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const Navigation = styled.nav`
    display: flex;
    justify-content: center;
    position: relative;
`;

const NavContainer = styled.div`
    position: absolute;
    left: ${({ $primary }) => $primary ? '0' : ''};
    right: ${({ $primary }) => $primary ? '' : '0'};
    z-index: ${({ $selected }) => $selected ? 999 : 0};
    background-color: ${({ $selected }) => $selected ? '#fff' : '#EBEDEF'};
    width: ${({ $selected }) => $selected ? '55vw' : '60vw'};
    height: 160px;
    border: none;
    border-top-right-radius: ${({ $primary }) => $primary ? '80px' : '0'};
    border-top-left-radius: ${({ $primary }) => $primary ? '0' : '80px'};
    border-bottom-right-radius: ${({ $primary }) => $primary ? '80px' : ''};
    border-bottom-left-radius: ${({ $primary }) => $primary ? '' : '80px'};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
    margin-left: ${({ $primary }) => $primary ? '50px' : '180px'};
    right: ${({ $primary }) => $primary ? '100px' : '10px'};
    margin-top: 20px;
    margin-bottom: 20px;
`;

const NavContentP = styled.p`
    color: ${({ $selected }) => $selected ? '#29B8B5' : '#9A9DA0'};
`;

const NavButton = styled.button`
    background-color: ${({ $selected }) => $selected ? '#29B8B5' : '#9A9DA0'};
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 16px;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: ${({ $selected }) => $selected ? '#238C8A' : '#D3DCE6'};
    }
`;

const MoveIcon = styled.img`
    width: 7px;
    margin-left: 10px;
    margin-top: 5px;
`;

export default function MainPage() {
    const isSidebarOpen = useRecoilValue(isVisibleState);
    const [selectedNav, setSelectedNav] = useState('intro');

    return (
        <StyleSheetManager>
            <MainContainer $isSidebarOpen={isSidebarOpen}>
                <PageContent>
                    <ContentWrapper>
                        <LogoWrapper>
                            <h3>쉽고 빠르게 나만의 시험지 만들기</h3>
                            <Logo src="/img/examLab_logo.png" alt="logo" />
                        </LogoWrapper>
                        <ImageWrapper>
                            <MainImage src="/img/mainImage.png" alt="Main Image" />
                        </ImageWrapper>
                    </ContentWrapper>
                </PageContent>

                <Navigation>
                    <NavContainer
                        $primary="true"
                        $selected={selectedNav === 'intro'}
                        onClick={() => setSelectedNav('intro')}
                    >
                        <NavContent $primary="true">
                            <NavContentP $selected={selectedNav === 'intro'}>How To Use</NavContentP>
                            <h3>문제를 조합해서 나만의 시험지 제작하기</h3>
                            <NavButton $selected={selectedNav === 'intro'}>
                                <StyledLink to={{ pathname: '/exams/create' }}>나만의 시험지 바로가기
                                     <MoveIcon src="/img/>_icon.png" alt="< Image" />
                                </StyledLink>
                            </NavButton>
                        </NavContent>
                    </NavContainer>

                    <NavContainer
                        $selected={selectedNav === 'register'}
                        onClick={() => setSelectedNav('register')}
                    >
                        <NavContent>
                            <NavContentP $selected={selectedNav === 'register'}>How To Use</NavContentP>
                            <h3>나만의 문제 등록하기</h3>
                            <NavButton $selected={selectedNav === 'register'}>
                                <StyledLink to={{ pathname: '/exams' }}>나만의 문제 바로가기
                                    <MoveIcon src="/img/>_icon.png" alt="< Image" />
                                </StyledLink>
                            </NavButton>
                        </NavContent>
                    </NavContainer>
                </Navigation>

                {selectedNav === 'intro' && <MainIntroExam />}
                {selectedNav === 'register' && <MainIntroQuestion />}
                <footer>
                    <Bottom />
                </footer>
                <NavigationBar />
            </MainContainer>
        </StyleSheetManager>
    );
}