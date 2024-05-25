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

const ExamButton = styled.button`
    padding: 10px 20px;
    background-color: #29B8B5;
    color: white;
    border: none;
    border-radius: 12px;
    margin-top: 20px;
    margin-right: 20px;
    font-size: 21px;
    font-weight: bold;
    width: 253px;
    height: 68px;
`;

const IntroBody = styled.div`
    margin-top: 0;
`;

const StepIntroText = styled.div`
    flex: 1; 
    margin:0;
    
`;

const StepIntroContent = styled.div`
    display: flex;
    flex-direction: row;     
    margin-bottom: 337px;
    margin-top: 80px;
`;



const StepNumberStyle = styled.p`
    color: #24ABA8;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: bold;
`;

const Step = styled.h3`
    color: #262626;
    font-size: 26px;
    margin-top: 3px;
    margin-bottom: 10px;
`;

const StepIntro = styled.p`
    font-size: 16px;
    color: #313132;
    margin-top: 15px;
    margin-bottom: 10px;
`;

const StepOne = styled.div`


`;

const IntoExamButton = styled.button`
    margin: 5px 10px; 
    margin-top: 40px;
    background-color: ${({ $primary }) => $primary ? '#EDFAFA' : '#FFFFFF'};
    color: ${({ $primary }) => $primary ? '#262626' : '#6B6E72'};
    border: 1px solid ${({ $primary }) => $primary ? '#C6E7E7' : '#DCDCDD'};
    border-radius: 8px;
    padding: 5px 8px;
    flex: 1; 
    width: 177px;
    height: 69px;
    font-size: 18px;
    font-weight: bold;
`;


const SelectIntroImg = styled.img`
    width: 609px;
    margin-left: 80px;
`;

const PDFIntroImg = styled.img`
    width: 318px;
`;



export default function MaingInto() {
    return (
        <MainIntroduction>
            <br/><br/><br/>
            <IntroTitle>
                <StepNumberStyle>나만의 시험지</StepNumberStyle>
                <Step> 문제들을 조합하여 <br/>
                    나만의 시험지를 제작할 수 있어요! </Step>
                <p style={{fontWeight : "bold", fontSize:"21px", marginBottom:"5px"}}>현재 제공되는 시험지 문제</p>
                <p style={{color : "#9A9DA0", fontSize:"14px", marginTop:"0px"}}>*향후에는 다양한 종류의 시험지 문제가 추가될 예정입니다. </p>
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
                    <StepOne>
                        <IntoExamButton $primary="true">연구소 문제</IntoExamButton>
                        <IntoExamButton>나만의 문제</IntoExamButton>
                    </StepOne>
                </StepIntroContent>
                <StepIntroContent>
                    <StepIntroText>
                    <StepNumberStyle>STEP 2</StepNumberStyle>
                        <Step> 문제 검색을 통해 <br/>
                             원하는 문제만 골라서 시험지를 제작하세요. </Step>
                        <StepIntro> 검색어와 태그를 통해 원하는 문제를 빠르고 정확하게 찾을 수 있습니다. <br/>
                            다양한 난이도, 문제 유형 등을 설정하여 맞춤형 시험지를 생성해 보세요</StepIntro>
                    </StepIntroText>
                    <SelectIntroImg src="./img/Intro_문제검색설명.png" alt="문제 검색 설명 Image" />
                </StepIntroContent>
                <StepIntroContent>
                    <StepIntroText>
                        <StepNumberStyle>STEP3</StepNumberStyle>
                        <Step>나만의 시험지 제작 완료하기</Step>
                        <StepIntro>선택한 문제들을 모아 표준화된 형태로 시험지를 생성하고 출력할 수 있습니다. <br/>
                                    나만의 시험지를 통해 효율적인 학습과 출제가 가능한 PDF 시험지를 만들어보세요. </StepIntro>
                    </StepIntroText>
                    <PDFIntroImg src="./img/Intro_PDF저장사진.png" alt="PDF 저장 Image" />
                </StepIntroContent>
                

            </IntroBody>
        </MainIntroduction>
    );
}