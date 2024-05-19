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

const ExamButton = styled.button`
    padding: 10px 20px;
    background-color: #5BB6B4;
    color: white;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
`;

const IntroBody = styled.div`
    
`;

const StepIntroText = styled.div`
    flex: 1; 
    margin:0;
`;

const StepIntroContent = styled.div`
    display: flex;
    flex-direction: row;     
    margin-top: 80px;
    margin-bottom: 80px;
`;

const StepNumberStyle = styled.p`
    color: #24ABA8;
    font-size: 12px;
    margin-bottom: 0;
`;

const Step = styled.h3`
    color: #262626;
    font-size: 18px;
    margin-top: 3px;
    margin-bottom: 5px;
`;

const StepIntro = styled.p`
    font-size: 12px;
    color: #313132;
    margin-top: 5px;
    margin-bottom: 10px;
`;

const IntoExamButton = styled.button`
    margin: 5px 10px; 
    margin-top: 40px;
    background-color: ${props => props.primary ? '#EDFAFA' : '#FFFFFF'};
    color: ${props => props.primary ? '#262626' : '#6B6E72'};
    border: 0.5px solid #C6E7E7;
    border-radius: 3px;
    padding: 5px 8px;
    flex: 1; 
    width: 100px;
    height: 45px;
    font-size: 12px;
`;

const PDFIntroImg = styled.img`
    width: 200px;
`;

const SelectIntroImg = styled.img`
    width: 400px;
    margin-left: 80px;
`;



export default function MaingInto() {
    return (
        <MainIntroduction>
            <br/><br/><br/>
            <IntroTitle>
                <StepNumberStyle>나만의 시험지</StepNumberStyle>
                <Step> 기존 문제들을 조합하여 <br/>
                    나만의 시험지를 제작할 수 있어요! </Step>
                <p>현재 제공되는 시험지 문제</p>
                <StepIntro>*향후에는 다양한 종류의 시험지 문제가 추가될 예정입니다. </StepIntro>
                <ExamButton>운전면허 필기 - 1종, 2종</ExamButton>
                <ExamButton>수능 - 영어</ExamButton>
            </IntroTitle>
            <IntroBody>
                <StepIntroContent>
                    <StepIntroText>
                        <StepNumberStyle>STEP 1</StepNumberStyle>
                        <Step> 어떤 시험지를 제작할지 <br/> 종류를 선택해주세요</Step>
                        <StepIntro> 연구소에서 제공하는 문제와 나만의 문제에서 등록한 문제 중에서 <br/> 선택하여 시험지를 만들 수 있습니다.</StepIntro>
                    </StepIntroText>
                    <div>
                        <IntoExamButton primary="true">연구소 문제</IntoExamButton>
                        <IntoExamButton>나만의 문제</IntoExamButton>
                    </div>
                </StepIntroContent>
                <StepIntroContent>
                    <StepIntroText>
                    <StepNumberStyle>STEP 2</StepNumberStyle>
                        <Step> 많은 문제들 중 <br/> 원하는 문제만 골라서 시험지를 제작하세요. </Step>
                        <StepIntro> 해당 유형의 시험지 문제를 제공받아 시험지를 제작할 수 있습니다.</StepIntro>
                    </StepIntroText>
                    <SelectIntroImg src="./img/Intro_문제검색설명.png" alt="문제 검색 설명 Image" />
                </StepIntroContent>
                <StepIntroContent>
                    <StepIntroText>
                        <StepNumberStyle>STEP3</StepNumberStyle>
                        <Step>나만의 시험지 제작 완료하기</Step>
                        <StepIntro>시험지를 저장하고 PDF 다운로드가 가능합니다.</StepIntro>
                    </StepIntroText>
                    <PDFIntroImg src="./img/Intro_PDF저장사진.png" alt="PDF 저장 Image" />
                </StepIntroContent>
                

            </IntroBody>
        </MainIntroduction>
    );
}