import { atom } from 'recoil';

export interface UserState {
  userId: string;
  nickName: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userId: '',
  nickName: '',
  isLoggedIn: false,
};

//atom은 recoil의 상태를 정의합니다.
//key는 userState를 구분하는 식별자입니다.
export const userState = atom({
  key: 'userState',
  default: initialState,
});
