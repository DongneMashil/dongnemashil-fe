import { postLikeOptimistic } from 'api/detailApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserState, userProfileSelector } from 'recoil/userInfo';

interface UseLikeProps {
  initialIsLiked: boolean;
  initialLikeCnt: number;
  reviewId: string;
}
export const useLike = ({
  initialIsLiked,
  initialLikeCnt,
  reviewId,
}: UseLikeProps): {
  isLiked: boolean;
  likeCnt: number;
  toggleLikeHandler: () => Promise<void>;
} => {
  const [lastClickedTime, setLastClickedTime] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
  const userState = useRecoilValue(userProfileSelector);
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userProfileSelector);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCnt(initialLikeCnt);
  }, [initialIsLiked, initialLikeCnt]); // 쓰로틀링이 걸려도 최신 데이터로 업데이트

  const toggleLikeHandler = async () => {
    const forceEndLoadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (loading) return;
    setLoading(true);
    if (Date.now() - (lastClickedTime || 0) < 500) return; // 마지막 클릭으로부터 0.5초 안에 재클릭을 방지
    setLastClickedTime(Date.now());

    if (userState.isLoggedIn === false) {
      navigate('/login');
    }
    const previousIsLiked = isLiked;
    const optimisticLikeCnt = isLiked ? likeCnt - 1 : likeCnt + 1;
    setIsLiked(!isLiked);
    setLikeCnt(optimisticLikeCnt);

    try {
      const result = await postLikeOptimistic(reviewId, previousIsLiked);
      if (result !== !previousIsLiked) {
        // API 응답과 낙관적 업데이트의 결과가 다르면 api기준으로 업데이트
        setIsLiked(result); // API 응답으로 결과만 업데이트
        setLikeCnt(likeCnt); // 원래의 좋아요 수로 되돌립니다.
      }
    } catch (error) {
      console.log('좋아요 처리 중 오류가 발생했습니다.'); // 오류 처리
      console.log(error);
      localStorage.clear();
      const newData: UserState = {
        userId: '',
        nickName: '',
        isLoggedIn: false,
      };

      setUserState(newData);
      setIsLiked(previousIsLiked);
      setLikeCnt(likeCnt);
    } finally {
      clearTimeout(forceEndLoadingTimeout); // 강제로 종료하는 timeout을 제거합니다.
      setLoading(false);
    }
  };

  return { isLiked, likeCnt, toggleLikeHandler };
};
