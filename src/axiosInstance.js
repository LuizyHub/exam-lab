import axios from 'axios';

const api = axios.create({
  baseURL: '/', // baseURL을 수정하여 프록시를 우회하고 직접 도메인에 요청을 보냅니다.
  withCredentials: true
});

export default api;
