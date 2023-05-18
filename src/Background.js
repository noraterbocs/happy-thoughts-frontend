import React from 'react';
import styled from 'styled-components/macro';

export const BackgroundImage = () => {
  return <BackgroundImg />;
};

const BackgroundImg = styled.img`
    background-image:linear-gradient(rgba(250, 250, 250, 0.5), rgba(250, 250, 250, 0.5)), url('/images/background.svg');
    background-size:cover;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    z-index: -1;
`
