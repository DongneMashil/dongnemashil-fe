import { axiosInstance } from './api';

export const loginKakao = () => {
  const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/login/kakao&response_type=code`;

  window.location.href = loginURL;
};

export const loginKakaoCallback = (code: string) => {
  return () => {
    axiosInstance
      .get(`kakao?code=${code}`)
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.Accesstoken;
        const REFRESH_TOKEN = res.data.Refreshtoken;

        localStorage.setItem('access_token', ACCESS_TOKEN);
        localStorage.setItem('refresh_token', REFRESH_TOKEN);

        window.location.href = `/`;
      })
      .catch((err) => {
        console.log('kakao 소셜 로그인 에러 : ', err);
        window.alert('소셜 로그인에 실패하였습니다.');
        window.location.href = `/login`;
      });
  };
};
