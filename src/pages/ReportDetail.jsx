import styled from "styled-components";
import reportDetailBackground from "../assets/reportdetail.jpg";
import 기쁨이 from "../assets/기쁨이.png";
import 슬픔이 from "../assets/슬픔이.png";
import 버럭이 from "../assets/버럭이.png";
import 까칠이 from "../assets/까칠이.png";
import 당황이 from "../assets/당황이.png";
import 소심이 from "../assets/소심이.png";
import 불안이 from "../assets/불안이.png";
import HomeButton from "../component/buttons/HomeButton.jsx";
import BackButton from "../component/buttons/BackButton.jsx";
import HomeButtonGIF from "../assets/HomeButton.svg";
import { useNavigate } from "react-router-dom";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useRef, useEffect } from "react";
const emotionMap = {
  기쁨이: {
    image: 기쁨이,
    titleColor: "#FFC738", // 노란색
    summaryColor: "#FECE0C",
  },
  슬픔이: {
    image: 슬픔이,
    titleColor: "#183B89", // 파란색
    summaryColor: "#0F4D9B",
  },
  버럭이: {
    image: 버럭이,
    titleColor: "#FF3529", // 빨간색
    summaryColor: "#EE4135",
  },
  까칠이: {
    image: 까칠이,
    titleColor: "#106B1A", // 녹색
    summaryColor: "#278B1E",
  },
  당황이: {
    image: 당황이,
    titleColor: "#CD3364", // 분홍색
    summaryColor: "#DB4A7B",
  },
  소심이: {
    image: 소심이,
    titleColor: "#5B3597", // 보라색
    summaryColor: "#683DAC",
  },
  불안이: {
    image: 불안이,
    titleColor: "#DF7416", // 주황색
    summaryColor: "#F69F1E",
  },
};
const smulData = {
  id: 1,
  title: "2025-01-15",
  smultext:
    "상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상황요약상약황요약상약황요약상약황요약상약황요약상약황요약상약황요약상약황요약상약황요약상약황요아아아아아아아아아아",
  emotion: {
    소심이:
      "친구의 갑작스러운 행동에 대해 깊은 공감을 표현하며, 오랜 우정이 이렇게 끝나버린 것 같아 슬프다는 감정을 드러냈다. 또한, 친구가 한 번쯤은 이유를 설명해줬다면 좋았을 텐데라는 아쉬움을 표현하면서도, 기다리면서 천천히 다가가 보는 것이 좋겠다는 조심스러운 접근을 제안했다아아아아아아아제안했다아아아아아아.",
    슬픔이:
      "친구의 갑작스러운 행동에 대해 깊은 공감을 표현하며, 오랜 우정이 이렇게 끝나버린 것 같아 슬프다는 감정을 드러냈다. 또한, 친구가 한 번쯤은 이유를 설명해줬다면 좋았을 텐데라는 아쉬움을 표현하면서도, 기다리면서 천천히 다가가 보는 것이 좋겠다는 조심스러운 접근을 제안했다.",
    버럭이:
      "친구의 갑작스러운 행동에 대해 깊은 공감을 표현하며, 오랜 우정이 이렇게 끝나버린 것 같아 슬프다는 감정을 드러냈다. 또한, 친구가 한 번쯤은 이유를 설명해줬다면 좋았을 텐데라는 아쉬움을 표현하면서도, 기다리면서 천천히 다가가 보는 것이 좋겠다는 조심스러운 접근을 제안했다.",
  },
  wording: {
    기쁨이: "좋아요",
  },
  per: {
    기쁨: 40,
    슬픔: 10,
    버럭: 10,
    까칠: 10,
    소심: 10,
    불안: 10,
    당황: 10,
  },
};
Chart.register(PieController, ArcElement, Title, Tooltip, Legend);
const ReportDetail = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const handleHomeButtonClick = () => {
    navigate("/");
  };
  useEffect(() => {
    const canvas = chartRef.current;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(canvas, {
      type: "pie",
      data: {
        labels: ["기쁨", "슬픔", "버럭", "까칠", "당황", "소심", "불안"],
        datasets: [
          {
            label: "감정 비율",
            data: [
              smulData.per.기쁨,
              smulData.per.슬픔,
              smulData.per.버럭,
              smulData.per.까칠,
              smulData.per.소심,
              smulData.per.불안,
              smulData.per.당황,
            ],
            backgroundColor: [
              "#FFC738",
              "#183B89",
              "#FF3529",
              "#106B1A",
              "#CD3364",
              "#5B3597",
              "#DF7416",
            ],
            hoverOffset: 20,
          },
        ],
      },
      options: {
        responsive: true,

        plugins: {
          legend: {
            position: "bottom", // 범례 위치 설정
            labels: {
              color: "#000", // 범례 라벨 텍스트 색상
              font: {
                size: 14, // 라벨 폰트 크기
                family: "BM HANNA Pro", // 라벨 폰트 종류
                weight: "bold", // 라벨 폰트 굵기
              },
            },
          },
          title: {
            display: true,
            text: "사용자 감정 비율", // 제목
            color: "#000", // 제목 색상
            font: {
              size: 25, // 제목 폰트 크기
              weight: "bold", // 제목 폰트 굵기
              family: "BM HANNA Pro", // 제목 폰트 종류
            },
          },
        },
      },
    });
  }, []);
  return (
    <Container>
      <ReportDetailContainer>
        <TitleText>{smulData.title}</TitleText>
        <SimulationContainer>
          <SimulationText>상황요약</SimulationText>
          <SmulText>{smulData.smultext}</SmulText>
          <StyledCanvas ref={chartRef} />
        </SimulationContainer>
        <EmotionContainer>
          {Object.keys(smulData.emotion).map((key) => (
            <EmotionSmallContainer key={key}>
              <EmotionImage src={emotionMap[key].image} alt={key} />

              <EmotionName color={emotionMap[key].titleColor}>
                {key}
              </EmotionName>
              <EmotionSummary color={emotionMap[key].summaryColor}>
                {smulData.emotion[key]}
              </EmotionSummary>
            </EmotionSmallContainer>
          ))}
          <WordingContainer>
            {Object.keys(smulData.wording).map((key) => (
              <WordingSpearker key={key} color={emotionMap[key].titleColor}>
                {key}의 한마디
                <br />
                <br />
                {smulData.wording[key]}
              </WordingSpearker>
            ))}
          </WordingContainer>
        </EmotionContainer>
      </ReportDetailContainer>
      <HomeButton gifPath={HomeButtonGIF} onClick={handleHomeButtonClick} />
    </Container>
  );
};

