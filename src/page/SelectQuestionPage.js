import SelectQuestion from "../components/SelectQuestion";
import NavigationBar from "../components/NavigationBar";
import { useRecoilValue } from 'recoil';
import { isVisibleState } from '../recoil/atoms';
import styled from 'styled-components';


const SelectQuesion = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${props => props.isSidebarOpen ? '250px' : '60px'};
    margin-right: 60px;
    transition: margin-left 0.3s ease;
`;

export default function SelectQuestionPage() {

    const isSidebarOpen = useRecoilValue(isVisibleState);

    return (
        <SelectQuesion isSidebarOpen={isSidebarOpen}>
            <div>
                <SelectQuestion />
                <NavigationBar />
            </div>
        </SelectQuesion>
    );
}