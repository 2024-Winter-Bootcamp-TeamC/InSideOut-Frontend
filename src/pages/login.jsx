import styled, { keyframes, css } from "styled-components";
import BackGroundPNG from "../assets/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarrySky from "../component/StarrySky";

// 로그인 컴포넌트
const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 모달 열기
  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsModalClosing(false);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 500);
  };

  // 회원가입 요청
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://api.myinsideout.world/api/users/signup",
        {
          nickname,
          password,
        }
      );

      if (response.status === 200) {
        alert("회원가입 성공!");
        setNickname("");
        setPassword("");
        handleModalClose();
      } else {
        alert("회원가입 실패!");
      }
    } catch {
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 로그인 요청
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api.myinsideout.world/api/users/login",
        {
          nickname,
          password,
        }
      );

      if (response.status === 200) {
        const { user_id } = response.data;
        alert("로그인 성공!");
        navigate("/category", { state: { user_id } });
      } else {
        alert("로그인 실패!");
      }
    } catch {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <StarrySky />
      <LogoBox>
        <My>My</My>
        <Inside>Inside</Inside>
        <Out>Out</Out>
      </LogoBox>
      <LoginBox>
        <MiddleFrame />
        <LoginLogo>Login</LoginLogo>
        <UserNameInput
          type="text"
          placeholder="Username"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          bgColor="#fff"
          isModalOpen={isModalOpen}
        />
        <PasswordInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          bgColor="#fff"
          isModalOpen={isModalOpen}
        />
        <LoginButton onClick={handleLogin}>GO</LoginButton>
        <SmallFrame />
        {!isModalOpen && <SignUp onClick={handleModalOpen}>+</SignUp>}
        {isModalOpen && (
          <SignUpModal isClosing={isModalClosing}>
            <SignUpLogo>SignUp</SignUpLogo>
            <UserNameInput
              type="text"
              placeholder="Username"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              bgColor="#564997"
              isModalOpen={isModalOpen}
            />
            <PasswordInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bgColor="#564997"
              isModalOpen={isModalOpen}
            />
            <LoginButton
              onClick={handleSignUp}
              isModalOpen={isModalOpen}
              bgColor="#FFFFFF"
            >
              OK
            </LoginButton>
            <SignUpModalCloseButton onClick={handleModalClose}>
              ×
            </SignUpModalCloseButton>
            <SmallFrameSignUp />
          </SignUpModal>
        )}
      </LoginBox>
    </Container>
  );
};

export default Login;

// 배경 및 전체 레이아웃 설정
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BackGroundPNG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 3% 5%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

// 로고 박스
const LogoBox = styled.div`
  position: relative;
  width: 400px;
  height: 50%;
`;

// 바운스 애니메이션
const bounceAnimationMy = keyframes`
  0%, 100% {
    transform: rotate(-10deg) translateY(0);
  }
  50% {
    transform: rotate(-10deg) translateY(-15px);
  }
`;

const bounceAnimationInside = keyframes`
  0%, 100% {
    transform: rotate(15deg) translateY(0);
  }
  50% {
    transform: rotate(15deg) translateY(-15px);
  }
`;

const bounceAnimationOut = keyframes`
  0%, 100% {
    transform: rotate(0deg) translateY(0);
  }
  50% {
    transform: rotate(0deg) translateY(-15px);
  }
`;

// 로고 텍스트
const My = styled.div`
  position: absolute;
  top: -10px;
  left: 55px;
  transform: rotate(-10deg);
  color: #fff;
  font-size: 120px;
  font-weight: bold;
  animation: ${bounceAnimationMy} 1.5s ease-in-out infinite;
  animation-delay: 0s;
`;

const Inside = styled.div`
  position: absolute;
  top: -3px;
  right: -7px;
  transform: rotate(15deg);
  color: #fff;
  font-size: 120px;
  font-weight: bold;
  animation: ${bounceAnimationInside} 1.5s ease-in-out infinite;
  animation-delay: 0.2s;
`;

