import styled from "styled-components";

// Card 스타일 정의
const StyledCard = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50px;
  border: 3px solid white;
`;

// CardContent 스타일 정의
const StyledCardContent = styled.div`
  padding: 0;
  height: 100%;
`;

const Screen = () => {
  return (
    <StyledCard>
      <StyledCardContent />
    </StyledCard>
  );
};

export default Screen;
