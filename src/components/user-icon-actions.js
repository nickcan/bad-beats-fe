import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

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

const LoginHeader = styled(SettingsHeader)`
  padding: 10px;
  margin-top: 8px;
  margin-bottom: 0;

  border-bottom: 0;
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

const UserIconActions = function({
  ...props
}) {
  if (!props.isOpen) return <UserSettingsIcon onClick={props.handleToggleSettings} />;

  if (props.activeUser.id) {
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
  } else {
    return (
      <UserSettingsContainer onClick={props.handleToggleSettings}>
        <UserSettingsIcon />
        <UserSettingsDropdown>
          <SettingsOptionContainerLink to={`/login`}>
            <LoginHeader>Login</LoginHeader>
          </SettingsOptionContainerLink>
        </UserSettingsDropdown>
      </UserSettingsContainer>
    );
  }
}

export default UserIconActions;
