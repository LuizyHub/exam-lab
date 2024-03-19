// shuffleArray(Fisher-Yates) 알고리즘을 사용하여 배열을 섞는 함수
export function shuffleArray(arrayItem) {
  for (let i = arrayItem.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayItem[i], arrayItem[j]] = [arrayItem[j], arrayItem[i]];
  }
  return arrayItem;
}
// 문제를 섞는 함수를 호출하는 버튼 클릭 핸들러
export function handleShuffle(data, setData) {
  const shuffledData = shuffleArray(data);
  setData([...shuffledData]); // 새로운 배열로 설정하여 React가 업데이트를 감지할 수 있게 함
  return shuffledData;
};