import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// 버튼 스타일 정의 (카테고리 선택 버튼)
const Card = styled.div`
  width: 120px;
  height: 35px;
  border-radius: 30px; /* 둥근 모서리 */
  background-color: rgba(148, 126, 224, 1); /* 버튼 배경색 */
  cursor: pointer; /* 클릭 가능한 커서 모양 */
  position: relative; /* 드롭다운 리스트의 위치 설정을 위한 기준 */
  font-family: "BMHANNAPro", sans-serif; /* 폰트 적용 */
  font-size: 28px; /* 폰트 크기 */
  color: black; /* 텍스트 색상 */
  font-weight: normal; /* 폰트 두께 */
  display: flex; /* 내용 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

// 드롭다운 리스트 스타일 정의
const DropDownList = styled.ul`
  position: absolute; /* 버튼 아래 위치 */
  border-radius: 30px; /* 둥근 모서리 */
  top: 25px; /* 버튼과 리스트 간격 */
  background-color: none; /* 배경색 없음 (기본 상속) */
  list-style: none; /* 불필요한 리스트 점 제거 */
  padding: 10px 0; /* 상하 여백 추가 */
  margin: 0; /* 기본 마진 제거 */
  z-index: 10; /* 버튼보다 앞쪽에 나타나도록 설정 */

  ${(props) => !props.isOpen && `display: none;`}/* 드롭다운이 닫힐 때 숨김 */
`;

// 드롭다운 리스트의 항목 스타일 정의
const DropDownItem = styled.li`
  background-color: white; /* 항목의 배경색 */
  font-family: "BMHANNAPro", sans-serif; /* 폰트 적용 */
  font-size: 28px; /* 폰트 크기 */
  text-align: center; /* 텍스트 가운데 정렬 */
  cursor: pointer; /* 클릭 가능한 커서 모양 */
  transition: background-color 0.2s; /* 배경색 변경 시 애니메이션 */
  border-radius: 30px; /* 둥근 모서리 */
  margin: 7px; /* 항목 간 간격 */
  color: black; /* 텍스트 색상 */
  width: 120px; /* 항목 너비 */
  height: 35px; /* 항목 높이 */
  display: flex; /* 내용 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-weight: normal; /* 폰트 두께 */
  margin-left: 0px; /* 항목의 왼쪽 여백 제거 */

  &:hover {
    background-color: rgba(148, 126, 224, 1); /* 호버 시 배경색 */
    border-radius: 30px; /* 둥근 모서리 유지 */
  }
`;

// 카테고리 버튼 컴포넌트 정의
const CategoryButton = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 여부 상태
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 현재 선택된 카테고리 상태

  // 드롭다운 토글 함수
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 카테고리 선택 처리 함수
  const handleSelect = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 업데이트
    onCategorySelect(category); // 상위 컴포넌트에 선택된 카테고리 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 선택된 카테고리를 표시하는 버튼 */}
      <Card onClick={toggleDropdown}>{selectedCategory}</Card>

      {/* 드롭다운 리스트 */}
      <DropDownList isOpen={isOpen}>
        {/* 드롭다운 항목들 */}
        {categories.map((category, index) => (
          <DropDownItem key={index} onClick={() => handleSelect(category)}>
            {category}
          </DropDownItem>
        ))}
      </DropDownList>
    </div>
  );
};

// PropTypes를 이용한 props 검증
CategoryButton.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired, // categories는 문자열 배열이어야 함
  onCategorySelect: PropTypes.func.isRequired, // onCategorySelect는 함수여야 함
};

export default CategoryButton;
