let name = document.querySelector('#name');
let man = document.querySelector('#gender_man');
let lady = document.querySelector('#gender_lady');
let gender_select = document.querySelector('#gender_select');
let age = document.querySelector('#age');
let form = document.querySelector('#form');

const info_fn = (e) => {
  e.preventDefault();
  console.log('이름:', name.value);
  console.log('성별 (남):', man.checked);
  console.log('성별 (여):', lady.checked);
  console.log('나이:', age.value);
}

// if (man.checked) {
//   // gender_select.value = man.value;
//   console.log("man")
// } else if (lady.checked) {
//   // gender_select.value = lady.value;
//   console.log("lady")
// }

const infoData_fn = (e) => {
  e.preventDefault();
  format_info = {
    '이름': name.value,
    // '성별 (남)': man.checked,
    // '성별 (여)': lady.checked,
    '성별': gender_select.value,
    '나이': age.value
  };
  console.log(format_info);
}
//hidden을 이용해서 클릭 값을 전달 이는 곧 API의 url을 지정
//예시로 학생정보 API 출결 정보 API를 각기 달라 선택
man.addEventListener('click', () => {
  if (man.checked) {
    gender_select.value = man.value;
    // console.log(gender_select.value);
    // console.log("man")
  }
})

lady.addEventListener('click', () => {
  if (lady.checked) {
    gender_select.value = lady.value;
    // console.log(gender_select.value);
    // console.log("lady")
  }
})

form.addEventListener('submit', infoData_fn)
// 여기서 부터 다른 페이지로  데이터를 넘겨 주는 것은 localStorage나 cookie를 사용해야한다.

//ref : https://velog.io/@y0ungg/520-%EC%86%94%EB%A1%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8