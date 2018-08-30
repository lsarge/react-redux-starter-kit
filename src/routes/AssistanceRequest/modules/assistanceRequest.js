import * as api from '../../../api';
import { renameObjectKeys } from '../../../utils';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC';
export const FETCH_SERVICES_REQUEST = 'FETCH_SERVICES_REQUEST';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().assistanceRequest
        });
        resolve();
      }, 200);
    });
  };
};

export const fetchServiceTypes = () => {
  return (dispatch, getState) => {
    dispatch(fetchRequest());
    api.fetchServiceTypes()
      .then(response => normalize(response))
      .then(data => dispatch(fetchSuccess(data)))
      .catch(error => dispatch(fetchError(error)));
  };
};

export const normalize = (response) => {
  const data = response.data;

  let normalized;

  const keysMap = {
    display_name: 'displayName',
  };

  if (!data.data) {
    return Promise.reject(
      new Error('No data from services')
    );
  }

  normalized = data.data.map((item) => {
    return renameObjectKeys(keysMap, item);
  });

  return normalized;
};

export const fetchRequest = () => (
  {
    type: FETCH_SERVICES_REQUEST,
  }
);

export const fetchSuccess = (response) => {
  return {
    type: FETCH_SERVICES_SUCCESS,
    payload: response,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_SERVICES_ERROR,
    error,
  };
};

export const actions = {
  fetchServiceTypes,
  increment,
  doubleAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [FETCH_SERVICES_SUCCESS]: (state, action) => {
    return { ...state, serviceTypes: action.payload };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function assistanceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export const selectServiceTypes = state => state.assistanceRequest.serviceTypes;
