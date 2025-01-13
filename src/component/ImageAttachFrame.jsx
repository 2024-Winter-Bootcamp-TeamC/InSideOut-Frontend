import styled from "styled-components";

// PerspectiveWrapper: 카드에 원근감을 적용하는 컨테이너
// 원근 효과를 부여하려면 부모 요소에 `perspective`를 설정해야 함
const PerspectiveWrapper = styled.div`
  perspective: 600px; /* 원근감 설정 (값이 작을수록 더 극적인 효과) */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%; /* 부모 요소의 너비 */
  height: 100%; /* 부모 요소의 높이 */
`;

// StyledCard: 기울어진 카드 자체의 스타일 정의
const StyledCard = styled.div`
  width: 295.65px;
  height: 323.35px;
  left: 18px;
  top: 323.53px;

  background: #ffffff;
  border: 5px solid rgba(0, 0, 0, 0.5);
  transform: matrix(1, 0.04, 0, 1, 0, 0);
`;

// StyledCardContent: 카드 내부 콘텐츠를 감싸는 컨테이너
const StyledCardContent = styled.div`
  padding: 0; /* 내부 여백 제거 */
  height: 100%; /* 카드 높이에 맞게 콘텐츠 높이를 설정 */
`;

// DivWrapper: 전체 컴포넌트를 렌더링하는 함수형 컴포넌트
export default function DivWrapper() {
  return (
    <PerspectiveWrapper>
      {/* 원근 효과가 적용된 카드 */}
      <StyledCard>
        {/* 카드 내부 콘텐츠 (현재 비어 있음) */}
        <StyledCardContent />
      </StyledCard>
    </PerspectiveWrapper>
  );
}

/*box-sizing: border-box;

position: absolute;
width: 295.65px;
height: 323.35px;
left: 18px;
top: 323.53px;

background: #FFFFFF;
border: 5px solid rgba(0, 0, 0, 0.5);
transform: matrix(1, 0.04, 0, 1, 0, 0);
*/
