import styled from "styled-components";
import BackGroundPNG from "../assets/login.jpg";
import { useState } from "react";
const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
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
          bgColor="#fff"
          isModalOpen={isModalOpen}
        />
        <PasswordInput
          type="password"
          placeholder="Password"
          bgColor="#fff"
          isModalOpen={isModalOpen}
        />
        <LoginButton>GO</LoginButton>
        <SmallFrame />
        {!isModalOpen && <SignUp onClick={handleModalOpen}>+</SignUp>}
        {isModalOpen && (
          <SignUpModal>
            <SignUpLogo>SignUp</SignUpLogo>
            <UserNameInput
              type="text"
              placeholder="Username"
              bgColor="#564997"
              isModalOpen={isModalOpen}
            />
            <PasswordInput
              type="password"
              placeholder="Password"
              bgColor="#564997"
              isModalOpen={isModalOpen}
            />
            <LoginButton isModalOpen={isModalOpen} bgColor="#564997">
              GO
            </LoginButton>
            <SignUpModalCloseButton onClick={handleModalClose}>
              ×
            </SignUpModalCloseButton>
            <SmallFrameSingUp />
          </SignUpModal>
        )}
      </LoginBox>
    </Container>
  );
};

export default Login;

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
`;

const LogoBox = styled.div`
  position: relative; /* 내부 요소의 기준 컨테이너 */
  width: 400px;
  height: 50%;
`;
const My = styled.div`
  position: absolute;
  top: -10px;
  left: 55px;
  transform: rotate(-10deg);
  color: #fff;
  font-size: 120px;
  font-weight: bold;
`;

const Inside = styled.div`
  position: absolute;
  top: -3px;
  right: -7px;
  transform: rotate(15deg);
  color: #fff;
  font-size: 120px;
  font-weight: bold;
`;

const Out = styled.div`
  position: absolute;
  top: 90px;
  left: 140px;
  transform: rotate(0deg);
  color: #fff;
  font-size: 120px;
  font-weight: bold;
`;

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

const UserNameInput = styled.input`
  display: flex;
  width: 100%;
  height: 20%;
  flex-direction: column;
  justify-content: center;
  color: #000;
  background-color: ${(props) => props.bgColor || "#fff"}; /* 기본값 #fff */
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  border: none;
  line-height: normal;
  border-bottom: 2px solid
    ${(props) => (props.isModalOpen ? "#fff" : "#564997")};

  &::placeholder {
    font-size: 35px;
    font-weight: 300; /* 가벼운 글꼴 */
    font-family: "Intensa Fuente";
  }
`;

const PasswordInput = styled.input`
  display: flex;
  width: 100%;
  height: 20%;
  flex-direction: column;
  justify-content: center;
  color: #000;
  background-color: ${(props) => props.bgColor || "#fff"}; /* 기본값 #fff */
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.isModalOpen ? "#fff" : "#564997")};

  &::placeholder {
    font-size: 35px;
    font-weight: 300; /* 가벼운 글꼴 */
    font-family: "Intensa Fuente";
  }
`;

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
  background-color: #fff; /* 입력 필드 배경색 */s
  margin-top : 100px;
    border: 2px solid ${(props) => (props.isModalOpen ? "#fff" : "#564997")};
  background-color: ${(props) => props.bgColor || "#fff"}; /* 기본값 #fff */
`;

const SmallFrame = styled.div`
  width: 1%;
  height: 9.5%;
  position: absolute;
  top: 12.5%;
  left: 0%;

  background: #564997;
`;
const SmallFrameSingUp = styled.div`
  width: 1%;
  height: 9.5%;
  position: absolute;
  top: 12.5%;
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
`;
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
