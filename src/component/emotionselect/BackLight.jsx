import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 0.8; /* 기본 투명도 */
    filter: blur(21px) brightness(1);
  }
  50% {
    opacity: 1; /* 더 선명해짐 */
    filter: blur(21px) brightness(1.3); /* 밝아짐 */
  }
`;

const JoyBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: 100%;
  transform: translate(-50%, -50%);

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(241, 248, 152, 0.5) 0%,
    rgba(255, 199, 56, 0.5) 100%
  );
  filter: blur(21px);

  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const AngerBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: 40%;
  transform: translate(-50%, -45%);

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(248, 152, 152, 0.5) 0%,
    rgba(255, 53, 41, 0.5) 100%
  );
  filter: blur(21px);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const FearBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: -0%;
  transform: translate(-50%, -45%);

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(218, 152, 248, 0.5) 0%,
    rgba(91, 53, 151, 0.5) 100%
  );
  filter: blur(21px);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const DisgustBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: 60%;
  transform: translate(-50%, -45%);

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(210, 248, 152, 0.5) 0%,
    rgba(38, 151, 25, 0.5) 100%
  );

  filter: blur(21px);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const EmbarrassmentBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: 60%;
  transform: translate(-50%, -30%);
  z-index: 2;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(122, 216, 206, 0.5) 0%,
    rgba(50, 150, 145, 0.5) 100%
  );

  filter: blur(21px);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;
const AnxietyBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: 0%;
  transform: translate(-50%, -30%);

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 187, 0, 0.5) 0%,
    rgba(223, 116, 22, 0.5) 100%
  );

  filter: blur(21px);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const SadnessBackLight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  width: 30rem;
  height: 30rem;
  border-radius: 532px;
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  left: -60%;
  transform: translate(-50%, -30%);

  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(87, 81, 192, 0.5) 0%,
    rgba(2, 53, 165, 0.5) 100%
  );

  filter: blur(21px);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
`;

const BackLight = {
  JoyBackLight,
  AngerBackLight,
  FearBackLight,
  DisgustBackLight,
  EmbarrassmentBackLight,
  AnxietyBackLight,
  SadnessBackLight,
};

export default BackLight;
