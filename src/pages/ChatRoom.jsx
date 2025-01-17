import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Modal from "../component/ChatRoom/ChatFinishModal";
import ChatRoomBackground from "../assets/ChatRoom/Background.png";
import CharacterFrame from "../component/ChatRoom/CharacterFrame";
import AngerPNG from "../assets/ChatRoom/Anger.png";
import JoyPNG from "../assets/ChatRoom/Joy.png";
import SadnessPNG from "../assets/ChatRoom/Sadness.png";
import EmbarrassmentPNG from "../assets/ChatRoom/Embarrassment.png";

const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${ChatRoomBackground}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 40px 100px;
`;

const CharacterContainerWrapper = styled.div`
  width: 50%; /* 오른쪽 영역 너비 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  justify-content: space-between;
  box-sizing: border-box;
`;

const CharacterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-right: 20px;
  box-sizing: border-box;
`;

const ChatContainerWrapper = styled.div`
  width: 50%; /* 오른쪽 영역 너비 */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 89.5%; /* 상하 공간 적절히 사용 */
  margin-left: 20px;
  justify-content: center;
`;

const ModeSelectWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 13%;
  left: 60%;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isActive }) => ($isActive ? "#4caf50" : "#f32125")};
  transition: background-color 0.3s ease;
  border-radius: 30px;
  padding: 5px 15px;
  cursor: pointer;
  width: 20%;
  height: 7%;
  justify-content: space-between;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  border: none;
  outline: none; /* 기본 포커스 테두리 제거 */
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none; /* 포커스 상태일 때도 테두리 제거 */
  }
`;

const ToggleSVG = styled.svg`
  width: 40%;
  height: 80%;
  transition: transform 0.3s ease;
`;

const ToggleCircle = styled.circle`
  fill: black;
  transition: cx 0.3s ease;
`;

const ToggleText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: bold;
  font-family: "BMHANNAPro", sans-serif;
  margin-right: 20%;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 20px;
  background-color: #ffffffba;
  display: flex;
  flex-direction: column-reverse;
  padding: 3% 5%;
`;

const Message = styled.div`
  border: ${({ $isUser }) =>
    $isUser ? "4px solid #877354" : "4px solid #B032F8"};
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  border-radius: 20px;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 12px;
  max-width: 70%;
  font-family: "BMHANNAPro", sans-serif;
  background-color: white;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px auto;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  font-size: 16px;
  padding: 5px;
  outline: none;
  font-family: "BMHANNAPro", sans-serif;
`;

const ChatFinishButton = styled.button`
  background-color: #f44336;
  border-radius: 1.25rem;
  overflow: hidden;
  width: 40%;
  margin-bottom: 20px;
  font-family: "BMHANNAPro", sans-serif;
  font-size: 1.5rem;
  color: white;
  transition: transform 0.3s ease;
  border: none;
  outline: none; /* 기본 포커스 테두리 제거 */
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none; /* 포커스 상태일 때도 테두리 제거 */
  }
`;

const SvgSendButton = styled.svg`
  width: 45px;
  height: 45px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1); /* 마우스 오버 시 크기 확대 효과 */
    transition: transform 0.2s ease;
  }
  &:active {
    transform: scale(0.9); /* 클릭 시 크기 축소 효과 */
  }
`;

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const chatContainerRef = useRef(null);

  const fetchMessages = async () => {
    const mockMessages = [
      { text: "안녕하세요!", isUser: false },
      { text: "안녕하세요, 반갑습니다!", isUser: true },
    ];
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockMessages), 1000)
    );
  };

  useEffect(() => {
    const loadMessages = async () => {
      const initialMessages = await fetchMessages();
      setMessages(initialMessages);
    };
    loadMessages();
  }, []);

  const addMessage = () => {
    if (inputText.trim() === "") return;
    setMessages((prev) => [{ text: inputText, isUser: true }, ...prev]);
    setInputText("");
  };

  const handleChatFinishButton = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    alert("대화 끝내기");
    setMessages([]);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleToggle = () => {
    setIsActive((prev) => {
      console.log("isActive:", !prev); // 상태 변경 확인
      return !prev;
    });
  };

  return (
    <BackgroundContainer>
      <CharacterContainerWrapper>
        <CharacterContainer>
          <CharacterFrame>
            <img src={AngerPNG} />
          </CharacterFrame>
          <CharacterFrame>
            <img src={JoyPNG} />
          </CharacterFrame>
          <CharacterFrame>
            <img src={SadnessPNG} />
          </CharacterFrame>
          <CharacterFrame>
            <img src={EmbarrassmentPNG} />
          </CharacterFrame>
        </CharacterContainer>
        <ChatFinishButton onClick={handleChatFinishButton}>
          대화 끝내기
        </ChatFinishButton>
      </CharacterContainerWrapper>

      <ChatContainerWrapper>
        <ModeSelectWrapper $isActive={isActive} onClick={handleToggle}>
          <ToggleSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 36">
            <rect
              x="1"
              y="1"
              width="66"
              height="34"
              rx="17"
              fill="white"
              stroke="black"
              strokeWidth="2"
            />
            <ToggleCircle
              cx={isActive ? "50" : "17.75"}
              cy="18"
              r="9.75"
              fill="black"
            />
          </ToggleSVG>
          <ToggleText>{isActive ? "일반 모드" : "논쟁 모드"}</ToggleText>
        </ModeSelectWrapper>
        <ChatContainer ref={chatContainerRef}>
          {messages.map((message, index) => (
            <Message key={index} $isUser={message.isUser}>
              {message.text}
            </Message>
          ))}
        </ChatContainer>
        <InputContainer>
          <TextInput
            type="text"
            placeholder="메시지를 입력해주세요."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                addMessage();
              }
            }}
          />
          <SvgSendButton
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 53 53"
            onClick={addMessage} /* 클릭 시 메시지 추가 */
          >
            <rect width="53" height="53" fill="#F5F5F5" />
            <path
              d="M-607.5 12C-607.5 2.8873 -600.113 -4.5 -591 -4.5L51.0001 -4.5C60.1127 -4.5 67.5 2.88729 67.5 12V45C67.5 54.1127 60.1127 61.5 51 61.5H-591C-600.113 61.5 -607.5 54.1127 -607.5 45V12Z"
              fill="white"
              stroke="white"
              strokeWidth="7"
            />
            <path
              d="M4.41675 46.375L50.7917 26.5L4.41675 6.625V22.0833L37.5417 26.5L4.41675 30.9167V46.375Z"
              fill="#8338B5"
            />
          </SvgSendButton>
        </InputContainer>
      </ChatContainerWrapper>
      {isModalOpen && (
        <Modal onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
      )}
    </BackgroundContainer>
  );
};

export default ChatRoom;