export default ReportDetail;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 4rem 1.875rem 3rem 28rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-image: url(${reportDetailBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;
const ReportDetailContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.875rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.875rem;
  background: rgba(255, 255, 255, 0.93);
`;
const SimulationContainer = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  flex-shrink: 0;
`;

const EmotionContainer = styled.div`
  display: flex;
  width: 55%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex-shrink: 0;
`;

const SimulationText = styled.div`
  width: 100%;
  height: 10%;
  flex-shrink: 0;
  color: #000;
  font-family: "BM HANNA Pro";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-self: stretch;
`;
const SmulText = styled.div`
  width: 100%;
  height: 20%;
  flex-shrink: 0;
  color: #8a8a8a;

  font-family: "BM HANNA Pro";
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const TitleText = styled.p`
  position: absolute;
  width: 19.6875rem;
  height: 3.75rem;
  color: #000;
  text-align: center;
  font-family: "BM HANNA Pro";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  top: 1%;
  left: 5%;
`;

const StyledCanvas = styled.canvas``;

const EmotionSmallContainer = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  gap: 0.875rem;
  align-self: stretch;
  width: 100%;
  height: 20%;
`;
const WordingContainer = styled.div`
  display: flex;
  padding: 1.25rem 0rem 0.125rem 0rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  width: 100%;
  height: 25%;
  border-radius: 1.875rem;
  background: rgba(239, 239, 239, 0.93);
`;
const EmotionImage = styled.img`
  width: 12%;
  height: 80%;
`;
const EmotionName = styled.div`
  width: 36.5625rem;
  height: 2.9375rem;
  font-family: "BM HANNA Pro";
  color: ${(props) => props.color || "#000"}; // props.color 사용, 기본값 검정색
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const EmotionSummary = styled.div`
  position: absolute;
  width: 85%;
  height: 50%;
  top: 30%;
  left: 15%;
  color: ${(props) => props.color || "#000"}; // props.color 사용, 기본값 검정색
  font-family: "BM HANNA Pro";
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const WordingSpearker = styled.div`
  height: 100%;
  flex: 1 0 0;
  color: ${(props) => props.color || "#000"}; // props.color 사용, 기본값 검정색
  text-align: center;
  -webkit-text-stroke-width: 2;
  -webkit-text-stroke-color: #fff;
  font-family: "BM HANNA Pro";
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
