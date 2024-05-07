import SelectExam from "./page/SelectExamPage";
import SelectExamCreate from "./page/SelectExamCreatePage";
import { RecoilRoot } from 'recoil';
import LabExam from "./page/LabExam";
import EditExam from "./page/EditExam";
import MainPage from "./page/MainPage"
import ParsingImageTest from "./test/html_parse_img/parsingImageTest"
import SelectQuestionPage from "./page/SelectQuestionPage"
import WorkBooks from "./page/WorkBooks";

import AttributeManager from "./components/AttributeManager";
import EnglishExam from "./test/english/englishExam";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/exams" element={<SelectExam />} />
            <Route path="/exams/create" element={<SelectExamCreate />} />
            <Route path="/selectQuestion" element={<SelectQuestionPage />} />
            <Route path="/workbooks/create" element={<LabExam />} />
            <Route path="/edit" element={<EditExam />} />
            {/* <Route path="/edit" element={<EditExamRefactory />} /> */}
            <Route path="/htmlParse" element={<ParsingImageTest />} />
            <Route path="/workbooks" element={<WorkBooks />} />
            {/* 영어문제 테스트를 위한 페이지 */}
            <Route path="/english" element={<EnglishExam />} />
            <Route path="/attribute" element={<AttributeManager />} />
          </Routes>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App;
