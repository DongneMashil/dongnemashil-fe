import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';
import { styled } from 'styled-components';
import Logo from 'assets/images/Logo.svg';

export const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [playing, setPlaying] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;

  return (
    <StVideoPlayerContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactPlayer
        ref={playerRef}
        controls={false}
        playing={playing}
        url={videoUrl}
        onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
        onSeek={setPlayedSeconds}
        onDuration={setDurationSeconds} // This is called when the player has the duration
        width="100%"
        height="100%"
      />
      <Controls
        isHovered={isHovered}
        playerRef={playerRef}
        playing={playing}
        setPlaying={setPlaying}
        playedSeconds={playedSeconds}
        duration={durationSeconds}
      />
    </StVideoPlayerContainer>
  );
};

type ControlsProps = {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playedSeconds: number;
  duration: number;
  playerRef: MutableRefObject<ReactPlayer>;
};

const Controls = (props: ControlsProps & { isHovered: boolean }) => {
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.playerRef.current.seekTo(+e.target.value, 'seconds');
  };
  const playedPercentage = (props.playedSeconds / props.duration) * 100;

  return (
    <>
      <StPlayButtonContainer>
        <button onClick={() => props.setPlaying(!props.playing)}>
          {props.playing ? (
            <StStop $isHovered={props.isHovered}>⏹️</StStop>
          ) : (
            <StStop $isHovered={props.isHovered}>⏯️</StStop>
          )}
        </button>
      </StPlayButtonContainer>

      <StRangeContainer>
        <StyledRangeInput
          type="range"
          value={props.playedSeconds}
          min="0"
          max={props.duration}
          onChange={seek}
          playedPercentage={playedPercentage}
        />
      </StRangeContainer>
    </>
  );
};

const StStop = styled.div<{ $isHovered: boolean }>`
  width: 1rem;
  height: 1rem;
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  transition: opacity 0.3s;
`;
const StPlayButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;

const StRangeContainer = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledRangeInput = styled.input<{ playedPercentage: number }>`
  width: 100%;
  height: 5px;
  outline: none;
  -webkit-appearance: none;
  border-radius: 5px;
  background: ${({ playedPercentage }) =>
    `linear-gradient(90deg, rgba(129, 78, 259, 0.8) ${playedPercentage}%, rgba(255, 255, 255, 0.1) ${playedPercentage}%, rgba(255, 255, 255, 0.1) 100%)`};

  // &::-webkit-slider-thumb {
  //   -webkit-appearance: none;
  //   width: 10px;
  //   height: 10px;
  //   background-color: white;
  //   border-radius: 50%;
  //   cursor: pointer;
  // }

  // &::-moz-range-thumb {
  //   width: 10px;
  //   height: 10px;
  //   background-color: white;
  //   border-radius: 50%;
  //   cursor: pointer;
  // }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background-image: url(${Logo});
    background-size: 10px 10px; // SVG의 크기를 조절합니다.
    border-radius: 50%; // 필요하다면 원형으로 만들기 위해 사용합니다.
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background-image: url(${Logo});
    background-size: 10px 10px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const StVideoPlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
