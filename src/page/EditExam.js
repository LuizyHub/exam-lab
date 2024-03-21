import React, { useState } from "react";

export default function EditExam() {

  const [fontSize, setFontSize] = useState("12px");
  const [uploadedImage, setUploadedImage] = useState(null); 

  const wrapTextWithSpan = (action, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();
    const span = document.createElement("span");

    switch (action) {
      case "bold":
        span.style.fontWeight = "bold";
        break;
      case "underline":
        span.style.textDecoration = "underline";
        break;
      case "italic":
        span.style.fontStyle = "italic";
        break;
      case "fontSize":
        span.style.fontSize = value;
        break;
      default:
        break;
    }

    span.appendChild(selectedText);
    range.insertNode(span);

    // 선택 해제
    selection.removeAllRanges();
  };

  // 정렬 기능 추가
  const applyTextAlignment = (alignment) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;

    const range = selection.getRangeAt(0);
    const contentEditableDiv = range.commonAncestorContainer.parentNode.closest('[contenteditable="true"]');

    if (contentEditableDiv) {
      contentEditableDiv.style.textAlign = alignment;
    }
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    wrapTextWithSpan("fontSize", e.target.value);
  };

  // 이미지 파일을 업로드하고 미리 보기를 설정하는 함수
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // 업로드된 이미지의 URL을 상태에 저장
      };
      reader.readAsDataURL(file);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  return (
    <div>
      
      
      <button onClick={() => wrapTextWithSpan("bold")} style={{ fontWeight: "bold", marginRight: "10px" }}>
        볼드
      </button>
      <button onClick={() => wrapTextWithSpan("underline")} style={{ textDecoration: "underline" }}>
        밑줄
      </button>
      <button onClick={() => wrapTextWithSpan("italic")} style={{ fontStyle: "italic" }}>
        기울기
      </button>

      {/* 폰트 사이즈 조절 */}
      <select value={fontSize} onChange={handleFontSizeChange}>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        {/* 추가 폰트 사이즈 옵션 가능 */}
      </select>
      {/* 텍스트 정렬 */}
      <button onClick={() => applyTextAlignment("left")} style={{ marginRight: "10px" }}>
        왼쪽 정렬
      </button>
      <button onClick={() => applyTextAlignment("center")} style={{ marginRight: "10px" }}>
        가운데 정렬
      </button>
      <button onClick={() => applyTextAlignment("right")} style={{ marginRight: "10px" }}>
        오른쪽 정렬
      </button>
      {/* 이미지 업로드 버튼 */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {/* 업로드된 이미지 미리 보기 */}
      {uploadedImage && (
        <div style={{ marginTop: "10px" }}>
          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: "300px", maxHeight: "300px" }} />
        </div>
      )}

      {/* 여러 contentEditable div */}
      <div
        contentEditable={true}
        style={{ marginBottom: "10px", width: "300px", height: "100px", border: "1px solid black", padding: "5px" }}
      ></div>
      <div
        contentEditable={true}
        style={{ marginBottom: "10px", width: "300px", height: "100px", border: "1px solid black", padding: "5px" }}
      ></div>
      {/* 추가 contentEditable div 가능 */}

    </div>
  );
}
