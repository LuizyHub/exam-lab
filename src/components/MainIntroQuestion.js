import styled from 'styled-components';

const MainIntroduction = styled.div `
    display: flex;
    justify-content: center;
    flex-direction: column; 
    align-items: center; 
    margin-top: 334px;
`;

const IntroTitle = styled.div`
    text-align: center; 
    margin-bottom: 300px;
`;

const IntroBody = styled.div`
    text-align: center;
    margin-top: 0;
`;

const IntroContent = styled.div`
    margin-bottom: 300px;

`;

const Step = styled.h3`
    color: #262626;
    font-size: 30px;
    margin-top: 3px;
    margin-bottom: 10px;
`;

const StepNumberStyle = styled.p`
    color: #24ABA8;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: bold;
`;

const StepsContainer = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-between;
    margin-top: 40px;
`;

const StepBy = styled.div`


`;

const NextStepIcon = styled.img`
    width: 20px;
    margin: 3px 10px;
    margin-top: 40px;
`;

const StepButton = styled.button`
    color: #3E3F41;
    background-color: #fff;
    border: 1px solid #EBEDEF;
    border-radius: 8px;
    padding: 5px 8px;
    flex: 1; 
    width: 310px;
    height: 78px;
    font-size: 24px;
    margin: 0 10px;
`;


const StepIntro = styled.p`
    font-size: 16px;
    color: #313132;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const EdtiToolImg = styled.img`
    widht: 300px;
`

const AIIcon = styled.img`
    width: 627px;
    margin-top: 60px;
`

export default function MaingIntQuestion() {
    return (
        <MainIntroduction>
            <br/><br/><br/>
            <IntroTitle>
                <StepNumberStyle>나만의 시험지</StepNumberStyle>
                <Step> 새로운 문제를 손쉽게 시험지 연구소에 추가하여 <br/> 문제를 수집할 수 있어요. </Step>
                <StepsContainer>
                    <StepBy>
                        <StepNumberStyle> STEP1 </StepNumberStyle>
                        <StepButton>문제 등록</StepButton>
                    </StepBy>
                    <StepBy>
                        <NextStepIcon src="./img/polygon_icon.png" alt="polygon Icon" />
                    </StepBy>
                    <StepBy>
                        <StepNumberStyle> STEP2 </StepNumberStyle>
                        <StepButton>문제 고르기</StepButton>
                    </StepBy>
                    <StepBy>
                        <NextStepIcon src="./img/polygon_icon.png" alt="polygon Icon" />
                    </StepBy>
                    <StepBy>
                        <StepNumberStyle> STEP3 </StepNumberStyle>
                        <StepButton> 시험지 저장</StepButton>
                    </StepBy>
                </StepsContainer>
            </IntroTitle>
            <IntroBody>
                <IntroContent>
                    <Step>문제 등록 툴 사용법 </Step>
                    <StepIntro>문제 등록 툴을 익혀 쉽고 빠르게 문제 등록을 시작해보세요. </StepIntro>
                    <EdtiToolImg src="./img/Intro_editTool.png" alt="editTool Image" />
                </IntroContent>
                <IntroContent>
                    <Step> AI 문제 자동 생성 </Step>
                    <StepIntro>시험지 연구소 AI가 파일을 읽고 문제를 자동으로 생성해드려요.</StepIntro>
                    <p style={{color : "#9A9DA0", fontSize:"14px", marginTop:"0px"}}> * .pdf / .md / .txt 파일만 가능합니다. </p>
                    <AIIcon src="./img/Intro_AI자동문제생성사진.png" alt="AI 자동생성 Image" />
                </IntroContent>
            </IntroBody>
        </MainIntroduction>
    );
}
