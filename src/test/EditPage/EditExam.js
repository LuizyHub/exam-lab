import React, { useState, useEffect } from 'react';

export default function EditExam() {
  const [content, setContent] = useState('');

  //여기에 html로 저장이 될 수 있게 코드를 작성
  const handleChange = () => {
    const inputContent = editorRef.current.innerHTML; //여기에는 html 값이 들어간다.
    setContent(inputContent);
    // console.log(content); //일반 적으로 HTML을 제외하고 출력
    console.log(`inputContent : ${inputContent}\nuseState : ${content}`); //일반 적으로 HTML을 제외하고 출력
  };

  const handleBoldClick = () => {
    setStyle('bold');
    focusEditor();
  };

  const handleItalicClick = () => {
    setStyle('italic');
    focusEditor();
  };

  const handleUnderlineClick = () => {
    setStyle('underline');
    focusEditor();
  };

  const handleStrikeClick = () => {
    setStyle('strikeThrough');
    focusEditor();
  };

  const handleOrderedListClick = () => {
    setStyle('insertOrderedList');
    focusEditor();
  };

  const handleUnorderedListClick = () => {
    setStyle('insertUnorderedList');
    focusEditor();
  };

  const focusEditor = () => {
    editorRef.current.focus({ preventScroll: true });
  };

  function setStyle(style) {
    //document.execCommand() 메서드는 브라우저가 제공하는 기본 명령을 실행하는 데 사용된다. 특정 명령을 실행하면 브라우저가 해당 명령을 지원하는 경우에 텍스트에 대한 조작을 수행한다.
    document.execCommand(style);
    focusEditor();
  }

  const editorRef = React.createRef();

  return (
    <div>
      <h1>Test</h1>
      <div className="editor-menu" style={{ marginBottom: '10px' }}>
        <button onClick={handleBoldClick} style={{ marginRight: '5px' }}><b>B</b></button>
        <button onClick={handleItalicClick} style={{ marginRight: '5px' }}><i>I</i></button>
        <button onClick={handleUnderlineClick} style={{ marginRight: '5px' }}><u>U</u></button>
        <button onClick={handleStrikeClick} style={{ marginRight: '5px' }}><s>S</s></button>
        <button onClick={handleOrderedListClick} style={{ marginRight: '5px' }}>OL</button>
        <button onClick={handleUnorderedListClick} style={{ marginRight: '5px' }}>UL</button>
      </div>
      <div
        className="editor"
        contentEditable="true"
        // dangerouslySetInnerHTML={{ __html: content }}
        ref={editorRef}
        // onBlur={handleChange}
        onInput={handleChange}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px' }}
      />
      <div>
        <p>Content in useState(include HTML tag):</p>
        {content}
      </div>
    </div>
  );
}
