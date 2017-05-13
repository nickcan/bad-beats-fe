import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 0;

  border-bottom: 1px solid gray;
`;

const ProfileImage = styled.div`
  height: 50px;
  width: 50px;

  background: gray;
  border-radius: 2px;
`;

const Name = styled.div`
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  margin-left: 10px;
`;

class ListOfUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  render() {
    return (
      <ListContainer>
        {this.state.users.forEach((user) => {
          return (
            <UserContainer key={user.id}>
              <ProfileImage />
              <Name>{user.name}</Name>
            </UserContainer>
          );
        })}
      </ListContainer>
    );
  }
}

export default ListOfUsers;
