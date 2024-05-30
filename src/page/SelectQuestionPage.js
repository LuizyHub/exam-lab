import SelectQuestion from "../components/SelectQuestion";
import NavigationBar from "../components/NavigationBar";
import styled from 'styled-components';
import SideBar from "../components/SideBar";

const SelectQuesion = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 320px;
    margin-right: 18%;
    margin-top: 16px;
    transition: margin-left 0.3s ease;
`;

const PageIntroContainer = styled.div`
  top: 0;
  width: 100%;
  height: 120px;
  background-color: #ECFBFB;
  margin-top: 0;
`;

const PageIntroContent = styled.div`
  margin-left: 320px;
`;

const StepsContainer = styled.div`
    display: flex;
`;

const StepBy = styled.div`
    margin-top: 26px;
`;

const StepButton = styled.button`
    background-color: ${({ $primary }) => $primary ? '#29B8B5' : '#FFFFFF'};    
    color: #3E3F41;
    border: 1.5px solid ${({ $primary }) => $primary ? '#29B8B5' : '#BADEDE'};
    border-radius: 8px;
    padding: 5px 8px;
    flex: 1; 
    width: 250px;
    height: 65px;
    font-size: 18px;
    margin: 0 10px;
    margin-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StepNumberStyle = styled.p`
    color: ${({ $primary }) => $primary ? '#FFFFFF' : '#24ABA8'};    
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0;
    font-weight: bold;
`;

const StepTitle = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: ${({ $primary }) => $primary ? '#FFFFFF' : '#3E3F41'};    
    margin-top: 6px;
    margin-bottom: 10px;
`;

const NextStepIcon = styled.img`
    width: 18px;
    margin: 3px 10px;
    margin-top: 20px;
`;

export default function SelectQuestionPage() {
    return (
        <div style={{marginTop: 0}}>
            <PageIntroContainer>
                <PageIntroContent>
                    <StepsContainer>
                        <StepBy>
                            <StepButton $primary="true"> 
                                <div>
                                    <StepNumberStyle $primary="true"> Step 1 </StepNumberStyle>
                                    <StepTitle $primary="true">시험 종류 선택</StepTitle>
                                </div>
                            </StepButton>
                        </StepBy>

                        <StepBy>
                            <NextStepIcon src="/img/polygon_icon.svg" alt="polygon Icon" />
                        </StepBy>
                        <StepBy>
                            <StepButton $primary="true">
                                <div>
                                    <StepNumberStyle $primary="true"> Step 2 </StepNumberStyle>
                                    <StepTitle $primary="true">문제 검색 및 선택</StepTitle>
                                </div>
                            </StepButton>
                        </StepBy>
                        <StepBy>
                            <NextStepIcon src="/img/polygon_icon.svg" alt="polygon Icon" />
                        </StepBy>
                        <StepBy>
                            <StepButton>
                                <div>
                                    <StepNumberStyle> Step 3 </StepNumberStyle>
                                    <StepTitle>나만의 시험지 제작 완료</StepTitle>
                                </div>
                            </StepButton>
                        </StepBy>
                    </StepsContainer>
                </PageIntroContent>
            </PageIntroContainer>
            <SelectQuesion>
                <div>
                    <SelectQuestion />
                    <SideBar />
                    <NavigationBar />
                </div>
            </SelectQuesion>
        </div>
    );
}
