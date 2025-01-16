import styled from "styled-components";
import BackGround from "../assets/reportlistpage/BackGround.png";
import { useState, useEffect, useRef } from "react";
import CategoryButton from "../component/button/CategoryButton";
import FamilyObject from "../assets/reportlistpage/FamilyObject.png";
import LoveObject from "../assets/reportlistpage/LoveObject.png";
import FriendsObject from "../assets/reportlistpage/FriendsObject.png";
import CompanyObject from "../assets/reportlistpage/CompanyObject.png";
import HomeButton from "../component/button/HomeButton";
import HomeButtonGIF from "../../public/assets/HomeButton.gif";

const slideData = [
  { id: 1, image: FamilyObject, date: "2025.01.03" },
  { id: 2, image: LoveObject, date: "2025.01.04" },
  { id: 3, image: FriendsObject, date: "2025.01.05" },
  { id: 4, image: CompanyObject, date: "2025.01.06" },
  { id: 5, image: FamilyObject, date: "2025.01.07" },
  { id: 6, image: LoveObject, date: "2025.01.08" },
  { id: 7, image: FriendsObject, date: "2025.01.09" },
  { id: 8, image: CompanyObject, date: "2025.01.10" },
  { id: 9, image: FamilyObject, date: "2025.01.11" },
  { id: 10, image: LoveObject, date: "2025.01.12" },
  { id: 11, image: FriendsObject, date: "2025.01.13" },
  { id: 12, image: CompanyObject, date: "2025.01.14" },
  { id: 13, image: FamilyObject, date: "2025.01.15" },
  { id: 14, image: LoveObject, date: "2025.01.16" },
  { id: 15, image: FriendsObject, date: "2025.01.17" },
  { id: 16, image: CompanyObject, date: "2025.01.18" },
  { id: 17, image: FamilyObject, date: "2025.01.19" },
  { id: 18, image: LoveObject, date: "2025.01.20" },
  { id: 19, image: FriendsObject, date: "2025.01.21" },
  { id: 20, image: CompanyObject, date: "2025.01.22" },
];

// 전체 화면 컨테이너 스타일 정의 (배경 이미지 포함)
const BackGroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 50px 0px; /* 상단과 하단 여백 */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: url(${BackGround}) no-repeat center center; /* 배경 이미지 설정 */
  background-size: cover; /* 배경 이미지를 화면 크기에 맞게 조정 */
  background-color: #000; /* 배경 색상 설정 (이미지가 없을 경우 대비) */
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
  color: #fff; /* 텍스트 색상 */
  font-size: 40px;
`;

// 구슬 컨테이너
const SliderContainer = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
  padding: 0 100px;
  overflow: hidden; /* 넘치는 콘텐츠 숨김 */
  display: flex;

  overflow: hidden;
  border: 0px solid #fff;
`;

// 슬라이더 내부 아이템을 감싸는 래퍼 스타일 정의
const SliderWrapper = styled.div`
  display: flex;
  gap: 140px; /* 슬라이드 아이템 간 간격 */
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  transition: transform 0.7s ease-in-out; /* 이동 시 부드러운 애니메이션 */
  transform: translateX(
    ${(props) => props.translate}px
  ); /* 슬라이더 이동 계산 */
`;

