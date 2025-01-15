import "./HomeButton.css"; //css 파일 불러오기

const HomeButton = () => {
  // public 디렉토리의 GIF 경로
  const gifPath = "/assets/HomeButton.gif"; //gif 경로 설정

  return (
    <div className="home-button-card">
      <div className="home-button-card-content">
        {/*컨테이너 내부 컨텐츠*/}
        <div className="home-button-aspect-ratio">
          {/*특정 비율을 유지하기 위한 컨테이너*/}
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

export default HomeButton;
