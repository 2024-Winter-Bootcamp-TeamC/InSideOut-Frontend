import "./HomeButton.css"; // CSS 파일 불러오기
import PropTypes from "prop-types";

const HomeButton = ({ gifPath, onClick }) => {
  return (
    <div className="home-button-card" onClick={onClick} role="button">
      <div className="home-button-card-content">
        {/* 컨테이너 내부 컨텐츠 */}
        <div className="home-button-aspect-ratio">
          {/* 특정 비율을 유지하기 위한 컨테이너 */}
          <img
            // gif를 표시하는 이미지 태그
            className="home-button-img"
            alt="HomeButton"
            src={gifPath}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

HomeButton.propTypes = {
  gifPath: PropTypes.string.isRequired, // GIF 파일 경로 (필수)
  onClick: PropTypes.func, // 클릭 이벤트 핸들러
};

HomeButton.defaultProps = {
  onClick: () => {}, // 기본 클릭 핸들러
};

export default HomeButton;
