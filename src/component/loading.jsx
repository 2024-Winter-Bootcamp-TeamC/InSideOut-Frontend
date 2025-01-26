import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 회전 애니메이션 정의
const rotateLoading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 텍스트 애니메이션 정의
const loadingTextOpacity = keyframes`
  0%, 20%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1.5;
  }
`;

// 로딩 애니메이션 스타일
const LoadingContainer = styled.div`
  margin: 40px auto;
  position: relative;
  width: 100px;
  height: 100px;
`;

const LoadingCircle = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  border-color: transparent #5b3597 transparent #5b3597;
  animation: ${rotateLoading} 1.5s linear infinite normal;
  transform-origin: 50% 50%;

  &:hover {
    border-color: transparent #5b3597 transparent #5b3597;
  }
`;

const LoadingText = styled.div`
  position: absolute;
  top: 64%;
  left: 50%;
  width: 100%;
  text-align: center;
  color: #000;
  font-family: "BMHANNAPro";
  font-size: 15px;
  font-weight: bold;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: ${loadingTextOpacity} 2s linear infinite normal;
  text-transform: uppercase;
`;

const TimerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  color: #000;
  font-family: "BMHANNAPro";
  font-size: 14px;
  font-weight: bold;
  transform: translate(-50%, -50%);
  opacity: 100;
  text-transform: uppercase;
`;

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.5); /* 반투명한 하얀색 배경 */
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 수직으로 배치 */
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  z-index: 9999; /* 큰 z-index 값 설정 */
`;

const Loading = ({ text }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // 타이머 클린업
    return () => clearInterval(timer);
  }, []);

  return (
    <Background>
      <LoadingContainer>
        <LoadingCircle />
        <TimerText>{seconds}s</TimerText>
      </LoadingContainer>
      <LoadingText>{text}</LoadingText>
    </Background>
  );
};

export default Loading;
