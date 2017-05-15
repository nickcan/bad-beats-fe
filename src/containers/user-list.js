import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";

import * as UserListActions from "../actions/user-list-actions";

import UserCard from "../components/user-card";

const ListContainer = styled.div`
  min-height: 400px;
  width: 100%;

  color: ${(props) => props.theme.charlestonGreen};
`;

class ListOfUsers extends React.Component {
  constructor(props) {
    super(props);

    if (props.userId) {
      this.props.initialize(this.props.userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.props.initialize(this.props.userId);
    }
  }

  render() {
    const usersAsArray = Object.keys(this.props.users);
    if (usersAsArray.length === 0) return null;

    return (
      <ListContainer>
        {usersAsArray.map((userId) => {
          const user = this.props.users[userId];

          return (
            <UserCard
              key={user.id}
              followUserInList={this.props.followUserInList}
              {...user}
            />
          );
        })}
      </ListContainer>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(UserListActions, dispatch)
  }
}

const mapStateToProps = function(state) {
  return {
    users: state.userList.users
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfUsers);
