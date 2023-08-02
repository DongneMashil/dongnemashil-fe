import { selector } from 'recoil';
import { userState, UserState } from './atom';

//selector는 atom을 가공해서 사용할 수 있게 해줍니다.
//userHasProfileImageSelector는 userState의 profileImage가 있는지 없는지를 boolean으로 반환합니다.
export const userHasProfileImageSelector = selector<boolean>({
  key: 'userHasProfileImageSelector',
  get: ({ get }) => {
    const user = get(userState) as UserState;
    return user.profileImage !== '';
  },
});

//userIsDefinedSelector는 userState의 userId가 있는지 없는지를 boolean으로 반환합니다.
export const userIsDefinedSelector = selector<boolean>({
  key: 'userIsDefinedSelector',
  get: ({ get }) => {
    const user = get(userState) as UserState;
    return user.userId !== '';
  },
});

/** 
 * 위의 selector는 아래와 같이 작성할 수도 있습니다.
 * 위에는 엄격하게 하는 경우이고, 아래는 userState타입을 지정하지 않고 unknown으로 하는 경우입니다. 둘다 동작에는 무방함.

import { selector } from 'recoil';
import { userState } from './atom';

export const userHasProfileImageSelector = selector<boolean>({
  key: 'userHasProfileImageSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user.profileImage !== '';
  },
});

export const userIsDefinedSelector = selector<boolean>({
  key: 'userIsDefinedSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user.userId !== '';
  },
});
*/
