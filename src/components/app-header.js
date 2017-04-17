import React from "react";
import styled from "styled-components";

import glove from "../static-assets/boxing_glove.png";
import logo from "../static-assets/boxing_logo.png";
import search from "../static-assets/search_icon.png";

import UniversalStyles from "../universal-styles";

const Header = styled.div`
  background-color: ${UniversalStyles.colors.mediumGray};
  display: flex;
  justify-content: center;
  left: 0;
  min-height: 66px;
  top: 0;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const InnerContainer = styled.div`
  align-items: center;
  background-color: ${UniversalStyles.colors.mediumGray};
  display: flex;
  justify-content: space-between;
  width: 900px;

  @media (max-width: 900px) {
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

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
`;

const LogoName = styled.div`
  color: ${UniversalStyles.colors.charcoal};
  font-family: helvetica;
  font-size: 20px;
  font-weight: 300;
`;

const ActionBar = styled.div`
  align-items: center;
  display: flex;
`;

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  margin-right: 6px;
`;

const SearchInput = styled.input`
  background-color: ${UniversalStyles.colors.white};
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 0 ${(props) => props.isSearchFocused ? "4px" : "2px"} ${UniversalStyles.colors.charcoal};
  height: 30px;
  outline: none;
  padding-left: 24px;
  transition: box-shadow, opacity, width, .4s;
  width: ${(props) => props.isSearchFocused ? "200px" : "0"};
  opacity: ${(props) => props.isSearchFocused ? 1 : 0};
`;

const SearchIcon = styled.div`
  background: url(${search}) no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
  height: ${(props) => props.isSearchFocused ? "18px" : "35px"};
  position: absolute;
  right: ${(props) => props.isSearchFocused ? "203px" : "-3px"};
  transition: height, right, width, .4s;
  width: ${(props) => props.isSearchFocused ? "18px" : "35px"};;
`;

const BoxingGloveIcon = styled.div`
  background: url(${glove}) no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
  height: 35px;
  margin-right: 14px;
  width: 35px;
`;

const UserSettingsIcon = styled.div`
  background-color: ${UniversalStyles.colors.lightGray}
  border: 2px solid white;
  cursor: pointer;
  border-radius: 20%;
  height: 30px;
  width: 30px;

  &:hover {
    background-color: ${UniversalStyles.colors.charcoal}
    transition: background-color, .5s;
  }
`;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchFocused: false
    };
  }

  enableSearch() {
    this.setState({isSearchFocused: true});
    this.searchBar.focus();
  }

  render() {
    return (
      <Header>
        <InnerContainer>
          <LogoContainer>
            <Logo></Logo>
            <LogoName>Fantasy <br /> Bad Beats</LogoName>
          </LogoContainer>
          <ActionBar>
            <SearchContainer>
              <SearchInput
                isSearchFocused={this.state.isSearchFocused}
                innerRef={(input) => this.searchBar = input}
                onBlur={() => this.setState({isSearchFocused: false})}
              />
              <SearchIcon onClick={() => this.enableSearch()} isSearchFocused={this.state.isSearchFocused} />
            </SearchContainer>
            <BoxingGloveIcon />
            <UserSettingsIcon />
          </ActionBar>
        </InnerContainer>
      </Header>
    )
  }
}

export default AppHeader;
