import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
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

// 배경 컨테이너
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

// 컨텐츠 컨테이너
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
// 카테고리 제목 스타일
const CategoryTitle1 = styled.div`
  position: absolute;
  color: #fff;
  text-align: center;
  font-family: "IntensaFuente", sans-serif;
  font-size: 30px;
  line-height: 160%;
  font-family: "BM HANNA Pro";
  top: 27%;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: -8% 0 8%;
`;

// 카테고리 제목 스타일
const CategoryTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 100px;
  line-height: 160%;
  font-family: "BM HANNA Pro";
`;

// 카테고리 이미지 프레임 컨테이너
const CategoryImageFrameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const CustomComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user_id } = location.state || {};

  const handleCategoryClick = (category) => () => {
    navigate("/preparation", { state: { user_id, category } });
  };

  const handleReportClick = () => {
    navigate("/reportlist", { state: { user_id } });
  };

  return (
    <BackgroundContainer>
      <StarrySky />
      <ContentContainer>
        <CategoryContainer>
          <CategoryTitle>카테고리</CategoryTitle>
          <CategoryTitle1>누구와 갈등이 있나요?</CategoryTitle1>
        </CategoryContainer>
        <CategoryImageFrameContainer>
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
            HoverTextContent="사랑"
            onClick={handleCategoryClick("사랑")}
          />
        </CategoryImageFrameContainer>
        <ReportButton onClick={handleReportClick} />
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default CustomComponent;
