// src/component/chatroom/CharacterFrame.jsx
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCard = styled.div`
  margin: 0.6rem;
  display: flex;
  border-radius: 30px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 4px solid
    ${({ $isActive, $activeColor }) =>
      $isActive ? $activeColor || "#00FF00" : "white"};
`;

const StyledCardContent = styled.div`
  display: flex;
  box-sizing: border-box;
  border-radius: 30px;
`;

const CharacterFrame = ({ children, isActive, activeColor }) => {
  return (
    <StyledCard $isActive={isActive} $activeColor={activeColor}>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};

CharacterFrame.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  activeColor: PropTypes.string,
};

CharacterFrame.defaultProps = {
  isActive: false,
  activeColor: "white",
};

export default CharacterFrame;
