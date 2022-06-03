import * as Actions from './action-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SERVICES from '../services/common-services';
import API_REQUESTS from './api-requests';
import {URLS} from './api-urls';
import moment from 'moment';
import alertService from './../services/alert.service';
import {CONSTANTS} from './mock-up';
const register = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.auth.register,
        payload,
      );
    } catch (error) {
      console.log('error:', error?.response?.data);
      throw new Error(error?.response?.data?.message || error.message);
    }
  };
};
const getOtp = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.auth.get_otp,
        payload,
      );
      return response?.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  };
};
const refreshToken = async refresh_token => {
  try {
    console.log('refresh_token::', refresh_token);
    const response = await API_REQUESTS.postFormData(URLS.auth.refresh_token, {
      refresh_token,
    });
    console.log('respppppp::::', response);
  } catch (error) {
    throw new Error(error.message);
  }
  // };
};
const signin = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postFormData(
        URLS.auth.sigin,
        payload,
      );
      console.log('res::', response?.data);
      if (response?.data?.success === 0) {
        throw response?.data?.message;
      }
      await AsyncStorage.setItem(
        '@token',
        JSON.stringify({
          refresh_token: response?.data?.refresh_token,
          access_token: response?.data?.access_token,
        }),
      );
      await AsyncStorage.setItem('@user', JSON.stringify(response?.data?.user));
      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data?.user,
      });
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const createPost = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postFormData(
        URLS.post.create,
        payload,
      );
      console.log('resp:::', response?.data);
      const home_posts = {...getState()?.state?.home_posts};
      dispatch({
        type: Actions.SET_HOME_CATEGORIES,
        payload: {
          ...home_posts,
          data: [response?.data, ...getState()?.state?.home_posts?.data],
        },
      });
      return response?.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const fetchUsers = (user_id, page = 1, search_term = '') => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.user.users}?user_id=${user_id}&page=${page}&search_term=${search_term}`,
      );
      const data = {
        pagination: response?.data?.pagination,
        data:
          page === 1
            ? response?.data?.data
            : [...getState()?.state.users?.data, ...response?.data?.data],
      };
      dispatch({
        type: Actions.SET_USERS,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
const fetchHomeCategories = () => {
  return async (dispatch, getState) => {
    try {
      // const response = await API_REQUESTS.getData(`${URLS.post?.posts}${user_id}/${page}`);
      // const data = {
      //   pagination: response?.data?.pagination,
      //   data:page===1?response?.data?.data: [...getState()?.state.home_posts?.data, ...response?.data?.data]
      // };

      dispatch({
        type: Actions.SET_HOME_CATEGORIES,
        payload: {
          data: CONSTANTS.main_categories,
          pagination: {},
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const fetchSubCategories = (parent_cat_id = 1) => {
  return async (dispatch, getState) => {
    try {
      let data = CONSTANTS?.sub_categories?.filter(
        x => x.parent_id === parent_cat_id,
      );
      console.log('data:::', data);
      dispatch({
        type: Actions.SET_CATEGORIES,
        payload: {
          data: data,
          pagination: {},
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const DIVIY_API = {
  // forumPostLikeDislike,
  // updateMessage,
  // leaveGroup,
  // deleteMessages,
  // updatePassword,
  // updatePersonalInfo,
  // fetchUsers,
  // postNewGroup,
  // joinGroup,
  // postMessage,
  // fetchMessages,
  // postComment,
  // fetchComments,
  // fetchNotifications,
  // fetchChatList,
  // fetchJoinedGroups,
  // fetchUnJoinedGroups,
  // postLikeDislike,
  // fetchForumPosts,
  // createPost,
  fetchSubCategories,
  fetchHomeCategories,
  signin,
  register,
  refreshToken,
  getOtp,
};

export default DIVIY_API;
