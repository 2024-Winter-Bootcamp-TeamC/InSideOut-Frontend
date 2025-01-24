import styled from "styled-components"; // styled-components 라이브러리 임포트
import PropTypes from "prop-types"; // PropTypes를 사용하여 컴포넌트 props 타입 검증

// StyledCard: 카드 스타일 정의
const StyledCard = styled.div`
  position: relative;
  width: 400px; /* 카드의 너비 */
  height: 150px; /* 카드의 높이 */
  border-radius: 50px; /* 카드 모서리를 둥글게 설정 */
  border: 5px solid #000; /* 테두리 설정 */
  border-color: #ffffff; /* 테두리 색상 */
  background: url(${(props) => props.Image}) no-repeat center center; /* 배경 이미지 설정 */
  background-size: cover; /* 배경 이미지 크기 조정 */
  cursor: pointer; /* 마우스 포인터 변경 */
  transition: transform 0.3s ease; /* 크기 변환 애니메이션 */

  /* hover 시 스타일 */
  &:hover {
    background: url(${(props) => props.Gif}) no-repeat center center; /* GIF로 배경 변경 */
    background-size: cover;
    transform: scale(1.05); /* 크기 확대 */
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5); /* 그림자 효과 */
  }

  /* active(클릭) 시 스타일 */
  &:active {
    transform: scale(0.95); /* 크기 축소 */
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25); /* 약한 그림자 효과 */
  }
`;

// HoverTextContainer: 카드 위에 텍스트를 표시하는 컨테이너
const HoverTextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* 카드 전체 너비 */
  height: 100%; /* 카드 전체 높이 */
  background: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  border-radius: 50px; /* 카드와 동일한 모서리 둥글기 */
  display: flex; /* 플렉스박스 레이아웃 */
  justify-content: center; /* 텍스트를 오른쪽 정렬 */
  align-items: center; /* 텍스트를 세로로 중앙 정렬 */
  opacity: 0; /* 초기 상태에서 투명 */
  transition: opacity 0.3s ease; /* 투명도 애니메이션 */

  /* StyledCard가 hover되었을 때 이 컨테이너의 불투명도를 변경 */
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

// HoverText: HoverTextContainer 내부에 표시되는 텍스트
const HoverText = styled.div`
  color: #fff; /* 텍스트 색상 */
  font-size: 40px; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 굵기 */
  font-family: "BM HANNA Pro";

`;


// CategoryImageFrame: 이미지와 텍스트를 포함한 카드 컴포넌트
const CategoryImageFrame = ({ Image, Gif, HoverTextContent,onClick }) => {
  return (
    <StyledCard Image={Image} Gif={Gif} onClick={onClick}>
      {/* Hover 시 표시될 텍스트 컨테이너 */}
      <HoverTextContainer>
        <HoverText>{HoverTextContent}</HoverText>
      </HoverTextContainer>
    </StyledCard>
  );
};

// PropTypes: 컴포넌트 props의 타입을 정의
CategoryImageFrame.propTypes = {
  Image: PropTypes.string.isRequired, // 정적 이미지 경로
  Gif: PropTypes.string.isRequired, // 애니메이션 GIF 경로
  HoverTextContent: PropTypes.string.isRequired, // hover 시 표시될 텍스트
  onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러
};

export default CategoryImageFrame; // 컴포넌트 내보내기
