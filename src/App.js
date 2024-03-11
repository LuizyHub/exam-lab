import SelectExam from "./components/SelectExam";
import LabExam from "./components/LabExam";
import EditExam from "./components/EditExam";
import EditTest from "./test/EditPage/EditTest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SelectExam />} />
          <Route path="/lab" element={<LabExam />} />
          <Route path="/edit" element={<EditExam />} />
          <Route path="/editTest" element={<EditTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
