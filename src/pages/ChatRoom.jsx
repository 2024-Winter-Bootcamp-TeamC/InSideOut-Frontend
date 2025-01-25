import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
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

/* 숫자 ID -> 캐릭터 이미지 */
const emotionImageMap = {
  1: JoyPNG,
  2: SadnessPNG,
  3: AngerPNG,
  4: DisgustPNG,
  5: FearPNG,
  6: AnxietyPNG,
  7: EmbarrassmentPNG,
};

/* 감정 이름 -> 채팅 박스 색상 */
const emotionColorMap = {
  기쁨이: { titleColor: "#FFC738", summaryColor: "#FECE0C" },
  슬픔이: { titleColor: "#183B89", summaryColor: "#0F4D9B" },
  버럭이: { titleColor: "#FF3529", summaryColor: "#EE4135" },
  까칠이: { titleColor: "#106B1A", summaryColor: "#278B1E" },
  소심이: { titleColor: "#5B3597", summaryColor: "#683DAC" },
  불안이: { titleColor: "#DF7416", summaryColor: "#F69F1E" },
  부럽이: { titleColor: "#086F76", summaryColor: "#0E8E97" },
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

const ChatroomContaninerWrapper = styled.div`
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
  justify-content: flex-end;
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
  flex-direction: column-reverse;
  padding: 3% 5%;
`;

const Message = styled.div`
  border: ${({ $isUser, $borderColor }) =>
    $isUser ? "4px solid #877354" : `4px solid ${$borderColor || "#B032F8"}`};
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};

  border-radius: 20px;
  padding: 10px 15px;
  margin-bottom: 10px;
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

const ChatRoom = ({ audioRef }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState("messages");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const location = useLocation();
  const { user_id, chatroom_id, emotion_choose_ids } = location.state || {};
  const chatContainerRef = useRef(null);

  // Web Audio API
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const currentOffsetRef = useRef(0);

  // 감정별 audio chunk 버퍼, 감정 간 재생 큐
  const emotionBuffersRef = useRef({});
  const lastEmotionRef = useRef(null);
  const playQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  // SSE fetch 완료 여부
  const [isFetchDone, setIsFetchDone] = useState(false);

  // 보고서 생성 로딩
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  // react-router-dom으로 페이지 이동
  const navigate = useNavigate();

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

  // SSE ping 테스트
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8000/api/chats/sse/${chatroom_id}`
    );
    eventSource.onmessage = (e) => {
      // ping or data
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [chatroom_id]);

  const handleSSEData = (data) => {
    if (data.type === "content_chunk") {
      if (lastEmotionRef.current && lastEmotionRef.current !== data.emotion) {
        finalizeEmotion(lastEmotionRef.current);
      }
      lastEmotionRef.current = data.emotion;
      storeChunk(data.emotion, data.content, data.audio);
    } else if (data.type === "error") {
      console.error("AI Error:", data.message);
    }
  };

  const storeChunk = (emotionName, content, audioBase64) => {
    setMessages((prev) => {
      if (prev.length > 0 && prev[0].emotion === emotionName) {
        const updated = { ...prev[0], text: prev[0].text + content };
        return [updated, ...prev.slice(1)];
      } else {
        const newMsg = { emotion: emotionName, text: content, isUser: false };
        return [newMsg, ...prev];
      }
    });
    if (!emotionBuffersRef.current[emotionName]) {
      emotionBuffersRef.current[emotionName] = { text: "", audioChunks: [] };
    }
    emotionBuffersRef.current[emotionName].text += content;
    if (audioBase64) {
      emotionBuffersRef.current[emotionName].audioChunks.push(audioBase64);
    }
  };

  const finalizeEmotion = (emotionName) => {
    playQueueRef.current.push(emotionName);
    playNext();
  };

  useEffect(() => {
    if (isFetchDone && lastEmotionRef.current) {
      finalizeEmotion(lastEmotionRef.current);
      lastEmotionRef.current = null;
    }
  }, [isFetchDone]);

  const playNext = () => {
    if (isPlayingRef.current) return;
    const emotionName = playQueueRef.current.shift();
    if (!emotionName) return;
    isPlayingRef.current = true;
    const { audioChunks } = emotionBuffersRef.current[emotionName];
    playEmotionAudio(audioChunks).then(() => {
      isPlayingRef.current = false;
      playNext();
    });
  };

  const playEmotionAudio = async (audioChunks) => {
    for (const base64 of audioChunks) {
      try {
        await decodeAndScheduleAudio(base64);
      } catch {}
    }
    const audioCtx = audioContextRef.current;
    const waitTime = currentOffsetRef.current - audioCtx.currentTime;
    return new Promise((resolve) => {
      setTimeout(resolve, waitTime * 1000);
    });
  };

  const decodeAndScheduleAudio = async (base64) => {
    if (!base64 || !audioContextRef.current) return;
    const audioCtx = audioContextRef.current;
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    const audioBuffer = await audioCtx.decodeAudioData(array.buffer);
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    if (gainNodeRef.current) {
      source.connect(gainNodeRef.current);
    } else {
      source.connect(audioCtx.destination);
    }
    const startTime = Math.max(audioCtx.currentTime, currentOffsetRef.current);
    source.start(startTime);
    currentOffsetRef.current = startTime + audioBuffer.duration;
  };

  const sendMessageBasicMode = async () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      { emotion: null, text: inputText, isUser: true },
      ...prev,
    ]);
    try {
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;
      currentOffsetRef.current = 0;

      const emotionNames = emotion_choose_ids.map((id) => {
        if (id === 1) return "기쁨이";
        if (id === 2) return "슬픔이";
        if (id === 3) return "버럭이";
        if (id === 4) return "까칠이";
        if (id === 5) return "소심이";
        if (id === 6) return "불안이";
        if (id === 7) return "당황이";
        return "기쁨이";
      });

      const url = `http://localhost:8000/api/chats/${chatroom_id}/messages?user_id=${user_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emotions: emotionNames,
          prompt: inputText,
        }),
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
              } catch {}
            }
          }
        }
        buffer = lines[lines.length - 1];
      }
    } catch (error) {
      console.error("기본 모드 SSE 오류:", error);
    }
  };

  const addMessage = async () => {
    if (inputText.trim() === "") return;
    await sendMessageBasicMode();
  };

  const startDiscuss = async () => {
    try {
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;
      currentOffsetRef.current = 0;

      // --- (2) 감정 이름 매핑 ---
      const emotionNames = emotion_choose_ids.map((id) => {
        if (id === 1) return "기쁨이";
        if (id === 2) return "슬픔이";
        if (id === 3) return "버럭이";
        if (id === 4) return "까칠이";
        if (id === 5) return "소심이";
        if (id === 6) return "불안이";
        if (id === 7) return "당황이";
        return "기쁨이";
      });

      // --- (3) 논쟁모드 SSE 요청 ---
      const url = `http://localhost:8000/api/chats/${chatroom_id}/discussions?user_id=${user_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotions: emotionNames }),
      });

      if (!response.ok) {
        console.error("논쟁 모드 요청 실패");
        return;
      }

      // --- (4) SSE 스트림 수신 ---
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // SSE 끝
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

      // 필요하다면 마지막 감정 finalize ...
      // if (lastEmotionRef.current) {
      //   finalizeEmotion(lastEmotionRef.current);
      //   lastEmotionRef.current = null;
      // }
    } catch (error) {
      console.error("논쟁 모드 SSE 오류:", error);
    }
  };

  const handleChatFinishButton = () => {
    setIsModalOpen(true);
  };

  // (★) 여기서 보고서 생성 API 호출 + 로딩 표시
  const handleModalConfirm = async () => {
    setIsModalOpen(false);
    setIsLoadingReport(true);
    try {
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;
      currentOffsetRef.current = 0;
      setIsFetchDone(false);
      // 보고서 생성 API: POST /api/reports/{user_id}?chatroom_id=...
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
          console.log("리포트 생성 성공:", report_id);
          setMessages([]);
          lastEmotionRef.current = null;
          emotionBuffersRef.current = {};
          playQueueRef.current = [];
          isPlayingRef.current = false;
          currentOffsetRef.current = 0;
          // 이동
          navigate(`/reportDetail`, { state: { report_id, user_id } });
        }
      }
    } catch (error) {
      console.error("리포트 생성 중 오류:", error);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const toggleMode = () => {
    setIsActive((prev) => (prev === "messages" ? "discussions" : "messages"));
  };

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

  return (
    <>
      {isLoadingReport && <Loading text="리포트 생성 중..." />}
      <BackgroundContainer>
        <CharacterContainerWrapper>
          <CharacterContainer>
            {emotion_choose_ids.map((id) => (
              <CharacterFrame key={id}>
                <img src={emotionImageMap[id]} alt={`Emotion ${id}`} />
              </CharacterFrame>
            ))}
            <CharacterFrame>
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

        <ChatroomContaninerWrapper>
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
                  return (
                    <Message
                      key={idx}
                      $isUser={msg.isUser}
                      $borderColor={borderColor}
                      $bgColor={bgColor}
                    >
                      {msg.text}
                    </Message>
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
          ) : (
            <DiscussStartButton onClick={startDiscuss}>
              논쟁모드 시작하기
            </DiscussStartButton>
          )}
        </ChatroomContaninerWrapper>

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
          <Modal onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
        )}
      </BackgroundContainer>
    </>
  );
};

ChatRoom.propTypes = {
  audioRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default ChatRoom;
