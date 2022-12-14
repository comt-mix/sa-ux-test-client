import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";

const ModalCreate = ({ children }) => {
  return (
    <Background>
      <Content>{children}</Content>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${COLORS.OPACITY};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 40%;
  padding: 1rem;
  border-radius: 2rem;
  background: ${COLORS.WHITE};
  opacity: 0.8;
`;

export default ModalCreate;
