// ExternalEventHandlers.js
export function handleOnInput() {
  // 이벤트 처리 로직 => 아마도 빠로 빼지는 않을 수도
}

export function handleDragOver(e) {
  // 이벤트 처리 로직
  e.preventDefault()
}

export function handleCopy(e) {
  // 이벤트 처리 로직
  if (e.target.tagName.toLowerCase() === 'img') {
    e.preventDefault();
  }
}

export function handleCut(e) {
  // 이벤트 처리 로직
  if (e.target.tagName.toLowerCase() === 'img') {
    e.preventDefault();
  }
}

export function handlePaste(e) {
  // 이벤트 처리 로직
  if (e.target.tagName.toLowerCase() === 'img') {
    e.preventDefault();
  }
  //외부 이미지 붙혀넣기 동작 막기
  const items = (e.clipboardData || e.originalEvent.clipboardData).items;
  let hasImage = false;
  for (let index in items) {
    const item = items[index];
    if (item.kind === 'file' && item.type.includes('image')) {
      hasImage = true;
      break;
    }
  }
  if (hasImage) {
    e.preventDefault();
  }
}

export function handleKeyDown(e) {
  // 이벤트 처리 로직
  //editorRef2
  /**
  if (e.key === 'Enter') {
    e.preventDefault(); // 기본 동작 막기

    // 생성된 문자열을 현재 포커스된 위치에 삽입합니다.
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const textNode = document.createTextNode(imageInit);
    range.insertNode(textNode);

    // 새로운 줄을 만들기 위해 br 태그를 삽입합니다.
    const br = document.createElement('br');
    range.insertNode(br);

    // 커서를 새로운 줄의 시작 지점으로 이동시킵니다.
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);

    // 커서를 설정합니다.
    selection.removeAllRanges();
    selection.addRange(range);
  }
   */
}

export function handleKeyUp(e) {
  // 이벤트 처리 로직
}

export function handleDangerouslySetInnerHTML() {
  // 이벤트 처리 로직
}
