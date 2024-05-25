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
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '220px' : '0px'};
    transition: margin-left 0.5s ease;
`;



const PageContent = styled.div`
    

`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 720px;
    background: linear-gradient(102.06deg, #E0F9F8 12.5%, #E2E6FA 98.35%);
    
`;

const LogoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 200px;

`;

const LogoTitle = styled.p`
    font-size: 24px;
    font-weight: bold;
`;

const Logo = styled.img`
    width: 408px;
    position: relative;
`;


const LogoIntro = styled.p`
    font-size: 18px;
    font-weight: bold;
    width: 500px;
    color: #262626;
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

const MainImage = styled.img`
    width: 588px;
    margin-right: 45px;
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
    z-index: ${({ $selected }) => $selected ? 1 : 0};
    background-color: ${({ $selected }) => $selected ? '#fff' : '#EBEDEF'};
    width: 58%;
    height: 204px;
    border-top-right-radius: ${({ $primary }) => $primary ? '120px' : '0'};
    border-top-left-radius: ${({ $primary }) => $primary ? '0' : '120px'};
    border-bottom-right-radius: ${({ $primary }) => $primary ? '120px' : ''};
    border-bottom-left-radius: ${({ $primary }) => $primary ? '' : '120px'};

`;

const NavContent = styled.div`
    margin-left: ${({ $primary }) => $primary ? '200px' : '290px'};
    margin-top: 40px;
`;

const NavContentP = styled.p`
    color: ${({ $selected }) => $selected ? '#29B8B5' : '#9A9DA0'};
    font-size: 16px;
    margin-bottom: 10px;
`;

const NavContentTitle = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-top: 1px;
    color: ${({ $selected }) => $selected ? '#262626' : '#9A9DA0'};
`;
const NavButton = styled.button`
    background-color: ${({ $selected }) => $selected ? '#29B8B5' : '#9A9DA0'};
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 18px;
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
                        <LogoWrapper $isSidebarOpen={isSidebarOpen}>
                            <LogoTitle>쉽고 빠르게 나만의 시험지 만들기</LogoTitle>
                            <Logo src="/img/examLab_logo.png" alt="logo" />
                            <LogoIntro>시험지 제작소에서 문제를 조합하여 나만의 시험지를 간편하게 제작하고<br/>
                                        문제 저장소에서 AI와 함께 문제를 관리하며 <br/>
                                        시험지 저장소에서 내가 만든 시험지를 확인해보세요.
                            </LogoIntro>
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
                        <NavContent $primary="true" $isSidebarOpen={isSidebarOpen}>
                            <NavContentP $selected={selectedNav === 'intro'}>How To Use</NavContentP>
                            <NavContentTitle $selected={selectedNav === 'intro'}>문제를 조합해서 나만의 시험지 제작하기</NavContentTitle>
                            <NavButton $selected={selectedNav === 'intro'}>
                                <StyledLink to={{ pathname: '/exams/create' }}>시험지 제작소 바로가기
                                     <MoveIcon src="/img/페이지열림_icon.png" alt="> Image" />
                                </StyledLink>
                            </NavButton>
                        </NavContent>
                    </NavContainer>

                    <NavContainer
                        $selected={selectedNav === 'register'}
                        onClick={() => setSelectedNav('register')}
                    >
                        <NavContent $isSidebarOpen={isSidebarOpen}>
                            <NavContentP $selected={selectedNav === 'register'}>How To Use</NavContentP>
                            <NavContentTitle $selected={selectedNav === 'register'}>나만의 문제 등록하기</NavContentTitle>
                            <NavButton $selected={selectedNav === 'register'}>
                                <StyledLink to={{ pathname: '/exams' }}>문제 관리소 바로가기
                                 <MoveIcon src="/img/페이지열림_icon.png" alt="> Image" />
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