// 각 슬라이드 아이템 스타일 정의
const SlideItem = styled.div`
  flex: 0 0 auto; /* 크기 고정 */
  width: 9.375rem;
  height: 10.875rem;
  background: url(${(props) => props.image}) no-repeat center center; /* 이미지 배경 설정 */

  background-size: contain; /* 배경 이미지를 컨테이너에 맞춤 */
  display: flex;
  flex-direction: column;
  transition:
    transform 0.8s ease,
    opacity 0.1s ease; /* 부드러운 확대 및 투명도 전환 */

  /* 현재 중앙에 위치한 슬라이드 강조 */
  ${({ index, currentIndex }) => {
    const diff = index - currentIndex; // 현재 위치와의 거리 계산
    if (diff === 0) {
      return `
        transform: scale(1.7)translateY(10px) ; /* 현재 슬라이드 강조 */
        opacity: 1;
        &:hover {
          transform: scale(1.8); /* 호버 시 더 크게 */
          filter: brightness(1.05); /* 밝기 강조 */
        }
      `;
    } else if (diff === 1) {
      return `
        transform: scale(1.2)  translateX(20px) translateY(-30px);  /* 인접 슬라이드 */
        opacity: 1;
        top: 100px;
        
      `;
    } else if (diff === -1) {
      return `
        transform: scale(1.2)  translateX(-20px) translateY(-30px);  /* 인접 슬라이드 */
        opacity: 1;
        top: 100px;
        
      `;
    } else if (diff === 2) {
      return `
        transform: scale(0.7) translateX(-60px) translateY(-200px); /* 두 번째 인접 슬라이드 */
        opacity: 1;
      `;
    } else if (diff === -2) {
      return `
        transform: scale(0.7) translateX(60px) translateY(-200px); /* 두 번째 인접 슬라이드 */
        opacity: 1;
      `;
    } else {
      return `
        transform: scale(0) translateY(-1300px); /* 멀리 있는 슬라이드 */
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
// 구슬 아래 빛 효과 스타일 정의
const LightEffect = styled.div`
  width: 160px; /* 빛의 너비 */
  height: 50px; /* 빛의 높이 */

  background: radial-gradient(
    circle,
    rgba(243, 255, 154, 1) 10%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  ); /* 빛의 색상과 투명도 설정 */
  border-radius: 50%; /* 둥근 효과 */
  filter: blur(10px); /* 부드럽게 흐릿한 효과 */
  transition:
    transform 0.8s ease,
    opacity 0.1s ease; /* 부드러운 확대 및 투명도 전환 */
  ${({ index, currentIndex }) => {
    const diff = index - currentIndex; // 현재 위치와의 거리 계산
    if (diff === 0) {
      return `
        transform: scale(1.7)translateY(10px) ; /* 현재 슬라이드 강조 */
        opacity: 1;

      `;
    } else if (diff === 1) {
      return `
        transform: scale(1.2)  translateX(20px) translateY(-30px);  /* 인접 슬라이드 */
        opacity: 1;
        top: 100px;
        
      `;
    } else if (diff === -1) {
      return `
        transform: scale(1.2)  translateX(-20px) translateY(-30px);  /* 인접 슬라이드 */
        opacity: 1;
        top: 100px;
        
      `;
    } else if (diff === 2) {
      return `
        transform: scale(0.7) translateX(-60px) translateY(-200px); /* 두 번째 인접 슬라이드 */
        opacity: 1;
      `;
    } else if (diff === -2) {
      return `
        transform: scale(0.7) translateX(60px) translateY(-200px); /* 두 번째 인접 슬라이드 */
        opacity: 1;
      `;
    } else {
      return `
        transform: scale(0) translateY(-1300px); /* 멀리 있는 슬라이드 */
        opacity: 0;
      `;
    }
  }}
`;
// 날짜 표시 스타일
const DateOverlay = styled.div`
  font-family: "BMHANNAPro", sans-serif;
  font-size: 30px;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 텍스트 그림자 */
`;
// 메인 컴포넌트 정의
const ReportList = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 상태
  const sliderContainerRef = useRef(null); // 슬라이더 컨테이너 참조
  const [centerOffset, setCenterOffset] = useState(0); // 화면 중심 오프셋 계산
  const slideWidth = 290; // 슬라이드 하나의 너비와 간격
  const categories = ["전체", "가족", "친구", "사랑", "회사"]; // 카테고리 리스트

  // 카테고리 선택 처리 함수
  const handleCategorySelect = (category) => {
    console.log("선택된 카테고리:", category);
    // 선택된 카테고리를 처리하는 로직
  };

  // 초기 화면 로드 시 중심 위치 계산
  useEffect(() => {
    if (sliderContainerRef.current) {
      const containerWidth = sliderContainerRef.current.offsetWidth;
      setCenterOffset(containerWidth / 2); // 슬라이더 컨테이너 중심 계산
    }
  }, [sliderContainerRef]);

  // 슬라이더 이동 계산 함수
  const calculateTranslate = () => {
    return -(currentIndex * slideWidth - (centerOffset - slideWidth / 2));
  };

  // 슬라이드 왼쪽 이동
  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0)); // 맨 왼쪽 이동 제한
  };

  // 슬라이드 오른쪽 이동
  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, slideData.length - 1)); // 맨 오른쪽 이동 제한
  };

  // 마우스 휠 이벤트 처리 함수
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      scrollRight(); // 휠 아래 -> 오른쪽 이동
    } else if (e.deltaY < 0) {
      scrollLeft(); // 휠 위 -> 왼쪽 이동
    }
  };

  // 홈 버튼 클릭 처리 함수
  const handleHomeButtonClick = () => {
    console.log("홈 버튼 클릭");
    // 홈 버튼 클릭 시 동작 추가
  };

  return (
    <BackGroundContainer>
      {/* 우측 상단 카테고리 버튼 */}
      <div style={{ position: "absolute", right: "20px", top: "20px" }}>
        <CategoryButton
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* 상단 텍스트 */}
      <HeaderContainer>열람할 감정 구슬을 선택해 주세요!</HeaderContainer>

      {/* 슬라이더 영역 */}
      <SliderContainer ref={sliderContainerRef} onWheel={handleWheel}>
        {/* 슬라이더 아이템들 */}
        <SliderWrapper translate={calculateTranslate()}>
          {slideData.map((item, index) => (
            <SlideItemContainer key={item.id}>
              {index == currentIndex && <DateOverlay>{item.date}</DateOverlay>}
              <SlideItem
                image={item.image}
                index={index}
                currentIndex={currentIndex}
              />
              <LightEffect index={index} currentIndex={currentIndex} />{" "}
              {/* 구슬 밑에 빛 추가 */}
            </SlideItemContainer>
          ))}
        </SliderWrapper>
      </SliderContainer>

      {/* 좌측 하단 홈 버튼 */}
      <div style={{ position: "absolute", left: "20px", bottom: "20px" }}>
        <HomeButton gifPath={HomeButtonGIF} onClick={handleHomeButtonClick} />
      </div>
    </BackGroundContainer>
  );
};

export default ReportList;
