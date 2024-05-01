import SelectExam from "./page/SelectExamPage";
import LabExam from "./page/LabExam";
import EditExam from "./page/EditExam";
import MainPage from "./page/MainPage"
import ParsingImageTest from "./test/html_parse_img/parsingImageTest"
import SelectQuestionPage from "./page/SelectQuestionPage"
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
          <Route path="/selectQuestion" element={<SelectQuestionPage />} />
          <Route path="/workbooks/create" element={<LabExam />} />
          <Route path="/exams/3" element={<EditExam />} />
          <Route path="/htmlParse" element={<ParsingImageTest />} />
          <Route path="/english" element={<EnglishExam />} />
          {/* 영어문제 테스트를 위한 페이지 */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

