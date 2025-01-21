import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 배경 컨테이너 스타일
const StarryBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// 별의 반짝이는 애니메이션 정의
const twinkleAnimation = keyframes`
  0% {
    opacity: 0.1;
    transform: scale(0.8);
    filter: blur(1px);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
    filter: blur(0px);
    box-shadow: 0 0 8px 4px rgba(255, 255, 255, 0.3);
  }

  100% {
    opacity: 0.3;
    transform: scale(2);
    filter: blur(2px);
`;

// 별 스타일 정의
const Star = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: white;
  border-radius: 50%;
  animation: ${twinkleAnimation} ${({ duration }) => duration}s ease-in-out
    infinite;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
`;

const StarrySky = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }, () => ({
        id: Math.random().toString(36).substring(2, 9),
        size: Math.random() * 3 + 2,
        duration: Math.random() * 2 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <StarryBackground>
      {stars.map((star) => (
        <Star
          key={star.id}
          size={star.size}
          duration={star.duration}
          top={star.top}
          left={star.left}
        />
      ))}
    </StarryBackground>
  );
};

export default StarrySky;
