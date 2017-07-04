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
  font-family: ${(props) => props.theme.mainFont};
  font-size: 18px;
  font-weight: 200;
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

const UserSettingsContainer = styled.div`
  position: relative;
`;

const UserSettingsDropdown = styled.div`
  position: absolute;
  right: -5px;

  padding-bottom: 10px;
  margin-top: 14px;
  width: 150px;

  background-color: ${(props) => props.theme.white};
  box-shadow: 0 0 1px 0 ${(props) => props.theme.davysGray};
  border-radius: 5px;

  color: ${(props) => props.theme.davysGray};

  z-index: 1;

  &:before {
    top: -20px;
    right: 11px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(242, 242, 242, 0);
    border-bottom-color: ${(props) => props.theme.white};
    border-width: 11px;
    margin-left: -11px;
  }
`;

const SettingsOptionContainerLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.davysGray};
`;

const SettingsHeader = styled.div`
  box-sizing: border-box;

  margin-bottom: 10px;
  padding: 20px;
  width: 100%;

  border-bottom: 1px solid ${(props) => props.theme.platinum};

  cursor: pointer;
`;

const SettingsOption = styled.div`
  box-sizing: border-box;
  padding: 12px 20px;
  width: 100%;

  cursor: pointer;

  transition: background-color, color, .1.5s;

  &:hover {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
`;

const UserSettings = function({
  ...props
}) {
  if (!props.isOpen) return <UserSettingsIcon onClick={props.handleToggleSettings} />;

  return (
    <UserSettingsContainer onClick={props.handleToggleSettings}>
      <UserSettingsIcon />
      <UserSettingsDropdown>
        <SettingsOptionContainerLink to={`/users/${props.activeUser.id}`}>
          <SettingsHeader>
            {props.activeUser.name}
          </SettingsHeader>
        </SettingsOptionContainerLink>
        <SettingsOptionContainerLink to={`/posts/new`}>
          <SettingsOption>
            Create Post
          </SettingsOption>
        </SettingsOptionContainerLink>
        <SettingsOptionContainerLink to={`/users/${props.activeUser.id}/edit`}>
          <SettingsOption>
            Edit Profile
          </SettingsOption>
        </SettingsOptionContainerLink>
        <SettingsOption onClick={props.handleLogoutUser}>
          Logout
        </SettingsOption>
      </UserSettingsDropdown>
    </UserSettingsContainer>
  );
}

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areUserSettingsOpen: false
    }
  }

  render() {
    if (!localStorage.getItem("authToken")) return null;

    return (
      <Header>
        <InnerContainer>
          <LogoContainerLink to="/">
            <Logo />
            <LogoName>Fantasy <br /> Bad Beats</LogoName>
          </LogoContainerLink>
          <ActionBar>
            <SearchIcon />
            <BoxingGloveIcon />
            <UserSettings
              isOpen={this.state.areUserSettingsOpen}
              handleToggleSettings={() => this.setState({areUserSettingsOpen: !this.state.areUserSettingsOpen})}
              {...this.props}
            />
          </ActionBar>
        </InnerContainer>
      </Header>
    )
  }
}

export default AppHeader;
