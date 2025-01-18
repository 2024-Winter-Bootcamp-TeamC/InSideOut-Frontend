import styled from "styled-components";
import { useState } from "react";
import Button from "../component/emotionselect/TextFrame";
import BackLight from "../component/emotionselect/BackLight";
import Joy from "../assets/emotionselect/Joy.png";
import Sadness from "../assets/emotionselect/Sadness.png";
import Anger from "../assets/emotionselect/Anger.png";
import Fear from "../assets/emotionselect/Fear.png";
import Disgust from "../assets/emotionselect/Disgust.png";
import Embarrassment from "../assets/emotionselect/Embarrassment.png";
import Anxiety from "../assets/emotionselect/Anxiety.png";

// 전체 화면의 배경 컨테이너 스타일 정의
const BackgroundContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000000; /* 배경색: 검정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3% 5%;
  box-sizing: border-box;
`;

// 제목 스타일 정의
const EmotionSelectTitle = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-family: "BMHANNAPro", sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  z-index: 10;
`;

const WarningText = styled.div`
  color: red;
  font-size: 1rem;
  font-family: "BMHANNAPro", sans-serif;
  margin-top: 1rem;
`;

// 버튼과 이미지를 묶는 컨테이너 정의
const EmotionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// 버튼과 이미지 컨테이너 정의
const ButtonAndImageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isClicked",
})`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.1s ease;
  height: 0;

  &:hover .backlight {
    ${({ isClicked }) => !isClicked && "display: flex;"}
  }
  .backlight {
    display: ${({ isClicked }) => (isClicked ? "flex" : "none")};
  }

  &:hover {
    transform: scale(1.05); /* 버튼에 호버하면 크기를 1.05배 증가 */
    z-index: 3;
  }

  &:active {
    transform: scale(0.95); /* 버튼 클릭 시 크기를 0.95배 감소 */
  }
