import { useState } from "react";
export default function ExamIdState() {
  const [ID, setID] = useState("");
  //QuestionsID
  const handleGetID = () => {
    return ID;
  }

  const handleSetID = (element) => {
    setID(element);
  }

  return { handleGetID, handleSetID };
}