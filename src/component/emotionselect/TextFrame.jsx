import styled from "styled-components";
import PropTypes from "prop-types";

const TextFrame = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundcolor",
})`
  width: 20rem;
  height: 5.625rem;
  border-radius: 1.875rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: absolute;
  z-index: 4;
  background-color: ${(props) => props.backgroundcolor};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  flex-direction: column;
  border: 5px solid ${(props) => (props.isClicked ? "white" : "transparent")};
`;

const TextStyle = styled.div`
  font-family: "BMHANNAPro", sans-serif;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Button = ({ text, onClick, backgroundcolor, isClicked }) => {
  return (
    <TextFrame
      onClick={onClick}
      backgroundcolor={backgroundcolor}
      isClicked={isClicked}
    >
      <TextStyle>{text}</TextStyle>
    </TextFrame>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  backgroundcolor: PropTypes.string.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

export default Button;
