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
  당황이: { titleColor: "#CD3364", summaryColor: "#DB4A7B" },
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

/* 메시지 한 줄 (아바타 + 말풍선) 컨테이너 */
const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "row")};
`;

/* 아바타(감정 이미지) 영역 */
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: contain;
  margin: ${({ $isUser }) => ($isUser ? "0 0 0 10px" : "0 10px 0 0")};
`;

/* 말풍선(채팅 버블) */
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

  const location = useLocation();
  const navigate = useNavigate();
  const { user_id, chatroom_id, emotion_choose_ids } = location.state || {};
  const chatContainerRef = useRef(null);

  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const currentOffsetRef = useRef(0);
  const [isDiscussModalOpen, setIsDiscussModalOpen] = useState(false);
  /* 감정별 버퍼, ex: { "기쁨이": { text:"...", audioChunks:[...]} } */
  const emotionBuffersRef = useRef({});

  /* 마지막으로 SSE가 말한 감정 */
  const lastEmotionRef = useRef(null);

  /* 재생 순서 (queue)에 감정을 push */
  const playQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  const [isFetchDone, setIsFetchDone] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

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

  // SSE ping
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8000/api/chats/sse/${chatroom_id}`
    );
    eventSource.onmessage = () => {
      // ping
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [chatroom_id]);

  /* SSE 데이터 처리 */
  const handleSSEData = (data) => {
    if (data.type === "content_chunk") {
      /* 이전 감정이랑 다르면 finalize -> queue에 쌓고, 새 감정 시작 */
      if (lastEmotionRef.current && lastEmotionRef.current !== data.emotion) {
        finalizeEmotion(lastEmotionRef.current);
      }
      lastEmotionRef.current = data.emotion;

      storeChunk(data.emotion, data.content, data.audio);
    } else if (data.type === "error") {
      console.error("AI Error:", data.message);
    }
  };

  /* 감정별 audio chunk 쌓기 */
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

  /* 하나의 감정이 끝날 때 -> queue에 추가, playNext */
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

  /* queue에서 감정 꺼내 재생 */
  const playNext = () => {
    if (isPlayingRef.current) return;

    const emotionName = playQueueRef.current.shift();
    if (!emotionName) return;

    isPlayingRef.current = true;
    const { audioChunks } = emotionBuffersRef.current[emotionName];

    playEmotionAudio(audioChunks).then(() => {
      // 재생 끝
      // 해당 감정 버퍼는 소진
      emotionBuffersRef.current[emotionName] = { text: "", audioChunks: [] };
      isPlayingRef.current = false;
      // 다음이 있으면 playNext
      playNext();
    });
  };

  /* 감정 오디오 chunks를 gapless 재생 */
  const playEmotionAudio = async (audioChunks) => {
    for (const base64 of audioChunks) {
      await decodeAndScheduleAudio(base64);
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

  /* 메시지 전송(기본 모드) */
  const sendMessageBasicMode = async () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      { emotion: null, text: inputText, isUser: true },
      ...prev,
    ]);
    try {
      // 오디오 상태 초기화
      lastEmotionRef.current = null;
      emotionBuffersRef.current = {};
      playQueueRef.current = [];
      isPlayingRef.current = false;
      currentOffsetRef.current = 0;

      // 유저가 고른 감정(숫자 IDs) -> 한글 감정 배열
      const emotionNames = emotion_choose_ids.map((id) => {
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
      });

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
              } catch {}
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

  /* 대화 끝내기 -> 보고서 생성 */
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
      currentOffsetRef.current = 0;
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
          currentOffsetRef.current = 0;
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
      currentOffsetRef.current = 0;
      setIsFetchDone(false);

      const emotionNames = emotion_choose_ids.map((id) => {
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
      });

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
          <Modal
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
            context="정말 대화를 끝내시겠습니까?"
          />
        )}
      </BackgroundContainer>

      {/* 논쟁 모드 모달 추가 */}
      {isDiscussModalOpen && (
        <Modal
          onConfirm={handleDiscussModalConfirm}
          onCancel={handleDiscussModalCancel}
          context="논쟁모드를 시작하시겠습니까?"
        ></Modal>
      )}
    </>
  );
}

ChatRoom.propTypes = {
  audioRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default ChatRoom;
