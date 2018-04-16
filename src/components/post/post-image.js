import LazyLoad from "react-lazyload";
import React from "react";
import styled from "styled-components";

import Loader from "../loader";

const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.isLoading ? props.theme.charlestonGreen : "inherit"};
  min-height: 300px;

  img {
    width: 100%;
    height: 100%;
    display: ${(props) => props.isLoading ? "none" : "block"};
  }

  @media (max-width: 600px) {
    min-height: 160px;
  }
`;

class PostImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    if (!this.props.image || !this.props.image.url) return null;

    return (
      <ImageContainer isLoading={this.state.isLoading}>
        <Loader isLoading={this.state.isLoading} />
        <LazyLoad height={300} offset={400}>
          <img
            src={this.props.image.url} alt=""
            onLoad={() => this.setState({isLoading: false})}
          />
        </LazyLoad>
      </ImageContainer>
    );
  }
}

export default PostImage;
