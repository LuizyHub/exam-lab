import SelectQuestion from "../components/SelectQuestion";
import NavigationBar from "../components/NavigationBar";
import styled from 'styled-components';


const SelectQuesion = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 320px;
    margin-right: 18%;
    margin-top: 16px;
    transition: margin-left 0.3s ease;
`;

export default function SelectQuestionPage() {


    return (
        <SelectQuesion>
            <div>
                <SelectQuestion />
                <NavigationBar />
            </div>
        </SelectQuesion>
    );
}