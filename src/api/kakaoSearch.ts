import axios from 'axios';

const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

export const searchAddress = (query: string) => {
  const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `KakaoAk ${apiKey}`,
    },
  });
};
