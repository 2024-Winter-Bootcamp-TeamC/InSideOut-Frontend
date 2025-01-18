import styled from "styled-components";
import PropTypes from "prop-types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 25rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const ModalButton = styled.button`
  background-color: ${({ isCancel }) => (isCancel ? "#ccc" : "#f44336")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Modal = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <p>정말 대화를 끝내겠습니까?</p>
        <ModalButton onClick={onConfirm}>확인</ModalButton>
        <ModalButton isCancel onClick={onCancel}>
          취소
        </ModalButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Modal;
