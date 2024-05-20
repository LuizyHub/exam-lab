import styled from 'styled-components';

const MainIntroduction = styled.div `
    display: flex;
    justify-content: center;
    flex-direction: column; 
    align-items: center; 
    margin-top: 200px;
`;

const IntroTitle = styled.div`
    text-align: center; 
`;

const IntroBody = styled.div`
    text-align: center;
`;

const Step = styled.h3`
    color: #262626;
    font-size: 18px;
    margin-top: 3px;
    margin-bottom: 5px;
`;

const StepNumberStyle = styled.p`
    color: #24ABA8;
    font-size: 12px;
    margin-bottom: 0;
`;

const AIIcon = styled.img`
    width: 300px;
`

export default function MaingIntQuestion() {
    return (
        <MainIntroduction>
            <br/><br/><br/>
            <IntroTitle>
                <StepNumberStyle>나만의 시험지</StepNumberStyle>
                <Step> 새로운 문제를 손쉽게 시험지 연구소에 추가하여 <br/> 문제를 수집할 수 있어요. </Step>
            </IntroTitle>
            <IntroBody>
                <h2>문제 등록 툴 사용법 </h2>
                <p>문제 등록 툴을 익혀 쉽고 빠르게 문제 등록을 시작해보세요. </p>
                
                <h2> AI 문제 자동 생성 </h2>
                <p>시험지 연구소 AI가 파일을 읽고 문제를 자동으로 생성해드려요.</p>
                <p> * .pdf / .md / .txt 파일만 가능합니다. </p>
                <AIIcon src="./img/Intro_AI자동문제생성사진.png" alt="AI 자동생성 Image" />

            </IntroBody>
        </MainIntroduction>
    );
}
