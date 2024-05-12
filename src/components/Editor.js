import React from 'react';

export const Editor = ({ editorRef, contentEditable, onInput, onDragOver, onCopy, onCut, onPaste, onKeyDown, onKeyUp, readOnly, dangerouslySetInnerHTML, style }) => {
  return (
    <div
      className="editor"
      contentEditable={contentEditable}
      ref={editorRef}
      onInput={onInput}
      readOnly={readOnly}
      onDragOver={onDragOver}
      onCopy={onCopy}
      onCut={onCut}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      style={style}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );
};
