import styled from "styled-components";
import reportDetailBackground from "../assets/ReportDetail.jpg";
import 기쁨이 from "../assets/기쁨이.png";
import 슬픔이 from "../assets/슬픔이.png";
import 버럭이 from "../assets/버럭이.png";
import 까칠이 from "../assets/까칠이.png";
import 당황이 from "../assets/당황이.png";
import 소심이 from "../assets/소심이.png";
import 불안이 from "../assets/불안이.png";
import ReportButton from "../component/buttons/ReportButton.jsx";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

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
  부럽이: {
    image: 당황이,
    titleColor: "#086F76", // 분홍색
    summaryColor: "#0E8E97",
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

Chart.register(PieController, ArcElement, Title, Tooltip, Legend);
const ReportDetail = () => {
  const location = useLocation();
  const { report_id, user_id } = location.state || {};
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [reportdetail, setReportDetail] = useState(null);
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    console.log("홈 버튼 클릭");
    navigate("/reportlist", { state: { user_id } });
  };

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.myinsideout.world/api/reports/view/${report_id}`
        );
        console.log(response.data);
        if (response.status === 200) {
          setReportDetail(response.data);
        } else {
          console.error("API 응답 상태 코드가 200이 아닙니다.");
        }
      } catch (error) {
        console.error("GET 요청 오류:", error);
      }
    };

    if (report_id) {
      fetchReportDetail();
    }
  }, [report_id]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (reportdetail) {
      const canvas = chartRef.current;
      chartInstance.current = new Chart(canvas, {
        type: "pie",
        data: {
          labels: [
            "기쁨이",
            "슬픔이",
            "버럭이",
            "까칠이",
            "소심이",
            "불안이",
            "부럽이",
          ],
          datasets: [
            {
              label: "감정 비율",
              data: Object.values(reportdetail.emotion_percentage),
              backgroundColor: [
                "#FFC738",
                "#183B89",
                "#FF3529",
                "#106B1A",
                "#5B3597",
                "#DF7416",
                "#086F76",
              ],
              hoverOffset: 20,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#000",
                font: {
                  size: 14,
                  family: "BMHANNAPro",
                  weight: "bold",
                },
              },
            },
            title: {
              display: true,
              text: "사용자 입력의 감정비율",
              color: "#000",
              font: {
                size: 25,
                weight: "bold",
                family: "BMHANNAPro",
              },
            },
          },
        },
      });
    }
  }, [reportdetail]);

  return (
    <Container>
      <ReportDetailContainer>
        <TitleText>보고서 상세</TitleText>
        <SimulationContainer>
          <SimulationText>상황요약</SimulationText>
          <SmulText>{reportdetail?.situation_summary || "내용 없음"}</SmulText>
          <StyledCanvas ref={chartRef} />
        </SimulationContainer>
        <EmotionContainer>
          {reportdetail &&
            Object.keys(reportdetail.emotion_summary || {}).map((key) => (
              <EmotionSmallContainer key={key}>
                <EmotionImage src={emotionMap[key]?.image} alt={key} />
                <EmotionName color={emotionMap[key]?.titleColor}>
                  {key}
                </EmotionName>
                <EmotionSummary color={emotionMap[key]?.summaryColor}>
                  {reportdetail.emotion_summary[key]}
                </EmotionSummary>
              </EmotionSmallContainer>
            ))}
          <WordingContainer>
            {reportdetail &&
              Object.keys(reportdetail.wording || {}).map((key) => (
                <WordingSpearker key={key} color={emotionMap[key]?.titleColor}>
                  {key}의 한마디
                  <br />
                  <br />
                  {reportdetail.wording[key]}
                </WordingSpearker>
              ))}
          </WordingContainer>
        </EmotionContainer>
      </ReportDetailContainer>
      <div style={{ position: "absolute", left: "20px", bottom: "20px" }}>
        <ReportButton onClick={handleHomeButtonClick} />
      </div>
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
  font-family: "BMHANNAPro";
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

  font-family: "BMHANNAPro";
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
  font-family: "BMHANNAPro";
  font-size: 55px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  top: 2%;
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
  font-family: "BMHANNAPro";
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
  font-family: "BMHANNAPro";
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
  font-family: "BMHANNAPro";
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0rem 1rem 1rem 1rem;
`;
