import styled from "styled-components";

// Card 스타일 정의
const StyledCard = styled.div`
  width: 623px; /* 카드 너비 */
  height: 234px; /* 카드 높이 */
  border-radius: 50px; /* 둥근 모서리 */
  border: 8px solid #000; /* 테두리 */
  border-color: #ffffff;
`;

const CategoryImageFrame = () => {
  return <StyledCard />;
};

export default CategoryImageFrame;
