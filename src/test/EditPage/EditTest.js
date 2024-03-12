import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditTest = () => {
  const [block1Value, setBlock1Value] = useState('');
  const [block2Value, setBlock2Value] = useState('');
  const [activeBlock, setActiveBlock] = useState('');
  const editorRef = useRef(null);

  const modules = useMemo(() => ({
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ['image'], // add's image support
    ],
  }), []);

  const handleChange = content => {
    if (activeBlock === 'block1') {
      setBlock1Value(content);
    } else if (activeBlock === 'block2') {
      setBlock2Value(content);
    }
  };

  const handleEditorFocus = block => {
    setActiveBlock(block);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h2> 문제 </h2>
        <div
          style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}
          onClick={() => handleEditorFocus('block1')}
        >
          <div dangerouslySetInnerHTML={{ __html: block1Value }} />
        </div>
        <h2>선택지</h2>
        <div
          style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}
          onClick={() => handleEditorFocus('block2')}
        >
          <div dangerouslySetInnerHTML={{ __html: block2Value }} />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Editor</h2>
        <ReactQuill
          ref={editorRef}
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
          value={activeBlock === 'block1' ? block1Value : block2Value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EditTest;
