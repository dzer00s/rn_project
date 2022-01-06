import { sessionAPI } from '../api/api';
import {
  TOGGLE_IS_FETCHING,
} from './types';


export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  switchFetching: isFetching,
});

export const sessionThunk = (credentials) => (dispatch) => {
  const client_secret = '';
  credentials = {...credentials, client_secret}
  console.log(credentials);
  dispatch(toggleIsFetching(true));
  sessionAPI
    .setSession(credentials).then((response) => {
      console.log(response.data);
    }).catch((e) => {
      console.log(credentials);
    })
};