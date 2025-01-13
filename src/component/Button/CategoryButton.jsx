import styled from "styled-components";

// Card 스타일 정의
const Card = styled.div`
  width: 155px;
  height: 58px;
  border-radius: 30px;
  background-color: white;
`;

// CardContent 스타일 정의
const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
`;

// Text 스타일 정의
const Text = styled.span`
  font-family: "BMHANNAPro", sans-serif; /* 폰트 적용 */
  font-weight: normal;
  font-size: 32px;
  color: black;
`;

const Screen = () => {
  return (
    <Card>
      <CardContent>
        <Text>친구</Text>
      </CardContent>
    </Card>
  );
};

export default Screen;
