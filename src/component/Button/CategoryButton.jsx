import styled, { createGlobalStyle } from "styled-components";
import BMHANNAPro from "../../fonts/BMHANNAPro.ttf";

// GlobalStyle 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMHANNAPro';
    src: url(${BMHANNAPro}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    font-family: 'BMHANNAPro', sans-serif;
  }
`;

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
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Card>
        <CardContent>
          <Text>친구</Text>
        </CardContent>
      </Card>
    </>
  );
};

export default Screen;
