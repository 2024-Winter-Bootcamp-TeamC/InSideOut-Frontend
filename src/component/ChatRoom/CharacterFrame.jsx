import styled from "styled-components";
import PropTypes from "prop-types";

// Card 스타일 정의
const StyledCard = styled.div`  
  margin:0.6rem;
  display: flex;
  border-radius: 30px; /* 화면 크기에 비례하여 둥글게 만듦 */
  border: 3px solid white;
  box-sizing: border-box; /* border가 안쪽에 적용되도록 설정 */
  justify-content: center;
  align-items: center;
`;

// 이미지 스타일 정의
const StyledCardContent = styled.div`
  display: flex;
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
