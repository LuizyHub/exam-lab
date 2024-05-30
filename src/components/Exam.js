import React from "react";
export default function Exam({ isQuestion, parseImages, renderImages, isCommentary, isCommentaryQuestion }) {
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
            <div key={index} className="out-line" style={{ display: isCommentaryQuestion ? 'flex' : 'none', marginBottom: '10px', border: '1px solid #EBEDEF', padding: '20px', width: '100%', height: 'auto', borderRadius: '5px' }}>
            <p style={{padding:0, margin:0, marginRight:'5px'}}><b>{index + 1}.</b></p>
              <div>
                {/* 질문 */}
                <div style={{marginBottom: '6px'}}>
                  <b>{parseImages(item.question, item.question_images_in)}</b>
                </div>

                {/* 이미지 렌더링 */}
                <div style={{ width: '30%', marginBottom: '6px'}}>{renderImages(item.question_images_out)}</div>
                {/* 4선지 */}
                {item.options.map((option, optionIndex) => (
                  <div key={optionIndex}>{String.fromCharCode(9312 + optionIndex)} {option}</div>
                ))}
              </div>
            </div>

            <div style={{ display: isCommentary ? 'block' : 'none', marginBottom: '10px', border: '1px solid #EBEDEF', padding: '20px', width: '1180px', height: 'auto' }}>
              
              <div className="comment-container" style={{display: 'flex'}}>
                <div className="index" style={{marginRight: '5px'}}><b>{index + 1}.</b> </div>
                <div className="comment" style={{padding: '1px' }}>

                  <div style={{ marginBottom: '10px' }}><p style={{ margin: '0px' }}><b>답</b> : {String.fromCharCode(9311 + parseInt(item.answers))}</p></div>
                    {/* { parseInt(item.answers) } AI가 답을 생성할 때 0부터 시작하면 안된다. */}
                  
                  <div><p style={{ margin: '0px' }}><b>해</b> : {item.commentary}</p></div>

                </div>
              </div>
            </div>

          </div>
        ))}
      </div >
    </>
  );
}
