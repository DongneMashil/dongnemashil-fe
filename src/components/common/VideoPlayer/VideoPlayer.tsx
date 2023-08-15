import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';

import {
  StPlayButtonContainer,
  StRangeContainer,
  StStop,
  StVideoPlayerContainer,
  StyledRangeInput,
} from './VideoPlayer.styles';

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
