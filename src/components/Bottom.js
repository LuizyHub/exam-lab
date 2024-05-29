import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';


const BottomContainer = styled.div`
    display: flex;
    width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'calc(100% - 260px)' : '100%')}; /* Sidebar가 열려있을 때는 220px만큼 줄어들도록 설정 */
    height: 200px;
    bottom: 0;
    background-color: #F0F2F5;
    padding-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '260px' : '0px')}; /* Sidebar가 열려있을 때는 260px로 설정 */
    transition: width 0.5s ease, padding-left 0.5s ease; /* transition 속성에 padding-left 추가 */
    margin-top: auto;
`;



const BottomContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%; /* 각 요소가 1/4씩 차지하도록 */
    margin-right: 0px;
    font-size: 16px;
    justify-content: center;
`;

const BottomTextContent = styled.div`
    margin-left: 30px;
`;

const BottomText = styled.p`
    margin-top: 0;
    margin-bottom: 8px;
    display: flex;
`;

const Logo = styled.img`
    width: 150px;
    position: relative;
    margin-left: 150px;
`;

const ContactContent = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
`;

const GithubImg = styled.img`
    width: 38px;
    margin-left: 12px;
    margin-top: 3px;
    
`;

export default function Bottom() {

    const isSidebarOpen = useRecoilValue(isVisibleState);

    return (
        <BottomContainer  $isSidebarOpen={isSidebarOpen}>
            <BottomContent>
                <Logo src="/img/logo.svg" alt="logo" />
            </BottomContent>
            <BottomContent>
                <BottomTextContent>
                    <BottomText>Copyright ⓒ 2024 시험지연구소</BottomText>
                    <BottomText>주소 : 서울 성북구 삼선교로 16길 116 한성대학교</BottomText>
                </BottomTextContent>
            </BottomContent>
            <BottomContent>
                <BottomTextContent>
                    <BottomText>대표자 : 박정제</BottomText>
                    <BottomText>팀원 : 김동우, 김지수, 박정제, 윤성빈</BottomText>
                </BottomTextContent>
            </BottomContent>
            <BottomContent>
                <ContactContent>
                    <BottomText>
                        <p>Contact : </p>
                        <a href="https://github.com/LuizyHub/exam-lab">
                            <GithubImg src="/img/github_icon.png" alt="github icon" />
                        </a>
                    </BottomText>
                </ContactContent>
            </BottomContent>
        </BottomContainer>
    );
}
