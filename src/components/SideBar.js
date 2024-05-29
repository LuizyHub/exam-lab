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
    left: 0;
    width: 70px;
    height: 100%;
    background-color: #fff;
    z-index: 999;
    box-shadow: ${({ $isVisible }) => ($isVisible ? '0' : '0 0 10px rgba(0, 0, 0, 0.1)')};
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
    padding-top: 96px;
`;

const NavigationContent = styled.div`
`;

const NavigationIcon = styled.img`
    width: 20px;
    outline: none;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 15px;
    margin-left: 0px;
    margin-bottom: 10px;
    position: absolute;
    bottom: 190px;
`;

const UserButton = styled.button`
    background-color: #29B8B5;
    color: #fff;
    border: none;
    border-radius: 180px;
    padding: 15px 10px;
    font-size: 10px;
    font-weight: 600;
    margin-right: 12px;
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
    margin-bottom: 80px;
    margin-top: 10px;
`;

const LogImgContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 155px;
`;

const LogImg = styled.img`
    width: 30px;
    position: relative;
    left: 15px;
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 12px;
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
`;


const NavItem = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 0px;
  border: none;
  background-color: transparent;
  height: 40px;
  width: 100%;
  transition: height 0.3s ease;
  background-color: ${({ $isHovered }) => ($isHovered ? '#ECF7F7' : 'transparent')};
  &:active,
  &:focus {
    background-color: #ECF7F7;
  }
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration-line:none;
`;

const NavIcon = styled.img`
  width: ${({ $primary }) => $primary ? '27px' : '23px'};
  position: relative;
  left: 20px;
  cursor: pointer;
`;

export default function SideBar() {
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
                    <CloseButtonContainer >
                        <CloseButton onClick={toggleVisibility}>
                            <NavigationIcon src='/img/네비게이션바.png' alt='navigation' />
                        </CloseButton>
                    </CloseButtonContainer>
                </TopContent>

                <NavigationContent>
                    <NavLink to='/exams/create'>
                        <NavItem
                            $isHovered={hoveredNavItem === 'create'}
                            onMouseEnter={() => setHoveredNavItem('create')}
                            onMouseLeave={() => setHoveredNavItem('')}
                        >
                            <NavIcon src="/img/시험지제작소.svg" alt="icon Image" $isSidebarOpen={isVisible} />
                        </NavItem>
                    </NavLink>

                    <NavItem
                        $isHovered={hoveredNavItem === 'manage'}
                        onMouseEnter={() => setHoveredNavItem('manage')}
                        onMouseLeave={() => setHoveredNavItem('')}
                        onClick={() => handleNavigate('/exams')}
                    >
                        <NavIcon src="/img/문제관리소.svg" alt="icon Image" $isSidebarOpen={isVisible} $primary="true" />
                    </NavItem>

                    <NavItem
                        $isHovered={hoveredNavItem === 'store'}
                        onMouseEnter={() => setHoveredNavItem('store')}
                        onMouseLeave={() => setHoveredNavItem('')}
                        onClick={() => handleNavigate('/workbooks')}
                    >
                        <NavIcon src="/img/시험지저장소.svg" alt="icon Image" $isSidebarOpen={isVisible} />
                    </NavItem>

                    {showModal && <LoginModal onClose={() => setShowModal(false)} />}
                </NavigationContent>
                {userInfo.loginStatus === true ? (
                    <>
                        <UserContainer>
                            <UserButton>{userInfo.userName}</UserButton>
                        </UserContainer>
                        <StyledButton onClick={handleLogout}>
                            <LogImgContainer>
                                <LogImg src='/img/로그아웃_icon.png'/>
                            </LogImgContainer>
                        </StyledButton>
                    </>
                ) : (
                    <a href='/users/login'>
                        <StyledButton>
                            <LogImgContainer>
                                <LogImg src='/img/로그인_icon.png'/>
                            </LogImgContainer>
                        </StyledButton>
                    </a>
                )}
            </NavigationBarContent>
        </NavigationContainer>
    );
}
