import { postLikeOptimistic } from 'api/detailApi';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userInfo';

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
  canClick: boolean; // 추가 상태값: 클릭 가능 여부를 반환
} => {
  const [lastClickedTime, setLastClickedTime] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
  const userState = useRecoilValue(userProfileSelector);
  const toggleLikeHandler = async () => {
    if (Date.now() - (lastClickedTime || 0) < 500) return; // 마지막 클릭으로부터 0.5초 안에 재클릭을 방지
    setLastClickedTime(Date.now());

    if (userState.isLoggedIn === false)
      return alert('로그인 하시면 좋아요를 누를 수 있습니다.');
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
        //(이 페이지 진입 후, 별도의 페이지에서 이용자가 수정을 했다고 가정하고, 기존 숫자가 맞는걸로 가정함)
        setTimeout(
          () => {
            setLastClickedTime(null); // 0.5초 후 클릭 가능 상태로 변경
          },
          500 - (Date.now() - (lastClickedTime || Date.now()))
        );
      }
    } catch (error) {
      setTimeout(() => {
        console.log('좋아요 처리 중 오류가 발생했습니다.'); // 오류 처리
        setIsLiked(previousIsLiked);
        setLikeCnt(likeCnt); // 원래의 좋아요 수로 되돌립니다.
      }, 500); // 1초 후에 실행 (테스트시 너무 안보여서)
      setTimeout(
        () => {
          setLastClickedTime(null); // 0.5초 후 클릭 가능 상태로 변경
        },
        500 - (Date.now() - (lastClickedTime || Date.now()))
      );
    }
  };
  const canClick = !lastClickedTime || Date.now() - lastClickedTime >= 500;
  return { isLiked, likeCnt, toggleLikeHandler, canClick };
};

/**
 * 사용 예시
 * 
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { useLike } from 'hooks/useLike';
//중략//

const { isLiked, likeCnt, toggleLikeHandler, canClick } = useLike({  // canClick 추가
  reviewId: [해당 reviewId string으로 여기 넣기],
  initialIsLiked: [서버에서 받은 isliked 여기에 넣기],
  initialLikeCnt: [서버에서 받은 likeCnt 여기에 넣기],
});


  return (
    <div>
      <button onClick={() => canClick && toggleLike()}>
     {isLiked ? <FilledHeart /> : <Heart />}
      </button>
      <p>{likeCnt}좋아요 숫자 표시</p>
    </div>
  );
}
 */
