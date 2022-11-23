import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import PropTypes from "prop-types";

const ModalDelete = ({ children }) => {
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
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50vmin;
  height: 20vmin;
  padding: 1rem;
  border-radius: 2rem;
  background: ${COLORS.WHITE};
  opacity: 0.8;
`;

ModalDelete.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalDelete;
