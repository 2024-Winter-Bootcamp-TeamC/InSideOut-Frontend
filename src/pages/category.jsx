import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import BackGroundPNG from "../assets/category/BackGround.png";
import CategoryImageFrame from "../component/category/CategoryImageFrame";
import ReportButton from "../component/buttons/ReportButton";
import FamilyGIF from "../assets/category/Family.gif";
import CompanyGIF from "../assets/category/Company.gif";
import FriendsGIF from "../assets/category/Friends.gif";
import LoveGIF from "../assets/category/Love.gif";
import StaticFamily from "../assets/category/StaticFamily.png";
import StaticFriends from "../assets/category/StaticFriends.png";
import StaticCompany from "../assets/category/StaticCompany.png";
import StaticLove from "../assets/category/StaticLove.png";
import StarrySky from "../component/StarrySky";

// 배경 컨테이너 스타일 정의
const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${BackGroundPNG}) no-repeat center center;
  background-size: cover;
`;

// 컨텐츠 컨테이너: 카테고리와 버튼을 담는 메인 컨테이너
const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 100px 270px;
  box-sizing: border-box;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: -8% 0 8%;
`;

// 카테고리 제목 텍스트 스타일 정의
const CategoryTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: "BMHANNAPro", sans-serif;
  font-size: 100px;
  line-height: 160%;
  font-family: "BMHANNAPro";
`;

const CategoryTitle1 = styled.div`
  position: absolute;
  color: #fff;
  text-align: center;
  font-family: "IntensaFuente", sans-serif;
  font-size: 30px;
  line-height: 160%;
  font-family: "BMHANNAPro";
  top: 27%;
`;

// 카테고리 버튼 배치를 위한 그리드 컨테이너 스타일 정의
const CategoryImageFrameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

// 모달 창 스타일 정의: 검은 배경 위에 텍스트가 표시됨
const ExplaneModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 11;
  text-align: center;
  font-size: 30px;
  font-family: "BMHANNAPro", sans-serif;
  padding: 20px;
`;

const TextExplosion = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  30% {
    transform: scale(1.1);
    opacity: 1;
  }
  80% {
    transform: scale(1.1);
    opacity: 1; /* 유지 시간 늘리기 */
  }
  100% {
    transform: scale(0.9);
    opacity: 0; /* 사라지기 */
  }
`;

const AnimatedText = styled.h2`
  animation: ${TextExplosion} ${({ duration }) => duration / 1000}s ease-in-out;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: center;
  max-width: 80%;
  line-height: 1.5;
`;

// 메인 컴포넌트 정의
const CustomComponent = () => {
  const location = useLocation(); // React Router에서 현재 위치 정보를 가져옴
  const navigate = useNavigate(); // 다른 경로로 이동하기 위한 네비게이션 훅
  const { user_id } = location.state || {}; // 이전 페이지에서 전달된 user_id를 가져옴
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림 상태
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태
  const [currentMessage, setCurrentMessage] = useState(0); // 현재 표시 중인 메시지 인덱스

  // 각 메시지의 표시 시간을 정의 (ms 단위)
  const messageDurations = useMemo(() => [2500, 4000], []);

  // 표시할 메시지를 카테고리에 따라 동적으로 생성
  const messages = useMemo(
    () => [
      `${selectedCategory}에 대한 고민이 있으시군요`,
      "고민이 담긴 메신저 채팅 사진과\n내용을 요약해서 적어주세요",
    ],
    [selectedCategory]
  );

  // 모달 창이 열렸을 때 메시지를 순차적으로 표시하고 마지막에 페이지 이동
  useEffect(() => {
    if (isModalOpen) {
      const timeout = setTimeout(() => {
        setCurrentMessage((prev) => {
          if (prev < messages.length - 1) {
            return prev + 1;
          } else {
            navigate("/preparation", {
              state: { user_id, category: selectedCategory },
            });
            return prev;
          }
        });
      }, messageDurations[currentMessage] || 3000);

      return () => clearTimeout(timeout);
    }
  }, [
    isModalOpen,
    messages,
    navigate,
    selectedCategory,
    user_id,
    currentMessage,
    messageDurations,
  ]);

  // 카테고리 클릭 시 모달 창을 열고 선택한 카테고리 설정
  const handleCategoryClick = (category) => () => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // 보고서 리스트 버튼 클릭 시 이동
  const handleReportClick = () => {
    navigate("/reportlist", { state: { user_id } });
  };

  return (
    <BackgroundContainer>
      <StarrySky /> {/* 별이 반짝이는 애니메이션 배경 */}
      <ContentContainer>
        <CategoryContainer>
          <CategoryTitle>카테고리</CategoryTitle>
          <CategoryTitle1>누구와 갈등이 있나요?</CategoryTitle1>
        </CategoryContainer>
        <CategoryImageFrameContainer>
          {/* 각 카테고리 버튼 정의 */}
          <CategoryImageFrame
            Image={StaticFamily}
            Gif={FamilyGIF}
            HoverTextContent="가족"
            onClick={handleCategoryClick("가족")}
          />
          <CategoryImageFrame
            Image={StaticFriends}
            Gif={FriendsGIF}
            HoverTextContent="친구"
            onClick={handleCategoryClick("친구")}
          />
          <CategoryImageFrame
            Image={StaticCompany}
            Gif={CompanyGIF}
            HoverTextContent="회사"
            onClick={handleCategoryClick("회사")}
          />
          <CategoryImageFrame
            Image={StaticLove}
            Gif={LoveGIF}
            HoverTextContent="연인"
            onClick={handleCategoryClick("연인")}
          />
        </CategoryImageFrameContainer>
        <ReportButton onClick={handleReportClick} /> {/* 보고서 버튼 */}
      </ContentContainer>
      {/* 모달 창: 메시지를 순차적으로 표시 */}
      {isModalOpen && currentMessage < messages.length && (
        <ExplaneModal>
          <AnimatedText
            key={currentMessage}
            duration={messageDurations[currentMessage]}
          >
            {messages[currentMessage]}
          </AnimatedText>
        </ExplaneModal>
      )}
    </BackgroundContainer>
  );
};

export default CustomComponent;
