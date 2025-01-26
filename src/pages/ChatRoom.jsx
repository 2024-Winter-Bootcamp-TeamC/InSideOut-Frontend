// src/component/chatroom/ChatRoom.jsx
import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../component/chatroom/ChatFinishModal";
import Loading from "../component/loading";
import ChatRoomBackground from "../assets/chatroom/Background.png";
import CharacterFrame from "../component/chatroom/CharacterFrame";
import AngerPNG from "../assets/chatroom/Anger.png";
import JoyPNG from "../assets/chatroom/Joy.png";
import SadnessPNG from "../assets/chatroom/Sadness.png";
import EmbarrassmentPNG from "../assets/chatroom/Embarrassment.png";
import FearPNG from "../assets/chatroom/Fear.png";
import DisgustPNG from "../assets/chatroom/Disgust.png";
import AnxietyPNG from "../assets/chatroom/Anxiety.png";
import RileyPNG from "../assets/chatroom/Riley.png";
import Mute from "../assets/Mute.png";
import Volume from "../assets/Volume.png";
import PropTypes from "prop-types";

/* 숫자 ID -> 캐릭터 패널 표시용 이미지 */
const emotionImageMap = {
  1: JoyPNG,
  2: SadnessPNG,
  3: AngerPNG,
  4: DisgustPNG,
  5: FearPNG,
  6: AnxietyPNG,
  7: EmbarrassmentPNG,
};

const emotionColorMap = {
  기쁨이: { titleColor: "#FFC738", summaryColor: "#FECE0C" },
  슬픔이: { titleColor: "#183B89", summaryColor: "#0F4D9B" },
  버럭이: { titleColor: "#FF3529", summaryColor: "#EE4135" },
  까칠이: { titleColor: "#106B1A", summaryColor: "#278B1E" },
  소심이: { titleColor: "#5B3597", summaryColor: "#683DAC" },
  불안이: { titleColor: "#DF7416", summaryColor: "#F69F1E" },
  부럽이: { titleColor: "#086F76", summaryColor: "#0E8E97" },
};

/* 감정 이름 -> 채팅 아바타(말풍선 왼쪽 아이콘) */
const emotionNameToImage = {
  기쁨이: JoyPNG,
  슬픔이: SadnessPNG,
  버럭이: AngerPNG,
  까칠이: DisgustPNG,
  소심이: FearPNG,
  불안이: AnxietyPNG,
  당황이: EmbarrassmentPNG,
};

const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${ChatRoomBackground}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;
  padding: 5rem 11rem;
`;

const CharacterContainerWrapper = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CharacterContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin: 1.1rem;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ChatroomContainerWrapper = styled.div`
  width: 47.5%;
  height: 104%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SecondWrapper = styled.div`
  width: 100%;
  height: 82%;
  aspect-ratio: 1;
  overflow-y: hidden;
  border-radius: 20px;
  background-color: #ffffffba;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
`;

const ChatContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 메시지가 위에서부터 쌓이도록 변경 */
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ModeSelectWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 15%;
  left: 60%;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isActive }) =>
    $isActive === "messages" ? "#4caf50" : "#f32125"};
  transition: background-color 0.3s ease;
  border-radius: 30px;
  padding: 5px 15px;
  cursor: pointer;
  width: 20%;
  height: 7%;
  justify-content: space-between;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.3s ease; /* 중복 제거 */
  border: none;
  outline: none;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
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
  height: 82%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 3% 5%;
`;


const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "row")};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: contain;
  margin: ${({ $isUser }) => ($isUser ? "0 0 0 10px" : "0 10px 0 0")};
`;

const Bubble = styled.div`
  border: ${({ $isUser, $borderColor }) =>
    $isUser ? "4px solid #877354" : `4px solid ${$borderColor || "#B032F8"}`};
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 12px;
  max-width: 70%;
  font-family: "BMHANNAPro", sans-serif;
  background-color: #ffffff;
  color: ${({ $isUser, $bgColor }) => ($isUser ? "#000" : $bgColor || "black")};
  white-space: pre-wrap;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 3.3rem;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  margin-top: 1rem;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  font-size: 16px;
  padding: 5px;
  outline: none;
  font-family: "BMHANNAPro", sans-serif;
  background-color: #fff;
  color: #000;
`;

