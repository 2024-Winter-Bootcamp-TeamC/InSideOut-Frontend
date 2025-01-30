import styled from "styled-components";
import BackGround from "../assets/reportlist/BackGround.png";
import CategoryButton from "../component/buttons/CategoryButton";
import FamilyObject from "../assets/reportlist/FamilyObject.png";
import LoveObject from "../assets/reportlist/LoveObject.png";
import FriendsObject from "../assets/reportlist/FriendsObject.png";
import CompanyObject from "../assets/reportlist/CompanyObject.png";
import HomeButton from "../component/buttons/HomeButton";
import HomeButtonGIF from "../assets/HomeButton.svg";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const categoryImages = {
  가족: FamilyObject,
  친구: FriendsObject,
  사랑: LoveObject,
  회사: CompanyObject,
};

const BackGroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 50px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: url(${BackGround}) no-repeat center center;
  background-size: cover;
  background-color: #000;
`;

const HeaderContainer = styled.div`
  position: absolute;
  left: 52%;
  transform: translateX(-50%);
  top: 50px;
  width: 50%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "BMHANNAPro", sans-serif;
  color: #fff;
  font-size: 40px;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 6.25rem;
  overflow: hidden;
  display: flex;
  overflow: hidden;
  border: 0px solid #fff;
`;

const SliderWrapper = styled.div`
  display: flex;
  gap: 140px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  transition: transform 0.7s ease-in-out;
  transform: translateX(${(props) => props.translate}px);
`;

const SlideItem = styled.div`
  width: 9.375rem;
  height: 10.875rem;
  background: url(${(props) => props.image}) no-repeat center center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.8s cubic-bezier(0.25, 0.8, 0.5, 1),
    opacity 0.1s ease-in-out;

  ${({ index, currentIndex }) => {
    const diff = index - currentIndex;
    if (diff === 0) {
      return `
        transform: scale(1.7) translateY(10px);
        opacity: 1;
        &:hover {
          transform: scale(1.8);
          filter: brightness(1.05);
        }
      `;
    } else if (diff === 1) {
      return `
        transform: scale(1.3)  translateX(20px) translateY(10px);
        opacity: 1;
      `;
    } else if (diff === -1) {
      return `
        transform: scale(1.3)  translateX(-20px) translateY(10px);
        opacity: 1;
      `;
    } else if (diff === 2) {
      return `
        transform: scale(0.9) translateX(-60px) translateY(-100px);
        opacity: 1;
      `;
    } else if (diff === -2) {
      return `
        transform: scale(0.9) translateX(60px) translateY(-100px);
        opacity: 1;
      `;
    } else {
      return `
        transform: scale(0) translateY(-1300px);
        opacity: 0;
      `;
    }
  }}
`;

const SlideItemContainer = styled.div`
  width: 9.375rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  align-items: center;
  flex-shrink: 0;
  bottom:;
`;

const LightEffect = styled.div`
  width: 160px;
  height: 50px;
  background: radial-gradient(
    circle,
    rgba(243, 255, 154, 1) 10%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(10px);
  transition:
    transform 0.8s ease,
    opacity 0.1s ease;

  ${({ index, currentIndex }) => {
    const diff = index - currentIndex;
    if (diff === 0) {
      return `
        transform: scale(1.7)translateY(10px);
        opacity: 1;
      `;
    } else if (diff === 1) {
      return `
        transform: scale(1.2)  translateX(20px) translateY(-30px);
        opacity: 1;
        top: 100px;
      `;
    } else if (diff === -1) {
      return `
        transform: scale(1.2)  translateX(-20px) translateY(-30px);
        opacity: 1;
        top: 100px;
      `;
    } else if (diff === 2) {
      return `
        transform: scale(0.7) translateX(-75px) translateY(-250px);
        opacity: 1;
      `;
    } else if (diff === -2) {
      return `
        transform: scale(0.7) translateX(75px) translateY(-250px);
        opacity: 1;
      `;
    } else {
      return `
        transform: scale(0) translateY(-1300px);
        opacity: 0;
      `;
    }
  }}
`;

const DateOverlay = styled.div`
  font-family: "BMHANNAPro", sans-serif;
  font-size: 28px;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ReportList = () => {
  const location = useLocation();
  const { user_id } = location.state || {};
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderContainerRef = useRef(null);
  const [centerOffset, setCenterOffset] = useState(0);
  const slideWidth = 290;
  const categories = ["전체", "가족", "친구", "사랑", "회사"];
  const navigate = useNavigate();

  const fetchReports = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.myinsideout.world/api/reports/${user_id}`
      );
      if (response.status === 200 && response.data.status === "success") {
        const cleanedData = response.data.data.map((report) => ({
          ...report,
          category: report.category.replace(/["\\]/g, ""),
        }));
        console.log("GET 성공:", cleanedData);
        setReports(cleanedData);
        setFilteredReports(cleanedData);
      } else {
        console.error("GET 요청 실패:", response.data.message);
      }
    } catch (error) {
      console.error("GET 요청 오류:", error);
    }
  }, [user_id]);

  useEffect(() => {
    if (user_id) {
      fetchReports();
    }
  }, [user_id, fetchReports]);

  useEffect(() => {
    if (reports.length > 0) {
      setFilteredReports(reports);
    }
  }, [reports]);

  const handleCategorySelect = (category) => {
    if (category === "전체") {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter((report) => report.category === category);
      setFilteredReports(filtered);
    }
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (sliderContainerRef.current) {
      const containerWidth = sliderContainerRef.current.offsetWidth;
      setCenterOffset(containerWidth / 2);
    }
  }, [sliderContainerRef]);

  const calculateTranslate = () => {
    return -(currentIndex * slideWidth - (centerOffset - slideWidth / 2));
  };

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, filteredReports.length - 1));
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      scrollRight();
    } else if (e.deltaY < 0) {
      scrollLeft();
    }
  };

  const handleHomeButtonClick = () => {
    console.log("홈 버튼 클릭");
    navigate("/category", { state: { user_id } });
  };

  const handleReportButtonClick = (report_id) => {
    navigate("/reportdetail", { state: { report_id, user_id } });
  };

  return (
    <BackGroundContainer>
      <div style={{ position: "absolute", right: "20px", top: "20px" }}>
        <CategoryButton
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </div>
      <HeaderContainer>열람할 감정 구슬을 선택해 주세요!</HeaderContainer>
      <SliderContainer ref={sliderContainerRef} onWheel={handleWheel}>
        <SliderWrapper translate={calculateTranslate()}>
          {filteredReports.map((report, index) => (
            <SlideItemContainer key={report.report_id}>
              {index === currentIndex && (
                <DateOverlay>{report.title}</DateOverlay>
              )}
              <SlideItem
                image={categoryImages[report.category]}
                index={index}
                currentIndex={currentIndex}
                onClick={
                  index === currentIndex
                    ? () => handleReportButtonClick(report.report_id)
                    : null
                }
                style={{
                  cursor: index === currentIndex ? "pointer" : "default",
                }}
              />
              <LightEffect index={index} currentIndex={currentIndex} />
            </SlideItemContainer>
          ))}
        </SliderWrapper>
      </SliderContainer>
      <div style={{ position: "absolute", left: "20px", bottom: "20px" }}>
        <HomeButton gifPath={HomeButtonGIF} onClick={handleHomeButtonClick} />
      </div>
    </BackGroundContainer>
  );
};

export default ReportList;
