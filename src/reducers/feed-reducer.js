import { filter } from "lodash";

const initialState = {
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
            comments: [...post.comments, action.payload]
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
            comments: filter(post.comments, (comment) => comment.id !== action.payload.id)
          }
        }
      }
    }

    case "INITIALIZE_POSTS": {
      return {
        ...state,
        posts: {...state.posts, ...createPostsObject(action.payload)}
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

