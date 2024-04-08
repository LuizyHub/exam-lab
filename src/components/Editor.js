export default function Editor({ editorRef, imageSelectorRef, handleImageSelect, handleContent }) {
  return (
    <>
      {/* <div
        className="editor"
        contentEditable="true"
        ref={editorRef}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      /> */}
      <div
        className="editor"
        contentEditable="true"
        ref={editorRef}
        style={{ padding: '16px 24px', border: '1px solid #D6D6D6', borderRadius: '4px', width: '600px' }}
      />

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={imageSelectorRef}
        onChange={(e) => { handleImageSelect(e, editorRef) }}
      />
    </>
  )
}