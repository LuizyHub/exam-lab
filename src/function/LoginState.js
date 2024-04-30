import axios from 'axios';

export const getLoginInfo = async () => {
  try {
    const response = await axios.get('/api/v1/users/status');
    const { user_name, login } = response.data;
    return { userName: user_name, loginStatus: login };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 인증 실패 시 빈 값 반환
      return { userName: '', loginStatus: false };
    } else {
      // 기타 에러 발생 시 에러 던지기
      throw error;
    }
  }
};
