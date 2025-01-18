import styled from "styled-components"; // styled-components 라이브러리 임포트
import BackGroundPNG from "../assets/category/BackGround.png"; // 배경 이미지 가져오기
import CategoryImageFrame from "../component/category/CategoryImageFrame"; // 카테고리 이미지 프레임 컴포넌트
import ReportButton from "../component/buttons/ReportButton"; // 신고 버튼 컴포넌트
import FamilyGIF from "../assets/category/Family.gif"; // 가족 GIF
import CompanyGIF from "../assets/category/Company.gif"; // 회사 GIF
import FriendsGIF from "../assets/category/Friends.gif"; // 친구 GIF
import LoveGIF from "../assets/category/Love.gif"; // 사랑 GIF
import StaticFamily from "../assets/category/StaticFamily.png"; // 가족 정적 이미지
import StaticFriends from "../assets/category/StaticFriends.png"; // 친구 정적 이미지
import StaticCompany from "../assets/category/StaticCompany.png"; // 회사 정적 이미지
import StaticLove from "../assets/category/StaticLove.png"; // 사랑 정적 이미지

// 배경 컨테이너 스타일 정의
const BackgroundContainer = styled.div`
  position: fixed; /* 뷰포트를 기준으로 고정 */
  top: 0;
  left: 0;
  width: 100vw; /* 화면 전체 너비 */
  height: 100vh; /* 화면 전체 높이 */
  overflow: hidden; /* 스크롤 방지 */
  background: url(${BackGroundPNG}) no-repeat center center; /* 배경 이미지 중앙 정렬 */
  background-size: cover; /* 이미지를 화면에 꽉 채우도록 설정 */
`;

// 콘텐츠 컨테이너 스타일 정의
const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  width: 100%; /* 부모 요소의 너비에 맞춤 */
  height: 100%; /* 부모 요소의 높이에 맞춤 */
  padding: 100px 270px; /* 상하좌우 패딩 설정 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
`;

// 카테고리 컨테이너 스타일 정의
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  gap: 10px; /* 요소 간 간격 */
  margin-top: -8%; /* 상단 여백 */
  margin-bottom: 8%; /* 하단 여백 */
`;

// 카테고리 제목 스타일 정의
const CategoryTitle = styled.div`
  color: #fff; /* 텍스트 색상 */
  text-align: center; /* 텍스트 중앙 정렬 */
  font-family: "IntensaFuente", sans-serif; /* 폰트 스타일 */
  font-size: 100px; /* 글자 크기 */
  font-style: normal;
  font-weight: 400; /* 폰트 굵기 */
  line-height: 160%; /* 줄 간격 */
`;

// 카테고리 이미지 프레임 컨테이너 스타일 정의
const CategoryImageFrameContainer = styled.div`
  display: grid; /* 그리드 레이아웃 */
  grid-template-columns: repeat(2, 1fr); /* 두 열로 구성 */
  gap: 60px; /* 그리드 간격 */
  justify-content: center; /* 그리드 중앙 정렬 */
  align-items: center; /* 그리드 세로 정렬 */
  width: 80%; /* 컨테이너 너비 */
`;

// 신고 버튼 클릭 이벤트 핸들러
const handleReportClick = () => {
  alert("Report"); // 경고창 표시
};

// 카테고리 클릭 이벤트 핸들러
const handleCategoryClick = () => {
  alert("Category"); // 경고창 표시
};

// 커스텀 컴포넌트 정의
const CustomComponent = () => {
  return (
    <BackgroundContainer>
      {/* 콘텐츠 컨테이너 */}
      <ContentContainer>
        {/* 카테고리 섹션 */}
        <CategoryContainer>
          <CategoryTitle>CATEGORIES</CategoryTitle>
        </CategoryContainer>
        {/* 카테고리 이미지 프레임 섹션 */}
        <CategoryImageFrameContainer>
          <CategoryImageFrame
            Image={StaticFamily} // 가족 정적 이미지
            Gif={FamilyGIF} // 가족 GIF
            HoverTextContent="FAMILY" // 호버 시 표시될 텍스트
            onClick={handleCategoryClick} // 클릭 이벤트 핸들러
          />
          <CategoryImageFrame
            Image={StaticFriends} // 친구 정적 이미지
            Gif={FriendsGIF} // 친구 GIF
            HoverTextContent="FRIENDS" // 호버 시 표시될 텍스트
            onClick={handleCategoryClick} // 클릭 이벤트 핸들러
          />
          <CategoryImageFrame
            Image={StaticCompany} // 회사 정적 이미지
            Gif={CompanyGIF} // 회사 GIF
            HoverTextContent="COMPANY" // 호버 시 표시될 텍스트
            onClick={handleCategoryClick} // 클릭 이벤트 핸들러
          />
          <CategoryImageFrame
            Image={StaticLove} // 사랑 정적 이미지
            Gif={LoveGIF} // 사랑 GIF
            HoverTextContent="LOVE" // 호버 시 표시될 텍스트
            onClick={handleCategoryClick} // 클릭 이벤트 핸들러
          />
        </CategoryImageFrameContainer>
        <ReportButton onClick={handleReportClick} />
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default CustomComponent; // 컴포넌트 내보내기
