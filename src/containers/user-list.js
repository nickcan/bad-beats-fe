import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";

import * as UserListActions from "../actions/user-list-actions";

import InfiniteScroller from "../components/infinite-scroller";
import UserCard from "../components/user-card";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  min-height: 400px;
  width: 100%;

  color: ${(props) => props.theme.charlestonGreen};

  @media (max-width: 650px) {
    width: 96%;
  }
`;

class ListOfUsers extends React.Component {
  constructor(props) {
    super(props);

    if (props.userId) {
      this.props.initialize(this.props.userId, this.props.listType);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId || this.props.listType !== nextProps.listType) {
      this.props.initialize(this.props.userId, nextProps.listType);
    }
  }

  async paginateFetchUsers(page) {
    await this.props.initialize(this.props.userId, this.props.listType, page);
  }

  render() {
    const usersAsArray = Object.keys(this.props.users);
    if (usersAsArray.length === 0) return null;

    return (
      <InfiniteScroller
        isLastPage={this.props.hasNoMoreUsers}
        fetchFunction={(page) => this.paginateFetchUsers(page)}
      >
        <ListContainer>
          {usersAsArray.map((userId) => {
            const user = this.props.users[userId];

            return (
              <UserCard
                activeUserId={this.props.activeUserId}
                key={user.id}
                followUserInList={this.props.followUserInList}
                {...user}
              />
            );
          })}
        </ListContainer>
      </InfiniteScroller>
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
    ...state.userList,
    activeUserId: state.activeUser.id
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfUsers);
