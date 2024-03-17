import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css';

export default function EditTest() {
  const initialEditorValues = [`<p>input</p>`, '<p>input</p>', '<p>input</p>'];

  const [blockValues, setBlockValues] = useState(initialEditorValues);

  //여기서 activeBlock은 현재 활성화된 편집 영역을 나타내는 상태 변수이다.
  const [activeBlocks, setActiveBlocks] = useState([false, false, false]);


  //modules 변수를 사용하여 Quill 에디터의 모듈을 설정한다. 이 모듈에는 툴바 및 서식 지정과 관련된 옵션이 정의된다.
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ['image'], // add's image support
    ],
  };

  //에디터 내용이 변경될 때 호출되며, 현재 활성화된 편집 영역에 따라 상태를 업데이트한다.
  //content의 값은 해당 react quill의 텍스트의 값을 가져오는 것이다.
  function handleBlockChange(index, eventValue, isActive) {
    if (isActive) {
      const newBlockValues = [...blockValues];
      newBlockValues[index] = eventValue;
      setBlockValues(newBlockValues);
      console.log(`Input ${index} changed:`, newBlockValues[index]);
    }
  };

  // 각 블록이 선택될 때 호출되는 함수
  function handleBlockSelect(index, value) {
    const newActiveBlocks = activeBlocks.map((value, i) => index === i);
    setActiveBlocks(newActiveBlocks);
    console.log(`newActiveBlocks = ${newActiveBlocks}`);
    console.log(`${index} = ${value}`);
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>

        <h2> Test </h2>
        {/* 선택하는 옵션 */}

        {/* map 함수로 blockValues의 배열로 접근을 한다. */}
        {blockValues.map((blockValue, index) => (
          <div>
            <select>
              <option>question</option>
              <option>image</option>
              <option>option</option>
            </select>
            <div key={index}>
              <div
                style={{ border: '1px solid #ccc', padding: '10px', width: '90%' }}

                onClick={() => { handleBlockSelect(index, blockValue) }}
                type="text"
                //해당 에디터의 값이 input으로 전달된다.
                // dangerouslySetInnerHTML={{ __html: blockValue }}
                // 해당 인풋 값이 변화되는 이벤트
                //e.target.value는 내가 입력한 값을 확인하는 것?
                onChange={(e) => handleBlockChange(index, e.target.value, activeBlocks[index])}
                readOnly
              >{parse(blockValue)}</div>
            </div>
          </div>
        ))}

      </div>
      <div style={{ flex: 0.5 }}>
        <h2>Editor</h2>
        <ReactQuill
          // ref={editorRef}
          theme="snow"
          modules={modules}
          formats={[
            'font',
            'size',
            'align',
            'color',
            'bold',
            'italic',
            'underline',
            'strike',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'background',
          ]}
          //여기서 value의 값을 전달하고 안하고 한다.
          value={blockValues[activeBlocks.findIndex(block => block)]}
          onChange={(content) => {
            console.log(`Quill 에디터의 내용:`, content);
            handleBlockChange(activeBlocks.findIndex(block => block), content, true)
          }}
        />
        {/* <button>Click</button> */}
      </div>
    </div>
  );
};
