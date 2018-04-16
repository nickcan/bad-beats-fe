import React from "react";

class InfiniteScroller extends React.Component {
  static defaultProps = {
    bottomOffset: 500,
    isLastPage: false
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      page: 0
    };
  }

  componentDidMount() {
    window.onscroll = async (ev) => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - this.props.bottomOffset) {
        if (!this.state.isLoading && !this.props.isLastPage) {
          const nextPage = this.state.page + 1;

          this.setState({
            isLoading: true
          });

          await this.props.fetchFunction(nextPage);

          this.setState({
            isLoading: false,
            page: nextPage
          });
        }
      }
    };
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    return this.props.children;
  }
}

export default InfiniteScroller;
