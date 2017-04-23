import React from "react";
import styled from "styled-components";

const VotesContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.mediumGray};
  padding: 15px;
`;

const VoteIcon = styled.div`
  background-color: ${(props) => props.currentUserHasVoted ? props.theme.charcoal : props.theme.mediumGray};
  border-radius: 50%;
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin-right: 8px;
`;

const VoteCount = styled.div`
  color: ${(props) => props.theme.mediumGray};
  font-size: 12px;
  padding-top: 2px;
`;

class Votes extends React.Component {
  determineCountText() {
    if (this.props.voteCount > 0) {
      return `${this.props.voteCount} Bad Beats`;
    }
  }
  render() {
    return (
      <VotesContainer>
        <VoteIcon
          currentUserHasVoted={this.props.currentUserHasVoted}
          onClick={this.props.handleClick}
        />
        <VoteCount>{this.determineCountText()}</VoteCount>
      </VotesContainer>
    );
  }
}

export default Votes;
