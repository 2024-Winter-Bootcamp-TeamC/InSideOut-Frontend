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

const CategoryTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: "IntensaFuente", sans-serif;
  font-size: 100px;
  line-height: 160%;
`;

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
    navigate("/preparation", { state: { user_id, category } }); // 다음 페이지로 이동
  };

  const handleReportClick = () => {
    navigate("/reportlist", { state: { user_id} }); // 다음 페이지로 이동
  };

  return (
    <BackgroundContainer>
      <ContentContainer>
        <CategoryContainer>
          <CategoryTitle>CATEGORIES</CategoryTitle>
        </CategoryContainer>
        <CategoryImageFrameContainer>
          <CategoryImageFrame
            Image={StaticFamily}
            Gif={FamilyGIF}
            HoverTextContent="FAMILY"
            onClick={handleCategoryClick("family")}
          />
          <CategoryImageFrame
            Image={StaticFriends}
            Gif={FriendsGIF}
            HoverTextContent="FRIENDS"
            onClick={handleCategoryClick("friends")}
          />
          <CategoryImageFrame
            Image={StaticCompany}
            Gif={CompanyGIF}
            HoverTextContent="COMPANY"
            onClick={handleCategoryClick("company")}
          />
          <CategoryImageFrame
            Image={StaticLove}
            Gif={LoveGIF}
            HoverTextContent="LOVE"
            onClick={handleCategoryClick("love")}
          />
        </CategoryImageFrameContainer>
        <ReportButton onClick={handleReportClick} />
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default CustomComponent;
