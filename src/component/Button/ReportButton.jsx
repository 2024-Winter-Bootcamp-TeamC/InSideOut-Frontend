import Reprot from "../../assets/Report.svg";
import styled from "styled-components";

export const ReportButton = () => {
  return (
    <Box>
      <img className="Reprot" alt="Reprot" src={Reprot} />
    </Box>
  );
};

const Box = styled.div`
  width: 71px;
  height: 59px;
  position: absolute;
  left: 74px;
  bottom: 53px;
  fill: rgba(86, 46, 207, 0.8);
  stroke-width: 5px;
  stroke: #fff;
`;
export default ReportButton;
