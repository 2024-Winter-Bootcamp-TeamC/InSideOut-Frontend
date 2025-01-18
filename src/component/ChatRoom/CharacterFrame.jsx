import styled from "styled-components";
import PropTypes from "prop-types";

// Card 스타일 정의
const StyledCard = styled.div`
  width: 17vw; /* 화면 너비의 20% */
  height: 17vw; /* 정사각형으로 유지하기 위해 너비와 동일 */
  max-width: 350px; /* 최대 너비 제한 */
  max-height: 350px; /* 최대 높이 제한 */
  border-radius: 30px; /* 화면 크기에 비례하여 둥글게 만듦 */
  border: 3px solid white;
  margin: 10px 10px;
`;

// CardContent 스타일 정의
const StyledCardContent = styled.div`
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const CharacterFrame = ({ children }) => {
  return (
    <StyledCard>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};

CharacterFrame.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CharacterFrame;
