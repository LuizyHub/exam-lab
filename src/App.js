import SelectExam from "./page/SelectExamPage";
import SelectExamCreate from "./page/SelectExamCreatePage";
import { RecoilRoot } from 'recoil';
import LabExam from "./page/LabExam";
import EditExam from "./page/EditExam";
import MainPage from "./page/MainPage"
import ParsingImageTest from "./test/html_parse_img/parsingImageTest"
import SelectQuestionPage from "./page/SelectQuestionPage"
import WorkBooks from "./page/WorkBooks";

//import Pdf from "./test/Pdf/Pdf";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <RecoilRoot>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/exams" element={<SelectExam />} />
            <Route path="/exams/create" element={<SelectExamCreate />} />
            <Route path="/selectQuestion" element={<SelectQuestionPage />} />
            <Route path="/edit" element={<EditExam />} />
            {/* <Route path="/edit" element={<EditExamRefactory />} /> */}
            <Route path="/htmlParse" element={<ParsingImageTest />} />
            <Route path="/workbooks" element={<WorkBooks />} />
            <Route path="/workbooks/create" element={<LabExam />} />
            {/* 테스트용 */}
            {/* <Route path="/pdf" element={<Pdf />} /> */}
          </Routes>
        </div>

      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;