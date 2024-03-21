import SelectQuestion from "../components/SelectQuestion";
import ShowQuestionList from "../components/ShowQuestionList";
import SelectedQuestionList from "../components/SelectedQuestionList";

export default function SelectQuestionPage(){
    return(
      <div>
            <div>
                <SelectQuestion />
            </div>
            {/* <div>
                <div>
                    <ShowQuestionList />
                </div>
                <div>
                    <SelectedQuestionList />
                </div>
            </div> */}
        </div>
    );
}