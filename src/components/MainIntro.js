import styled from 'styled-components';


const MainIntroduction = styled.div `

margin-left: 200px;
`;

const IntroTitle = styled.div`

`;

const IntroBody = styled.div`

`;



export default function MaingInto() {
    return (
        <MainIntroduction>
            <IntroTitle>
                <h3> 기존 문제들을 조합하여 나만의 시험지를 제작할 수 있어요! </h3>
            </IntroTitle>
            <IntroBody>
                <p>STEP 1</p>
                <h3> 어떤 시험지를 제작할지 종류를 선택해주세요</h3>
                <p> 해당 유형의 시험지 문제를 제공받아 시험지를 제작할 수 있습니다.</p>
            </IntroBody>
        </MainIntroduction>
    );
}