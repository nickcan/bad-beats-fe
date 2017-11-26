import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import glove from "../static-assets/boxing_glove.png";
import logo from "../static-assets/boxing_logo.png";
import search from "../static-assets/search_icon.png";
import UserIconActions from "./user-icon-actions";

const Header = styled.div`
  background-color: ${(props) => props.theme.charlestonGreen};
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  min-height: 58px;

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
  font-size: 18px;
  font-weight: 200;

  @media (max-width: 650px) {
    display: none;
  }
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

const BoxingGloveIcon = styled(Link)`
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

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areUserIconActionsOpen: false
    }
  }

  shouldRenderHeader() {
    return window.innerWidth < 650 && (this.props.location.pathname === "/login" || this.props.location.pathname === "/signup");
  }

  render() {
    if (this.shouldRenderHeader()) return null;

    return (
      <Header>
        <InnerContainer>
          <LogoContainerLink to="/">
            <Logo />
            <LogoName>Fantasy <br /> Bad Beats</LogoName>
          </LogoContainerLink>
          <ActionBar>
            <SearchIcon />
            <BoxingGloveIcon to="/posts/new" />
            <UserIconActions
              isOpen={this.state.areUserIconActionsOpen}
              handleToggleSettings={() => this.setState({areUserIconActionsOpen: !this.state.areUserIconActionsOpen})}
              {...this.props}
            />
          </ActionBar>
        </InnerContainer>
      </Header>
    )
  }
}

export default AppHeader;
