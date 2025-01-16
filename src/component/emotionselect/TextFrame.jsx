import styled from "styled-components";
import PropTypes from "prop-types";

// 버튼의 스타일 정의
const TextFrame = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundcolor",
})`
  width: 20rem; /* 기본 버튼 너비: 320px */
  height: 5.625rem; /* 기본 버튼 높이: 90px */
  border-radius: 1.875rem; /* 버튼 모서리 둥글기: 30px */
  padding: 1.5rem;
  cursor: pointer; /* 커서를 올리면 포인터로 변경 */
  transition: transform 0.3s ease; /* 버튼 크기 변화에 부드러운 전환 효과 적용 */
  position: absolute; /* 버튼의 위치를 부모 컨테이너 기준으로 배치 */
  z-index: 4;

  background-color: ${(props) =>
    props.backgroundcolor}; /* props로 전달된 배경색 적용 */
  right: ${(props) => props.right}; /* props로 전달된 버튼의 오른쪽 위치 */
  top: ${(props) => props.top}; /* props로 전달된 버튼의 위쪽 위치 */

  display: flex; /* 내부 텍스트 중앙 정렬을 위해 flexbox 사용 */
  justify-content: center; /* 텍스트를 수평 중앙 정렬 */
  align-items: center; /* 텍스트를 수직 중앙 정렬 */
  overflow: hidden;
  text-align: center;
  flex-direction: column;
`;

// 버튼 텍스트의 스타일 정의
const TextStyle = styled.div`
  font-family: "BMHANNAPro", sans-serif; /* 폰트 설정 */
  font-size: 1.0625rem; /* 기본 텍스트 크기: 17px */
  font-style: normal;
  font-weight: 400; /* 텍스트 두께 */
  line-height: normal;
`;

// 버튼 컴포넌트 정의
const Button = ({ text, onClick, backgroundcolor }) => {
  return (
    <TextFrame
      onClick={onClick} // 버튼 클릭 시 실행할 함수 전달
      backgroundcolor={backgroundcolor} // 버튼의 배경색 전달
    >
      <TextStyle>{text}</TextStyle> {/* 버튼의 텍스트 렌더링 */}
    </TextFrame>
  );
};

// PropTypes를 통해 컴포넌트 props의 타입 정의 및 검증
Button.propTypes = {
  text: PropTypes.string.isRequired, // 버튼에 표시될 텍스트 (필수)
  onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러 함수 (필수)
  backgroundcolor: PropTypes.string.isRequired, // 버튼의 배경색 (필수)
};

export default Button; // Button 컴포넌트를 외부에서 사용할 수 있도록 내보냄
