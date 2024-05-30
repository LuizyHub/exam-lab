import React from 'react';

export const Editor = ({ className = 'editor', editorRef, contentEditable, onInput, onDragOver, onCopy, onCut, onPaste, onKeyDown, onKeyUp, readOnly, dangerouslySetInnerHTML, style }) => {
   const defaultClassName = `${className} editor`;
  return (
    <div
      className={ defaultClassName }
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
      // style={style}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );
};
