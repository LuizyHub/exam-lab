import SelectExamPage from "./page/SelectExamPage";
import SelectQuestionPage from "./page/SelectQuestionPage";
import LabExam from "./page/LabExam";
import EditExam from "./page/EditExam";
import EditTest from "./test/EditPage/EditTest";
import AttributeManager from "./test/EditPage/AttributeManager";
import ParsingImageTest from "./test/html_parse_img/parsingImageTest"

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SelectExamPage />} />
          <Route path="/selectQuestion" element={<SelectQuestionPage />} />
          <Route path="/lab" element={<LabExam />} />
          <Route path="/edit" element={<EditExam />} />
          <Route path="/editTest" element={<EditTest />} />
          <Route path="/add" element={<AttributeManager />} />
          <Route path="/htmlParse" element={<ParsingImageTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
