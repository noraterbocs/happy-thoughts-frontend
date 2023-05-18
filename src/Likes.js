import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import styled from 'styled-components/macro';
import likes from './assets/likes.json'

export const Likes = ({ playerRef }) => {
  return (
    <LikesWrapper>
      <Player
        autoplay
        src={likes}
        className="lottie"
        speed={1}
        ref={playerRef} />
    </LikesWrapper>
  )
};

const LikesWrapper = styled.div`
   position:absolute;
   z-index:10;
    `