const Out = styled.div`
  position: absolute;
  top: 90px;
  left: 140px;
  transform: rotate(0deg);
  color: #fff;
  font-size: 120px;
  font-weight: bold;
  animation: ${bounceAnimationOut} 1.5s ease-in-out infinite;
  animation-delay: 0.4s;
`;

// 로그인 박스
const LoginBox = styled.div`
  display: flex;
  width: 470px;
  height: 400px;
  padding: 60px 50px 60px 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12%;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  position: relative;
`;
const LoginLogo = styled.div`
  width: 100%;
  flex-shrink: 0;
  color: #564997;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const SignUpLogo = styled.div`
  width: 100%;
  flex-shrink: 0;
  color: #fff;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 입력 필드
const UserNameInput = styled.input`
  display: flex;
  width: 100%;
  height: 20%;
  flex-direction: column;
  justify-content: center;
  color: #000;
  background-color: ${(props) => props.bgColor || "#fff"};
  font-size: 35px;
  font-family: "IntensaFuente", sans-serif;
  font-weight: 400;
  border: none;
  line-height: normal;
  border-bottom: 2px solid
    ${(props) => (props.isModalOpen ? "#fff" : "#564997")};

  &::placeholder {
    font-size: 35px;
    font-weight: 300;
    font-family: "IntensaFuente";
  }
`;

const PasswordInput = styled.input`
  display: flex;
  width: 100%;
  height: 20%;
  flex-direction: column;
  justify-content: center;
  color: #000;
  background-color: ${(props) => props.bgColor || "#fff"};
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.isModalOpen ? "#fff" : "#564997")};

  &::placeholder {
    font-size: 35px;
    font-weight: 300;
    font-family: "IntensaFuente";
  }
`;

// 로그인 버튼
const LoginButton = styled.button`
  width: 35%;
  padding: 2%;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 2px solid #564997;
  background-color: #fff;
  border: 2px solid ${(props) => (props.isModalOpen ? "#fff" : "#564997")};
  background-color: ${(props) => props.bgColor || "#fff"};
  transition: transform 0.3s ease;
  outline: none;
  box-shadow: none;

  &:hover {
    transform: scale(1.05);
    z-index: 3;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SmallFrame = styled.div`
  width: 1%;
  height: 9.5%;
  position: absolute;
  top: 12.5%;
  left: 0%;

  background: #564997;
`;
const SmallFrameSignUp = styled.div`
  width: 1%;
  height: 10%;
  position: absolute;
  top: 14%;
  left: 0%;
  z-index: 1;
  background: #fff;
`;
const MiddleFrame = styled.div`
  width: 90%;
  height: 2%;
  position: absolute;
  top: -2%;
  right: 5%;

  background: rgba(255, 255, 255, 0.6);
`;

// 회원가입 버튼
const SignUp = styled.button`
  width: 22%;
  height: 25%;
  position: absolute;
  border-radius: 100%;
  background: #564997;

  color: #fff;
  font-size: 40px;
  font-weight: 400;
  font-family: "";
  right: -11%;
  top: 10%;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  outline: none;
  box-shadow: none;

  &:hover {
    transform: scale(1.05);
    z-index: 3;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 회원가입 모달
const SignUpModal = styled.div`
  display: flex;
  position: absolute;
  top: 2%;
  left: -5%;
  width: 110%;
  height: 110%;
  padding: 60px 50px 40px 50px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #564997;
  font-size: 40px;
  font-weight: 400;
  z-index: 1;
  animation: ${(props) =>
    props.isClosing
      ? css`
          ${modalCloseAnimation} 0.5s forwards
        `
      : css`
          ${modalOpenAnimation} 0.5s forwards
        `};
`;
const SignUpModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #564997;
  background-color: #fff;
  font-size: 10 px;
  font-weight: 900;
  font-family: "";
  line-height: 100%;
  border-radius: 100%;
  width: 10px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 열릴 때 애니메이션
const modalOpenAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// 모달 닫힐 때 애니메이션
const modalCloseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  40% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;
