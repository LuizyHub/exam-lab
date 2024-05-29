import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, isVisibleState, hoverState } from '../recoil/atoms';
import { getLoginInfo } from '../function/LoginState';
import axios from 'axios';
import LoginModal from '../modals/LoginModal';

const NavigationContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${({ $isVisible }) => ($isVisible ? '0' : '-199px')};
    width: 256px;
    height: 100%;
    background-color: #fff;
    z-index: 100;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;
`;

const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
`;

const NavigationBarContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%; 
    height: 100%;
    padding-top: 18px;
`;

const NavigationContent = styled.div`
    margin-top: 4px;
`;

const Logo = styled.img`
    width: 163px;
    margin-bottom: 35px;
    margin-left: 76px;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    margin-left: 61px;
    margin-bottom: 10px;
    position: absolute;
    bottom: 110px;
`;

const UserName = styled.p`
    font-size: 18px;
    font-weight: 500;
    position: relative;
`;

const StyledButton = styled.button`
    width: 100%;
    display: inline-block;
    background-color: #fff;
    color: #3E3F41;
    border: none;
    cursor: pointer;
    text-decoration-line: none;
    margin-bottom: 100px;
    margin-top: 10px;
`;

const LogImgContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 80px;
`;

const LogText = styled.span`
    margin-left: 75px;
    font-size: 18px;
    font-weight: 500;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: none;
  background-color: transparent;
  height: 40px;
  width: 100%;
  transition: height 0.3s ease;
  background-color: ${({ $isHovered }) => ($isHovered ? '#ECF7F7' : 'transparent')};
`;

const NavText = styled.p`
  margin-left: 70px;
  font-size: 18px;
  font-weight: 500;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration-line:none;
`;

export default function NavigationBar() {
    const [isVisible, setIsVisible] = useRecoilState(isVisibleState);
    const [userInfo, setUserInfo] = useState({ userName: '', loginStatus: false });
    const [loginInfo, setLoginInfo] = useRecoilState(loginState);
    const [showModal, setShowModal] = useState(false);
    const [hoveredNavItem, setHoveredNavItem] = useRecoilState(hoverState);
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfo(loginInfo);
    }, [loginInfo]);

    useEffect(() => {
        handleLoginState();
    }, []);

    const handleAutoLogin = async () => {
        try {
            const response = await axios.post('/api/v1/users/login', {
                password: 'lab111!',
                user_id: 'lab1@gmail.com',
            });
            console.log('Login successful', response);
            setLoginInfo({ userName: response.data.user_name, loginStatus: true });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/v1/users/logout');
            console.log('Logout successful');
            setLoginInfo({ userName: '', loginStatus: false });
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleLoginState = async () => {
        try {
            const { userName, loginStatus } = await getLoginInfo();
            setUserInfo({ userName, loginStatus });
            setLoginInfo({ userName, loginStatus });
        } catch (error) {
            console.error('Failed to retrieve login information', error);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleNavigate = async (path) => {
        try {
            const { loginStatus } = await getLoginInfo();
            if (loginStatus) {
                navigate(path);
            } else {
                setShowModal(true);
            }
        } catch (error) {
            console.error('Failed to retrieve login information', error);
        }
    };

    return (
        <NavigationContainer $isVisible={isVisible}>
            <NavigationBarContent>
                <TopContent>
                    <Link to='/'>
                        <Logo src='/img/logo.svg' alt='logo' />
                    </Link>
                </TopContent>

                <NavigationContent>
                    <NavLink to='/exams/create'>
                        <NavItem
                            $isHovered={hoveredNavItem === 'create'}
                            onMouseEnter={() => setHoveredNavItem('create')}
                            onMouseLeave={() => setHoveredNavItem('')}
                        >
                            <NavText>시험지 제작소</NavText>
                        </NavItem>
                    </NavLink>

                    <NavItem
                        $isHovered={hoveredNavItem === 'manage'}
                        onMouseEnter={() => setHoveredNavItem('manage')}
                        onMouseLeave={() => setHoveredNavItem('')}
                        onClick={() => handleNavigate('/exams')}
                    >
                        <NavText>문제 관리소</NavText>
                    </NavItem>

                    <NavItem
                        $isHovered={hoveredNavItem === 'store'}
                        onMouseEnter={() => setHoveredNavItem('store')}
                        onMouseLeave={() => setHoveredNavItem('')}
                        onClick={() => handleNavigate('/workbooks')}
                    >
                        <NavText>시험지 저장소</NavText>
                    </NavItem>

                    {showModal && <LoginModal onClose={() => setShowModal(false)} />}
                    
                    {/* 배포 시 삭제될 개발용 로그인 버튼 */}
                    {/* <div style={{marginLeft: "75px"}}>
                        <button onClick={handleAutoLogin}>자동 로그인</button>
                        <button onClick={handleLogout} primary="true">로그아웃</button>
                        <button onClick={handleLoginState}>로그인정보 받아오기</button>
                    </div> */}
                </NavigationContent>
                {userInfo.loginStatus === true ? (
                    <>
                        <UserContainer>
                            <UserName>{userInfo.userName}님의 연구소</UserName>
                        </UserContainer>
                        <StyledButton onClick={handleLogout}>
                            <LogImgContainer>
                                <LogText>로그아웃</LogText>
                            </LogImgContainer>
                        </StyledButton>
                    </>
                ) : (
                    <a href='/users/login'>
                        <StyledButton>
                            <LogImgContainer>
                                <LogText>로그인 / 회원가입</LogText>
                            </LogImgContainer>
                        </StyledButton>
                    </a>
                )}
            </NavigationBarContent>

        </NavigationContainer>
    );
}
