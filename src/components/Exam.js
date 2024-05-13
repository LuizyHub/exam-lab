import React from "react";

export default function Exam({ isQuestion, parseImages, renderImages, isCommentary }) {
  const printComponent = () => {
    const printableArea = document.getElementById('printableArea');
    const printContent = printableArea.innerHTML;
    const originalContent = document.body.innerHTML;

    // 프린트할 내용으로 바꿔줍니다.
    document.body.innerHTML = printContent;

    // 프린트합니다.
    window.print();

    // 프린트가 끝나면 원래 내용으로 되돌립니다.
    document.body.innerHTML = originalContent;

    // 프린트 취소 후 페이지를 새로고침합니다.
    window.location.reload();
  };

  return (
    <>
      <ol style={{ listStylePosition: 'inside' }}>
        {/* , listStyleType: 'none'   */}
        {isQuestion && isQuestion.map((item, index) => (
          <div key={index}>
            <li key={index} style={{ marginBottom: '70px', border: '1px solid black', width: '70%' }}>
              {/* 질문 */}
              <p>{parseImages(item.question, item.question_images_in)}</p>
              {/* 이미지 렌더링 */}
              <div style={{ width: '500px' }}>{renderImages(item.question_images_out)}</div>
              {/* 4선지 */}
              <ol style={{ listStyleType: 'none' }}>
                {item.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ol>
            </li>
            <p style={{ display: isCommentary ? 'block' : 'none', marginBottom: '70px', border: '1px solid black', width: '70%' }}>해설 : {item.commentary}</p>
          </div>
        ))}
      </ol>
    </>
  );
}
