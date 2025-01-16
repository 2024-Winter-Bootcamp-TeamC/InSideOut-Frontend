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
  align-items: center;
  font-weight: normal;
  margin-left: 0px; 

  &:hover {
    background-color: rgba(148, 126, 224, 1);
    border-radius: 30px; 
  }
`;

const CategoryButton = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState("전체"); 

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (category) => {
    setSelectedCategory(category); 
    onCategorySelect(category); 
    setIsOpen(false); 
  };

  return (
    <div style={{ position: "relative" }}>
    
      <Card onClick={toggleDropdown}>{selectedCategory}</Card>

      <DropDownList isOpen={isOpen}>

        {categories.map((category, index) => (
          <DropDownItem key={index} onClick={() => handleSelect(category)}>
            {category}
          </DropDownItem>
        ))}
      </DropDownList>
    </div>
  );
};


CategoryButton.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired, 
  onCategorySelect: PropTypes.func.isRequired, 
};

export default CategoryButton;