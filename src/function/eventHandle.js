// ExternalEventHandlers.js
export function handleOnInput() {
  // 이벤트 처리 로직 => 아마도 빠로 빼지는 않을 수도
}

export function handleDragOver(e) {
  // 이벤트 처리 로직
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
  }// 에디터 내에서 이미지 잘라내기 동작 막기
}

export function handleKeyDown(e) {
  // 이벤트 처리 로직
}

export function handleKeyUp(e) {
  // 이벤트 처리 로직
}

export function handleDangerouslySetInnerHTML() {
  // 이벤트 처리 로직
}
