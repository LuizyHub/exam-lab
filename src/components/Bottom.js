import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';

const Container = styled.div`
    min-height: 100vh; /* 화면 전체 높이 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const BottomContainer = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
    background-color: #F0F2F5;
    padding-left: 40px;
    margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '220px' : '0px'};
    transition: margin-left 0.5s ease;
`;


const BottomContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%; /* 각 요소가 1/4씩 차지하도록 */
    font-size: 15px;
    color: #1A1B1C;
    justify-content: center;
`;

const BottomText = styled.p`
    margin-top: 0;
    margin-bottom: 8px;
`;

const Logo = styled.img`
    width: 150px;
    position: relative;
    margin-left: 90px;
`;

const ContactContent = styled.div`
    display: flex;
    align-items: center;
`;

const GithubImg = styled.img`
    width: 38px;
`;

export default function Bottom() {

    const isSidebarOpen = useRecoilValue(isVisibleState);

    return (
        <BottomContainer  $isSidebarOpen={isSidebarOpen}>
            <BottomContent>
                <Logo src="/img/examLab_logo.png" alt="logo" />
            </BottomContent>
            <BottomContent>
                <BottomText>Copyright ⓒ 2024 시험지연구소</BottomText>
                <BottomText>주소 : 서울 성북구 삼선교로 16길 116 한성대학교</BottomText>
            </BottomContent>
            <BottomContent>
                <BottomText>대표자 : 박정제</BottomText>
                <BottomText>팀원 : 김동우, 김지수, 박정제, 윤성빈</BottomText>
            </BottomContent>
            <BottomContent>
                <ContactContent>
                    <BottomText>
                        Contact : 
                        <a href="https://github.com/LuizyHub/exam-lab">
                            <GithubImg src="/img/github_icon.png" alt="github icon" />
                        </a>
                    </BottomText>
                </ContactContent>
            </BottomContent>
        </BottomContainer>
    );
}