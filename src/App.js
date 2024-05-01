import SelectExam from "./page/SelectExamPage";
import SelectExamCreate from "./page/SelectExamCreatePage";
import LabExam from "./page/LabExam";
import EditExam from "./test/EditPage/EditExam";
import EditExamRefactory from "./test/EditPage/EditExamRefactory";
import MainPage from "./page/MainPage"
import ParsingImageTest from "./test/html_parse_img/parsingImageTest"
import SelectQuestionPage from "./page/SelectQuestionPage"
import WorkBooks from "./page/WorkBooks";

import EnglishExam from "./test/english/englishExam";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/exams" element={<SelectExam />} />
          <Route path="/exams?create" element={<SelectExamCreate />} />
          <Route path="/selectQuestion" element={<SelectQuestionPage />} />
          <Route path="/workbooks/create" element={<LabExam />} />
          {/* <Route path="/edit" element={<EditExam />} /> */}
          <Route path="/editR" element={<EditExamRefactory />} />
          <Route path="/htmlParse" element={<ParsingImageTest />} />
          <Route path="/workbooks" element={<WorkBooks />} /> 
          <Route path="/english" element={<EnglishExam />} /> 
          {/* 영어문제 테스트를 위한 페이지 */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;