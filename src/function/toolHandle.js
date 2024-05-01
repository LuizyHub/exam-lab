//---------------------------------------------------------------------- Tool Click area
export const focusEditor = (elementRef) => {//elementRef
  elementRef.current.focus({ preventScroll: true });
};

//execCommand를 기준으로 생성된 코드
export const setStyle = (style, elementRef) => {
  document.execCommand(style);
  focusEditor(elementRef);
};

export const handleToolClick = (e, elementRef) => {
  const element = e.currentTarget.name;
  //객체 저장
  console.log(element);
  setStyle(element, elementRef);
  focusEditor(elementRef);
};


//tool button ctrl
export const handleImgToolClick = (elementRef) => {//imageSelectorRef와 유사하게 작명이 필요하다. 즉, ref를 통해서 동작하는 fn명은 유사할 필요가 있다.
  // 파일 선택 input을 클릭합니다.
  elementRef.current.click();
}