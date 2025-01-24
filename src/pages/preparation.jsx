import styled from "styled-components";
import BackGroundPNG from "../assets/preparation.png";
import text from "../assets/text1.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/loading"; // 이미 작성한 로딩 컴포넌트 import

const Preparation = () => {
  const [images, setImages] = useState([null, null, null]); // 3개의 이미지 슬롯 관리
  const [currentIndex, setCurrentIndex] = useState(2); // 현재 추가할 프레임 인덱스 (2부터 시작)
  const [textContent, setTextContent] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user_id, category } = location.state || {};
  const [charCount, setCharCount] = useState(0);
  const charLimit = 150;
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[currentIndex] = reader.result;
          setCurrentIndex(currentIndex === 0 ? -2 : currentIndex - 1);
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!textContent.trim()) {
      alert("텍스트를 입력해 주세요.");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    images.forEach((image) => {
      if (image) {
        const file = dataURLtoFile(image, "image.png");
        formData.append("files", file);
      }
    });

    formData.append("content", textContent);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/preparations?user_id=${user_id}&category=${category}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/emotionselect", { state: { user_id } });
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도하세요");
    } finally {
      setLoading(false); // 요청 완료 후 로딩 상태 false로 설정
    }
  };

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= charLimit) {
      setTextContent(inputValue);
      setCharCount(inputValue.length);
    }
  };

  function dataURLtoFile(dataURL, filename) {
    let arr = dataURL.split(","),
      mimeMatch = arr[0].match(/^data:(.+?);base64$/); // 더 안전하고 정확한 정규 표현식
    if (!mimeMatch) {
      throw new Error("유효하지 않은 데이터 URL입니다.");
    }
    let mime = mimeMatch[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let file = new File([u8arr], filename, { type: mime });
    return file;
  }

  return (
    <Container>
      {loading && <Loading text="캐릭터 한줄평 생성 중" />}
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
          <ImageUpload>
            {" "}
            + 버튼을 클릭하여 대화 이미지를 업로드 해주세요
          </ImageUpload>
        </ImageContainer>

        <TextContainer>
          <Textsimulation>
            캐릭터들과 대화할 상황을 입력해주세요!
          </Textsimulation>
          <TextImage />
          <TextBox>
            <InputBoxContainer>
              <InputBox value={textContent} onChange={handleTextChange} />
              <CharCount>
                {charCount}/{charLimit}
              </CharCount>
            </InputBoxContainer>
          </TextBox>
          <ContinueButton onClick={handleSubmit}>캐릭터 생성</ContinueButton>
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
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.5);

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
`;
const SmallContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  flex-shrink: 0;
`;

const ImageContainer = styled.div`
  width: 37rem;
  height: 33rem;
  flex-shrink: 0;
  top: 4.6rem;
  left: 14rem;
  position: fixed;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
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

const ImageUpload = styled.div`
  position: fixed;
  width: 40rem;
  height: 2rem;
  top: 38.5rem;
  left: 10rem;
  flex-shrink: 0;
  color: #fff;
  font-family: "BMHANNAPro";
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const TextContainer = styled.div`
  width: 40%;
  height: 100%;
  flex-shrink: 0;
  flex-shrink: 0;
  position: relative;
  display: flex;
`;
const TextBox = styled.div`
  display: flex;
  width: 32rem;
  height: 15rem;
  top: 22.4rem;
  left: 51rem;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  bottom: 12px;
`;
const InputBoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  top: 0%;
  left: 0%;
  border-radius: 17.487px;
  border: 1.457px solid var(--Neutral-200, #e4e4e7);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1.457px 2.914px 0px rgba(0, 0, 0, 0.05);
  padding: 10px;
`;

const InputBox = styled.textarea`
  font-family: "BMHANNAPro";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 10px;
  resize: none; /* 사용자가 크기 조절할 수 없도록 함 */
  flex: 1 0 0;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1.457px 2.914px 0px rgba(0, 0, 0, 0.05);
  color: #000;
  border-radius: 17.487px;

  /* 스크롤바 숨기기 */
  overflow-y: scroll; /* 스크롤 가능하지만 스크롤바는 보이지 않음 */
  scrollbar-width: thin; /* 스크롤바의 두께 조정 */
  scrollbar-color: transparent transparent; /* 스크롤바 색상 투명으로 설정 */

  /* 텍스트가 넘칠 경우 자동으로 크기 조정 */
  min-height: 100px;
  max-height: 200px;
  white-space: pre-wrap; /* 줄 바꿈 허용 */
  word-wrap: break-word; /* 긴 단어 줄바꿈 */

  /* 텍스트가 넘치면 세로로 스크롤이 가능하게 함 */
  overflow-x: hidden; /* 가로 스크롤 없애기 */
`;

const Textsimulation = styled.div`
  width: 100%;
  position: fixed;
  flex-shrink: 0;
  color: #fff;
  top: 10rem;
  left: 52rem;
  font-family: "BMHANNAPro";
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TextImage = styled.div`
  background-image: url(${text});
  width: 50%;
  height: 25%;
  top: 14rem;
  left: 68rem;
  flex-shrink: 0;
  max-width: 220px; /* 최대 너비 100% */
  max-height: 134px; /* 최대 높이 100% */
  position: fixed;
`;

const HiddenInput = styled.input`
  display: none; /* 숨겨진 파일 입력 필드 */
`;

const ContinueButton = styled.button`
  width: 9rem;
  height: 3rem;
  background-color: #fff;
  color: #000;
  position: fixed;
  top: 40rem;
  left: 74rem;
  border-radius: 30px;
  background: #fff;
  font-family: "BMHANNAPro";

  transition: transform 0.3s ease;
  outline: none;
  box-shadow: none;

  &:hover {
    transform: scale(1.05); /* 버튼에 호버하면 크기를 1.05배 증가 */
    z-index: 3;
  }

  &:active {
    transform: scale(0.95); /* 버튼 클릭 시 크기를 0.95배 감소 */
  }
`;

const CharCount = styled.div`
  font-family: "BMHANNAPro";
  font-size: 16px;
  color: #000;
  margin-top: 8px;
`;
