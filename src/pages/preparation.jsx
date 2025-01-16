import styled from "styled-components";
import BackGroundPNG from "../assets/preparation.png";
import text from "../assets/text1.png";
import { useState } from "react";
const Preparation = () => {
  const [images, setImages] = useState([null, null, null, null]); // 4개의 이미지 슬롯 관리
  const [currentIndex, setCurrentIndex] = useState(3); // 현재 추가할 프레임 인덱스 (4부터 시작)

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...images];
        updatedImages[currentIndex] = reader.result; // 현재 인덱스에 이미지 추가
        setImages(updatedImages);

        // 다음 인덱스로 이동 (3 -> 2 -> 1 -> 0)
        if (currentIndex === 0) {
          setCurrentIndex(-2); // 모든 이미지가 채워지면 인덱스를 -1로 설정하여 + 버튼 숨김
        } else {
          setCurrentIndex(currentIndex - 1); // 이전 프레임으로 이동
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Container>
      <SmallContainer>
        <ImageContainer>
          <ImageAttachFrame
            style={{
              backgroundImage: images[0] ? `url(${images[0]})` : "none",
            }}
          >
            {currentIndex >= 0 && (
              <>
                <UploadLabel htmlFor="file-upload">+</UploadLabel>
                <HiddenInput
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
              </>
            )}
          </ImageAttachFrame>
          <ImageAttachFrame2
            style={{
              backgroundImage: images[1] ? `url(${images[1]})` : "none",
            }}
          />
          <ImageAttachFrame3
            style={{
              backgroundImage: images[2] ? `url(${images[2]})` : "none",
            }}
          />
          <ImageAttachFrame4
            style={{
              backgroundImage: images[3] ? `url(${images[3]})` : "none",
            }}
          />

          <ImageUpload> + 버튼을 클릭하여 이미지를 업로드 해주세요</ImageUpload>
        </ImageContainer>
        <TextContainer>
          <Textsimulation>캐릭터와 대화할 상황을 입력해주세요!</Textsimulation>
          <TextImage />
          <TextBox>
            <InputBoxContainer>
              <InputBox />
            </InputBoxContainer>
          </TextBox>
          <ContinueButton>진행하기</ContinueButton>
        </TextContainer>
      </SmallContainer>
    </Container>
  );
};

export default Preparation;
const UploadLabel = styled.label`
  position: absolute;
  top: 40%;
  left: 40%;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BackGroundPNG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 100px 200px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  gap: 10px;
  flex-shrink: 0;
`;
const SmallContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 124px;
  flex-shrink: 0;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
`;
const ImageAttachFrame = styled.div`
  position: absolute;
  perspective: 600px; /* 원근감 설정 (값이 작을수록 더 극적인 효과) */
  width: 40%;
  height: 50%;
  transform: matrix(1, 0.04, 0, 1, 0, 0);
  flex-shrink: 0;
  border: 5px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  background-size: cover; /* 이미지가 프레임 크기에 맞게 채워짐 */
  background-position: center; /* 이미지가 중앙에 위치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  top: 40%;
  left: 0%;
  z-index: 3;
`;
const ImageAttachFrame2 = styled.div`
  position: absolute;
  width: 40%;
  height: 50%;
  perspective: 600px; /* 원근감 설정 (값이 작을수록 더 극적인 효과) */
  transform: matrix(1, 0.04, 0, 1, 0, 0);
  flex-shrink: 0;
  border: 5px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  background-size: cover; /* 이미지가 프레임 크기에 맞게 채워짐 */
  background-position: center; /* 이미지가 중앙에 위치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  top: 25%;
  left: 15%;
  z-index: 2;
`;
const ImageAttachFrame3 = styled.div`
  position: absolute;
  width: 40%;
  height: 50%;
  perspective: 600px; /* 원근감 설정 (값이 작을수록 더 극적인 효과) */
  transform: matrix(1, 0.04, 0, 1, 0, 0);
  flex-shrink: 0;
  border: 5px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  background-size: cover; /* 이미지가 프레임 크기에 맞게 채워짐 */
  background-position: center; /* 이미지가 중앙에 위치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  top: 10%;
  left: 30%;
  z-index: 1;
`;
const ImageAttachFrame4 = styled.div`
  position: absolute;

  perspective: 600px; /* 원근감 설정 (값이 작을수록 더 극적인 효과) */
  width: 40%;
  height: 50%;
  transform: matrix(1, 0.04, 0, 1, 0, 0);
  flex-shrink: 0;
  border: 5px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  background-size: cover; /* 이미지가 프레임 크기에 맞게 채워짐 */
  background-position: center; /* 이미지가 중앙에 위치 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  top: -5%;
  left: 45%;
`;

const ImageUpload = styled.div`
  position: absolute;
  width: 631px;
  height: 32px;
  flex-shrink: 0;
  color: #fff;
  font-family: "BM HANNA Pro";
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  top: 100%;
`;
const TextContainer = styled.div`
  width: 40%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
`;
const TextBox = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8.743px;
  position: absolute;
  bottom: 12px;
`;
const InputBoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 17.487px;
  border: 1.457px solid var(--Neutral-200, #e4e4e7);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1.457px 2.914px 0px rgba(0, 0, 0, 0.05);
  padding: 10px;
`;

const InputBox = styled.textarea`
  font-family: Mulish;
  font-size: 20.401px;
  font-style: normal;
  font-weight: 400;
  line-height: 23.316px; /* 114.286% */
  flex: 1 0 0;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1.457px 2.914px 0px rgba(0, 0, 0, 0.05);
  font-family: "BM HANNA Pro";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
`;

const Textsimulation = styled.div`
  width: 100%;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: "BM HANNA Pro";
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TextImage = styled.img`
  background-image: url(${text});
  width: 50%;
  height: 25%;
  position: absolute;
  top: 23%;
  left: 48%;
  flex-shrink: 0;
  border: 0px solid #fff;
`;
const HiddenInput = styled.input`
  display: none; /* 숨겨진 파일 입력 필드 */
`;

const ContinueButton = styled.button`
  width: 30%;
  height: 10%;
  background-color: #fff;
  color: #000;
  position: absolute;
  bottom: -15%;
  left: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #fff;
  font-family: "BM HANNA Pro";
`;