`;

const NextButton = styled.button`
  position: relative;
  top: 3%;
  right: -48%;
  width: 12%;
  height: 10%;
  background-color: white;
  border: none;
  border-radius: 1.875rem;
  color: black;
  font-size: 1.2rem;
  font-family: "BMHANNAPro", sans-serif;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  z-index: 10;

  outline: none;
  box-shadow: none;

  &:hover {
    transform: scale(1.05); /* 버튼에 호버하면 크기를 1.05배 증가 */
  }

  &:active {
    transform: scale(0.95); /* 버튼 클릭 시 크기를 0.95배 감소 */
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
// 이미지 스타일 정의
const ImageStyled = styled.img`
  width: 7rem;
  height: auto;
  pointer-events: none;
`;

// 버튼 스타일 정의
const ButtonStyled = styled(Button)`
  position: relative;
`;

// 감정별 버튼과 이미지 위치 정의

const SadnessContainer = styled(ButtonAndImageContainer)`
  top: 80%;
  right: 25%;
  }
`;

const AngerContainer = styled(ButtonAndImageContainer)`
  top: 55%;
  right: 59%;
`;

const FearContainer = styled(ButtonAndImageContainer)`
  top: 16%;
  right: 80%;
`;

const DisgustContainer = styled(ButtonAndImageContainer)`
  top: 25%;
  right: 43%;
`;
const JoyContainer = styled(ButtonAndImageContainer)`
  top: 10%;
  right: 10%;
`;

const EmbarrassmentContainer = styled(ButtonAndImageContainer)`
  top: 50%;
  right: 10%;
`;

const AnxietyContainer = styled(ButtonAndImageContainer)`
  top: 83%;
  right: 77%;
`;

// 버튼 클릭 이벤트 핸들러
const handleButtonClick = () => {
  console.log("버튼이 클릭되었습니다!");
};

// 메인 컴포넌트
const EmotionSelect = () => {
  const [activeBacklight, setActiveBacklight] = useState({
    joy: false,
    sadness: false,
    anger: false,
    fear: false,
    disgust: false,
    embarrassment: false,
    anxiety: false,
  });

  const [warning, setWarning] = useState(false); // 경고 메시지 상태

  const toggleBackLight = (emotion) => {
    const activeCount = Object.values(activeBacklight).filter(Boolean).length;

    if (activeBacklight[emotion]) {
      setActiveBacklight((prevState) => ({
        ...prevState,
        [emotion]: false,
      }));
      setWarning(false); // 경고 메시지 숨김
    } else {
      // 3개가 이미 선택된 경우
      if (activeCount >= 3) {
        setWarning(true); // 경고 메시지 표시
        return;
      }

      // 새로운 감정을 선택
      setActiveBacklight((prevState) => ({
        ...prevState,
        [emotion]: true,
      }));
      setWarning(false); // 경고 메시지 숨김
    }
  };

  return (
    <BackgroundContainer>
      <EmotionSelectTitle>
        상담받을 감정을 3가지 선택해주세요!
      </EmotionSelectTitle>
      <EmotionWrapper>
        {/* 감정별 버튼과 이미지 */}
        <JoyContainer
          onClick={() => toggleBackLight("joy")}
          isClicked={activeBacklight.joy}
        >
          {activeBacklight.joy && (
            <BackLight.JoyBackLight className="backlight" />
          )}
          <ImageStyled
            src={Joy}
            style={{
              position: "relative",
              top: "-80px",
              right: "-169px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이"
            onClick={handleButtonClick}
            backgroundcolor="#FFF6AB"
          />
        </JoyContainer>

        <SadnessContainer
          onClick={() => toggleBackLight("sadness")}
          isClicked={activeBacklight.sadness}
        >
          {activeBacklight.sadness && (
            <BackLight.SadnessBackLight className="backlight" />
          )}
          <ImageStyled
            src={Sadness}
            style={{
              position: "relative",
              top: "-57px",
              right: "180px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="슬픔이"
            onClick={handleButtonClick}
            backgroundcolor="#C6E6FE"
          />
        </SadnessContainer>

        <AngerContainer
          onClick={() => toggleBackLight("anger")}
          isClicked={activeBacklight.anger}
        >
          {activeBacklight.anger && (
            <BackLight.AngerBackLight className="backlight" />
          )}
          <ImageStyled
            src={Anger}
            style={{
              position: "relative",
              top: "-23px",
              right: "180px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이"
            onClick={handleButtonClick}
            backgroundcolor="#FFBDBB"
          />
        </AngerContainer>

        <FearContainer
          onClick={() => toggleBackLight("fear")}
          isClicked={activeBacklight.fear}
        >
          {activeBacklight.fear && (
            <BackLight.FearBackLight className="backlight" />
          )}
          <ImageStyled
            src={Fear}
            style={{
              position: "relative",
              top: "-65px",
              right: "135px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="소심이"
            onClick={handleButtonClick}
            backgroundcolor="#D1B2FF"
          />
        </FearContainer>

        <DisgustContainer
          onClick={() => toggleBackLight("disgust")}
          isClicked={activeBacklight.disgust}
        >
          {activeBacklight.disgust && (
            <BackLight.DisgustBackLight className="backlight" />
          )}
          <ImageStyled
            src={Disgust}
            style={{
              position: "relative",
              top: "-58px",
              right: "147.5px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="까칠이"
            onClick={handleButtonClick}
            backgroundcolor="#D1FFE2"
          />
        </DisgustContainer>

        <EmbarrassmentContainer
          onClick={() => toggleBackLight("embarrassment")}
          isClicked={activeBacklight.embarrassment}
        >
          {activeBacklight.embarrassment && (
            <BackLight.EmbarrassmentBackLight className="backlight" />
          )}
          <ImageStyled
            src={Embarrassment}
            style={{
              position: "relative",
              top: "-84px",
              right: "150px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이기쁨이"
            onClick={handleButtonClick}
            backgroundcolor="#FFB4CB"
          />
        </EmbarrassmentContainer>

        <AnxietyContainer
          onClick={() => toggleBackLight("anxiety")}
          isClicked={activeBacklight.anxiety}
        >
          {activeBacklight.anxiety && (
            <BackLight.AnxietyBackLight className="backlight" />
          )}
          <ImageStyled
            src={Anxiety}
            style={{
              position: "relative",
              top: "-75px",
              right: "158px",
              zIndex: 5,
            }}
          />
          <ButtonStyled
            text="불안이"
            onClick={handleButtonClick}
            backgroundcolor="#FCBE84"
          />
        </AnxietyContainer>
        {warning && (
          <WarningText>최대 3개의 감정만 선택할 수 있습니다!</WarningText>
        )}
      </EmotionWrapper>
      <NextButton onClick={handleButtonClick}>대화하기</NextButton>
    </BackgroundContainer>
  );
};

export default EmotionSelect;
