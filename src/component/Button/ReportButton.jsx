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

  .icon {
    display: block;
    width: 100%;
    height: auto;
  }

  /* 호버 상태에서도 아무 변화 없음 */
  &:hover .icon {
    transform: none;
    filter: none;
  }
`;

export default ReportButton;
