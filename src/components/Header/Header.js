import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import axios from "axios";
import { DOMAIN } from "../../config/domain";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";

const Header = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("name");

  let userName = "";

  if (user) {
    userName = user.replace(/"/g, "");
  }

  const handleLogin = async () => {
    if (userName) {
      return;
    }

    try {
      const signInUser = await signInWithPopup(auth, provider);
      const { user } = signInUser;
      const idToken = await user.getIdToken();

      const response = await axios.post(
        `${DOMAIN}/auth/login`,
        {
          name: user.displayName,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      localStorage.setItem("name", JSON.stringify(response.data.user.name));
      localStorage.setItem("id", JSON.stringify(response.data.user._id));

      navigate("/projects");
    } catch (error) {
      throw new Error("Error");
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/");
    navigate(0);
  };

  return (
    <Wrapper>
      <HeaderImg src="/images/sa.png" alt="logo" />
      <h2>SA-UX-TEST</h2>
      <HeaderButton>
        <LoginButton onClick={handleLogin}>
          {userName ? userName : "로그인"}
        </LoginButton>
        {userName && (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        )}
      </HeaderButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.4rem;
  padding: 0.5rem;
  border-bottom: 0.1rem solid ${COLORS.LIGHT_GRAY};

  h2 {
    margin-left: 4rem;
  }
`;

const HeaderImg = styled.img`
  width: 80px;
  height: 60px;
`;

const HeaderButton = styled.div`
  display: flex;
`;

const LoginButton = styled.button`
  margin-right: 1rem;
  border-style: none;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
`;

const LogoutButton = styled.button`
  border-style: none;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
`;

export default Header;
