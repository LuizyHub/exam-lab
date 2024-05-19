import React from "react";

export default function Exam({ isQuestion, parseImages, renderImages, isCommentary }) {
  const printComponent = () => {
    const printableArea = document.getElementById('printableArea');
    const printContent = printableArea.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <>
      {/* style={{ listStylePosition: 'inside' }} */}
      <div className='exam' >
        {/* , listStyleType: 'none'   */}
        {isQuestion && isQuestion.map((item, index) => (

          <div key={index} >
            {/*  display: isQuestion ? 'block' : 'none'에 애러가 생김 */}
            <div key={index} style={{ display: isQuestion ? 'block' : 'none', marginBottom: '10px', border: '1px solid #EBEDEF', padding: '20px', width: '1180px', height: 'auto' }}>
              <div>
                {/* 질문 */}
                <div><b>{index + 1}. {parseImages(item.question, item.question_images_in)}</b></div>
                {/* 이미지 렌더링 */}
                <div style={{ width: '300px' }}>{renderImages(item.question_images_out)}</div>
                {/* 4선지 */}
                {item.options.map((option, optionIndex) => (
                  <div key={optionIndex}>{option}</div>
                ))}
              </div>
            </div>

            <div style={{ display: isCommentary ? 'block' : 'none', marginBottom: '10px', marginTop: '10px', border: '1px solid black', width: '70%' }}>해설 : {item.commentary}
            </div>

          </div>
        ))}
      </div >
    </>
  );
}
