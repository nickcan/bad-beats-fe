import { Link } from "react-router-dom";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const UserInfoContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled(Link)`
  display: flex;
  content: '';
  background-color: ${(props) => props.theme.platinum};
  border-radius: 2px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
`;

const UsernameLink = styled(Link)`
  color: ${(props) => props.theme.blue}
  font-size: 18px;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: ${(props) => props.theme.ashGray};
  margin-top: 3px;
  font-size: 12px;
`;

const SportLink = styled(Link)`
  color: ${(props) => props.theme.ashGray};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.blue};
    transition: color, .3s;
  }
`;

class PostHeader extends React.Component {
  render() {
    const formattedPostDate = moment(this.props.createdAt).format("MMMM Do, h:mm a");

    return (
      <HeaderContainer>
        <UserInfoContainer>
          <ProfileImage to={`/users/${this.props.user.id}`} />
          <div>
            <UsernameLink to={`/users/${this.props.user.id}`}>{this.props.user.name}</UsernameLink>
            <PostDate>{formattedPostDate}</PostDate>
          </div>
        </UserInfoContainer>
        <SportLink to={`/sports/${this.props.sport}`}>{this.props.sport}</SportLink>
      </HeaderContainer>
    );
  }
}

export default PostHeader;

