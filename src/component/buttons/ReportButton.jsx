import Report from "../../assets/Report.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

export const ReportButton = ({ onClick }) => {
  return (
    <BoxButton
      onClick={(e) => {
        e.currentTarget.blur();
        onClick();
      }}
      aria-label="Report"
    >
      <img className="icon" alt="Report" src={Report} />
    </BoxButton>
  );
};

ReportButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const BoxButton = styled.button`
  width: 60px;
  height: auto;
  position: absolute;
  left: 74px;
  bottom: 53px;
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  padding: 0; /* 여백 제거 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: transform 0.3s ease;
  outline: none;
  box-shadow: none;

  &:hover {
    transform: scale(1.05); /* 버튼에 호버하면 크기를 1.05배 증가 */
    z-index: 3;
  }

  &:active {
    transform: scale(0.95); /* 버튼 클릭 시 크기를 0.95배 감소 */
  }
`;

export default ReportButton;