const ChatFinishButton = styled.button`
  background-color: #f44336;
  border-radius: 1.25rem;
  width: 17rem;
  height: 3.3rem;
  font-family: "BMHANNAPro", sans-serif;
  font-size: 1.5rem;
  color: white;
  transition: transform 0.3s ease;
  border: none;
  outline: none;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const DiscussStartButton = styled.button`
  background-color: #f44336;
  border-radius: 1.25rem;
  width: 17rem;
  height: 3.3rem;
  font-family: "BMHANNAPro", sans-serif;
  font-size: 1.5rem;
  color: white;
  transition: transform 0.3s ease;
  border: none;
  outline: none;
  padding: 8px;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const SvgSendButton = styled.svg`
  width: 45px;
  height: 45px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const VolumeControl = styled.div`
  position: fixed;
  bottom: 20px;
  right: 1300px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  padding-right: 10px;
`;

const MuteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VolumeSlider = styled.input`
  width: 100px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

function ChatRoom({ audioRef }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState("messages");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [activeEmotion, setActiveEmotion] = useState(null); // 활성화된 감정 상태 추가
  const [isFetchDone, setIsFetchDone] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isDiscussModalOpen, setIsDiscussModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user_id, chatroom_id, emotion_choose_ids } = location.state || {};
  const chatContainerRef = useRef(null);

  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

  /* 감정별 버퍼, ex: { "기쁨이": { text:"...", audioChunks:[...]} } */
  const emotionBuffersRef = useRef({});

  /* 마지막으로 SSE가 말한 감정 */
  const lastEmotionRef = useRef(null);

  /* 재생 순서 (queue)에 감정을 push */
  const playQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    audioContextRef.current = audioCtx;
    gainNodeRef.current = gainNode;
    return () => {
      audioCtx.close();
    };
  }, []);

  /* base64를 Blob으로 변환하는 헬퍼 함수 */
  const base64ToBlob = (base64, mime) => {
    try {
      const byteChars = atob(base64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mime });
    } catch (error) {
      console.error("base64ToBlob 변환 오류:", error);
      return null;
    }
  };

  /* 감정 ID를 감정 이름으로 매핑하는 함수 */
  const getEmotionName = (id) => {
    switch (id) {
      case 1:
        return "기쁨이";
      case 2:
        return "슬픔이";
      case 3:
        return "버럭이";
      case 4:
        return "까칠이";
      case 5:
        return "소심이";
      case 6:
        return "불안이";
      case 7:
        return "당황이";
      default:
        return "기쁨이";
    }
  };

  /* queue에서 감정 꺼내 재생 */
  const playNext = useCallback(() => {
    if (isPlayingRef.current) return;

    const nextMessage = playQueueRef.current.shift();
    if (!nextMessage) {
      console.log("No more messages to play.");
      return;
    }

    console.log("Playing next message:", nextMessage); // 추가된 로그
    isPlayingRef.current = true;

    // 활성화된 감정 설정
    setActiveEmotion(nextMessage.emotion);

    const { audio } = nextMessage;
    const audioBlob = base64ToBlob(audio, "audio/mpeg"); // base64를 Blob으로 변환
    if (!audioBlob) {
      console.error("오디오 Blob 생성 실패");
      isPlayingRef.current = false;
      setActiveEmotion(null); // 활성화된 감정 해제
      playNext();
      return;
    }

    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = new Audio(audioUrl);

    audioElement.volume = isMuted ? 0 : volume;

    audioElement.onended = () => {
      console.log("Audio ended:", audioUrl); // 추가된 로그
      isPlayingRef.current = false;
      setActiveEmotion(null); // 활성화된 감정 해제
      URL.revokeObjectURL(audioUrl);
      playNext(); // 다음 메시지 재생
    };

    audioElement.onerror = (err) => {
      console.error("Audio playback error:", err);
      isPlayingRef.current = false;
      setActiveEmotion(null); // 활성화된 감정 해제
      playNext(); // 에러 발생 시 다음 메시지 재생
    };

    audioElement.play().catch((err) => {
      console.error("오디오 재생 오류:", err);
      isPlayingRef.current = false;
      setActiveEmotion(null); // 활성화된 감정 해제
      playNext();
    });
  }, [isMuted, volume]);

  /* handleSSEData 함수 정의 */
  const handleSSEData = useCallback(
    (data) => {
      console.log("Handling SSE Data:", data); // 추가된 로그

      if (data.type === "content_chunk") {
        const { emotion, content, audio } = data;

        setMessages((prev) => {
          if (
            prev.length > 0 &&
            prev[prev.length - 1].emotion === emotion &&
            !prev[prev.length - 1].isUser
          ) {
            // 마지막 메시지가 같은 감정이고, AI 메시지인 경우 이어붙임
            const updatedLastMessage = {
              ...prev[prev.length - 1],
              text: prev[prev.length - 1].text + content,
            };
            return [...prev.slice(0, -1), updatedLastMessage];
          } else {
            // 새로운 메시지 추가
            return [...prev, { emotion, text: content, isUser: false }];
          }
        });

        // TTS 재생 큐에 추가
        playQueueRef.current.push({
          emotion,
          audio,
        });

        // TTS 재생 시작
        playNext();
      } else if (data.type === "error") {
        // 에러 처리 로직 (필요시 추가)
        console.error("SSE Error:", data.message);
      }
    },
    [playNext]
  );

  /* SSE 연결 설정 함수 */
  const setupEventSource = useCallback(() => {
    const eventSource = new EventSource(
      `http://localhost:8000/api/chats/sse/${chatroom_id}`
    );

    eventSource.onmessage = (event) => {
      const data = event.data.trim();
      console.log("Received SSE message:", data);

      if (data.toLowerCase() === "ping") {
        console.log("Received ping from server. Ignoring.");
        return;
      }

      try {
        const parsed = JSON.parse(data);
        console.log("Parsed SSE data:", parsed);
        handleSSEData(parsed);
      } catch (err) {
        console.error("JSON 파싱 오류:", err, "Received data:", data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE 연결 오류:", err);
      eventSource.close();

      // 5초 후 재연결 시도
      setTimeout(() => {
        console.log("Reconnecting to SSE...");
        setupEventSource();
      }, 5000);
    };

    return eventSource;
  }, [chatroom_id, handleSSEData]);

  useEffect(() => {
    const eventSource = setupEventSource();

    return () => {
      eventSource.close();
    };
  }, [setupEventSource]);

  /* 메시지 전송(기본 모드) */
  const sendMessageBasicMode = async () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { emotion: null, text: inputText, isUser: true },
    ]);
    try {
      // 오디오 상태 초기화
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;

      // 유저가 고른 감정(숫자 IDs) -> 한글 감정 배열
      const emotionNames = emotion_choose_ids.map((id) => getEmotionName(id));

      const url = `http://localhost:8000/api/chats/${chatroom_id}/messages?user_id=${user_id}`;
      const body = {
        emotions: emotionNames,
        prompt: inputText,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        console.error("기본 모드 요청 실패");
        return;
      }
      setInputText("");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      setIsFetchDone(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsFetchDone(true);
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          if (line.startsWith("data: ")) {
            const jsonStr = line.substring("data: ".length);
            if (jsonStr !== "[DONE]") {
              try {
                const parsed = JSON.parse(jsonStr);
                handleSSEData(parsed);
              } catch (err) {
                console.error(
                  "JSON 파싱 오류:",
                  err,
                  "Received data:",
                  jsonStr
                );
              }
            }
          }
        }
        buffer = lines[lines.length - 1];
      }
    } catch (err) {
      console.error("기본 모드 SSE 오류:", err);
    }
  };

  const addMessage = async () => {
    if (!inputText.trim()) return;
    await sendMessageBasicMode();
  };

  const handleChatFinishButton = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    setIsModalOpen(false);
    setIsLoadingReport(true);
    try {
      // 오디오 상태 초기화
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;
      setIsFetchDone(false);

      const url = `http://localhost:8000/api/reports/${user_id}?chatroom_id=${chatroom_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        console.error("리포트 생성 실패");
      } else {
        const data = await response.json();
        if (data.status === "success") {
          const report_id = data.report_id;
          setMessages([]);
          lastEmotionRef.current = null;
          emotionBuffersRef.current = {};
          playQueueRef.current = [];
          isPlayingRef.current = false;
          navigate("/reportDetail", { state: { report_id, user_id } });
        }
      }
    } catch (err) {
      console.error("리포트 생성 중 오류:", err);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  /* 모드 토글 */
  const toggleMode = () => {
    setIsActive((prev) => (prev === "messages" ? "discussions" : "messages"));
  };

  /* 음소거/볼륨 */
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = !isMuted ? 0 : volume;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  const handleDiscussStartButton = () => {
    setIsDiscussModalOpen(true);
  };

  const handleDiscussModalConfirm = async () => {
    setIsDiscussModalOpen(false);

    try {
      // 오디오 상태 초기화
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;
      setIsFetchDone(false);

      const emotionNames = emotion_choose_ids.map((id) => getEmotionName(id));

      const url = `http://localhost:8000/api/chats/${chatroom_id}/discussions?user_id=${user_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotions: emotionNames }),
      });

      if (!response.ok) {
        console.error("논쟁 모드 요청 실패");
      } else {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setIsFetchDone(true);
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line.startsWith("data: ")) {
              const jsonStr = line.substring("data: ".length);
              if (jsonStr !== "[DONE]") {
                try {
                  const parsed = JSON.parse(jsonStr);
                  handleSSEData(parsed);
                } catch (error) {
                  console.error("JSON 파싱 오류:", error);
                }
              }
            }
          }
          buffer = lines[lines.length - 1];
        }
      }
    } catch (err) {
      console.error("논쟁 모드 SSE 오류:", err);
    } finally {
      setIsLoadingReport(false); // 로딩 스피너 숨기기
    }
  };

  const handleDiscussModalCancel = () => {
    setIsDiscussModalOpen(false);
  };

  // 채팅 창이 자동으로 아래로 스크롤되도록 설정
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 초기 메시지 추가 (디자인과 렌더링 테스트용)
  useEffect(() => {
    setMessages([
      { emotion: "기쁨이", text: "안녕하세요!", isUser: false },
      { emotion: null, text: "안녕하세요! 반갑습니다.", isUser: true },
    ]);
  }, []);

  return (
    <>
      {isLoadingReport && <Loading text="리포트 생성 중..." />}
      <BackgroundContainer>
        <CharacterContainerWrapper>
          <CharacterContainer>
            {emotion_choose_ids.map((id) => {
              const emotionName = getEmotionName(id);
              return (
                <CharacterFrame
                  key={id}
                  isActive={activeEmotion === emotionName}
                  activeColor="green" // 활성화 시 초록색 보더
                >
                  <img src={emotionImageMap[id]} alt={`Emotion ${id}`} />
                </CharacterFrame>
              );
            })}
            <CharacterFrame isActive={false} activeColor="white">
              {/* 사용자 라일라의 프레임은 항상 비활성화 */}
              <img
                src={RileyPNG}
                alt="사용자 라일라"
                style={{ borderRadius: "30px" }}
              />
            </CharacterFrame>
          </CharacterContainer>
          <ChatFinishButton onClick={handleChatFinishButton}>
            대화 끝내기
          </ChatFinishButton>
        </CharacterContainerWrapper>

        <ChatroomContainerWrapper>
          <SecondWrapper>
            <ModeSelectWrapper $isActive={isActive} onClick={toggleMode}>
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
                  cx={isActive === "messages" ? "50" : "17.75"}
                  cy="18"
                  r="9.75"
                  fill="black"
                />
              </ToggleSVG>
              <ToggleText>
                {isActive === "messages" ? "일반 모드" : "논쟁 모드"}
              </ToggleText>
            </ModeSelectWrapper>

            <ChatContainerWrapper>
              <ChatContainer ref={chatContainerRef}>
                {messages.map((msg, idx) => {
                  const colorData = msg.emotion
                    ? emotionColorMap[msg.emotion]
                    : null;
                  const borderColor = colorData?.titleColor;
                  const bgColor = colorData?.summaryColor;

                  const avatar = msg.isUser
                    ? RileyPNG
                    : emotionNameToImage[msg.emotion] || AngerPNG;

                  return (
                    <MessageRow $isUser={msg.isUser} key={idx}>
                      <Avatar src={avatar} $isUser={msg.isUser} />
                      <Bubble
                        $isUser={msg.isUser}
                        $borderColor={borderColor}
                        $bgColor={bgColor}
                      >
                        {msg.text}
                      </Bubble>
                    </MessageRow>
                  );
                })}
              </ChatContainer>
            </ChatContainerWrapper>
          </SecondWrapper>

          {isActive === "messages" ? (
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
                onClick={addMessage}
              >
                <rect width="53" height="53" fill="#F5F5F5" />
                <path
                  d="M4.41675 46.375L50.7917 26.5L4.41675 6.625V22.0833L37.5417 26.5L4.41675 30.9167V46.375Z"
                  fill="#8338B5"
                />
              </SvgSendButton>
            </InputContainer>
          ) : (
            <DiscussStartButton onClick={handleDiscussStartButton}>
              논쟁모드 시작하기
            </DiscussStartButton>
          )}
        </ChatroomContainerWrapper>

        <VolumeControl>
          <MuteButton onClick={toggleMute}>
            {isMuted ? (
              <Icon src={Mute} alt="Mute" />
            ) : (
              <Icon src={Volume} alt="Volume" />
            )}
          </MuteButton>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
        </VolumeControl>

        {isModalOpen && (
          <Modal
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
            context="정말 대화를 끝내시겠습니까?"
          />
        )}

        {/* 논쟁 모드 모달 추가 */}
        {isDiscussModalOpen && (
          <Modal
            onConfirm={handleDiscussModalConfirm}
            onCancel={handleDiscussModalCancel}
            context="논쟁모드를 시작하시겠습니까?"
          ></Modal>
        )}
      </BackgroundContainer>
    </>
  );
}

ChatRoom.propTypes = {
  audioRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default ChatRoom;
