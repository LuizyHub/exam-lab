export default function Editor({ editorRef, imageSelectorRef, handleImageSelect, handleContent }) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef}
        onChange={(e) => { handleImageSelect(e, editorRef) }}
      />
      {/* <div
        className="editor"
        contentEditable="true"
        ref={editorRef}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      /> */}
      <form onSubmit={(e) => {
        e.preventDefault(); // 기본 동작 방지
        handleContent(e, editorRef); // 저장 함수 호출
      }}>
        <div
          className="editor"
          contentEditable="true"
          ref={editorRef}
          style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
        />
        <button type='submit'>저장</button>
      </form>
    </>
  )
}