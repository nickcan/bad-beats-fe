import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import glove from "../static-assets/boxing_glove.png";
import logo from "../static-assets/boxing_logo.png";
import search from "../static-assets/search_icon.png";

const Header = styled.div`
  background-color: ${(props) => props.theme.charlestonGreen};
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  min-height: 66px;

  @media (max-width: 1000px) {
    padding: 0 20px;
  }

  @media (max-width: 500px) {
    padding: 0 3%;
  }
`;

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 1000px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Logo = styled.div`
  background: url(${logo}) no-repeat center center;
  background-size: 100% 100%;
  height: 42px;
  margin-right: 8px;
  width: 42px;
`;

const LogoContainerLink = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
`;

const LogoName = styled.div`
  color: ${(props) => props.theme.babyPowder};
  font-family: ${(props) => props.theme.mainFont};
  font-size: 20px;
  font-weight: 300;
`;

const ActionBar = styled.div`
  align-items: center;
  display: flex;
`;

const SearchIcon = styled.div`
  background: url(${search}) no-repeat center center;
  background-size: 100% 100%;
  content: " ";
  cursor: pointer;
  margin-right: 18px;
  height: 35px;
  width: 35px;

  @media (max-width: 500px) {
    margin-right: 10px;
  }
`;

const BoxingGloveIcon = styled.div`
  background: url(${glove}) no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
  height: 35px;
  margin-right: 28px;
  width: 35px;

  @media (max-width: 500px) {
    margin-right: 18px;
  }
`;

const UserSettingsIcon = styled.div`
  background-color: ${(props) => props.theme.babyPowder};
  border: 2px solid white;
  cursor: pointer;
  border-radius: 20%;
  height: 30px;
  width: 30px;
`;

class AppHeader extends React.Component {
  render() {
    if (!localStorage.getItem("authToken")) return null;

    return (
      <Header>
        <InnerContainer>
          <LogoContainerLink to="/">
            <Logo></Logo>
            <LogoName>Fantasy <br /> Bad Beats</LogoName>
          </LogoContainerLink>
          <ActionBar>
            <SearchIcon />
            <BoxingGloveIcon />
            <UserSettingsIcon onClick={this.props.handleLogoutUser} />
          </ActionBar>
        </InnerContainer>
      </Header>
    )
  }
}

export default AppHeader;
