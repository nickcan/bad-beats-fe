import { filter } from "lodash";

const initialState = {
  hasNoMorePosts: false,
  posts: {}
};

const createPostsObject = function(postsArray = [], postsObject = {}, currentIndex = 0) {
  if (currentIndex >= postsArray.length) {
    return postsObject;
  } else {
    const nextPost = postsArray[currentIndex];
    const appendedObject = {
      ...postsObject,
      [nextPost.id]: nextPost
    };

    return createPostsObject(postsArray, appendedObject, currentIndex + 1);
  }
};

const feed = function(state = initialState, action) {
  switch(action.type) {
    case "ADD_COMMENT": {
      const post = state.posts[action.payload.postId];

      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...post,
            commentCount: post.commentCount + 1,
            comments: [...post.comments, action.payload]
          }
        }
      }
    }

    case "APPEND_COMMENTS": {
      const post = state.posts[action.payload.postId];
      const comments = post.comments.length === 5 ? action.payload.comments : [...post.comments, ...action.payload.comments];


      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...post,
            comments
          }
        }
      }
    }

    case "REMOVE_COMMENT": {
      const post = state.posts[action.payload.postId];

      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...post,
            commentCount: post.commentCount - 1,
            comments: filter(post.comments, (comment) => comment.id !== action.payload.id)
          }
        }
      }
    }

    case "RESET_FEED": {
      return initialState;
    }

    case "INITIALIZE_POSTS": {
      return {
        ...initialState,
        posts: createPostsObject(action.payload)
      };
    }

    case "APPEND_POSTS": {
      return {
        ...state,
        hasNoMorePosts: action.payload.length === 0,
        posts: {
          ...state.posts,
          ...createPostsObject(action.payload)
        }
      };
    }

    case "UPDATE_COMMENT": {
      const post = state.posts[action.payload.postId];

      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...post,
            comments: post.comments.map(function(comment) {
              if (comment.id === action.payload.id) {
                return action.payload;
              } else {
                return comment;
              }
            })
          }
        }
      }
    }

    case "UPDATE_POST": {
      const post = action.payload;

      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            ...post,
            comments: [...state.posts[action.payload.id].comments]
          }
        }
      }
    }

    default: {
      return state;
    }
  }
}

export default feed;
