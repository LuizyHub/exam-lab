import SelectExam from "./page/SelectExamPage";
import LabExam from "./page/LabExam";
import EditExam from "./test/EditPage/EditExam";
import MainPage from "./page/MainPage"
import ParsingImageTest from "./test/html_parse_img/parsingImageTest"
import SelectQuestionPage from "./page/SelectQuestionPage"

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="/select" element={<SelectExam />} />
          <Route path="/selectQuestion" element={<SelectQuestionPage />} />
          <Route path="/lab" element={<LabExam />} />
          <Route path="/edit" element={<EditExam />} />
          <Route path="/htmlParse" element={<ParsingImageTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

