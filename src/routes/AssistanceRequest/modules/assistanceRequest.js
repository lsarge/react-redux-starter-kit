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

export const FORM_SUBMISSION_REQUEST = 'FORM_SUBMISSION_REQUEST';
export const FORM_SUBMISSION_SUCCESS = 'FORM_SUBMISSION_SUCCESS';
export const FORM_SUBMISSION_ERROR = 'FORM_SUBMISSION_SUCCESS';
// ------------------------------------
// Actions
// ------------------------------------

export const fetchServiceTypes = () => {
  return (dispatch, getState) => {
    dispatch(fetchRequest());
    api.fetchServiceTypes()
      .then(response => normalize(response))
      .then(data => dispatch(fetchSuccess(data)))
      .catch(error => dispatch(fetchError(error)));
  };
};

export const postAssistanceRequest = (data)  => {
  console.log('data', data);
  debugger;
  return (dispatch) => {
    dispatch(submitRequest());
    api.postAssistanceRequest(data)
  }
}

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

// ------------------------------------
// service type requests
// ------------------------------------
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


// ------------------------------------
// form submission
// ------------------------------------

export const submitRequest = () => (
  {
    type: FORM_SUBMISSION_REQUEST
  }
)

export const submitSuccess = (response) => {
  return {
    type: FORM_SUBMISSION_SUCCESS,
    payload: response,
  };
}

export const submitError = (error) => {
  return {
    type: FORM_SUBMISSION_ERROR,
    error,
  };
};


export const actions = {
  fetchServiceTypes,
  postAssistanceRequest,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SERVICES_REQUEST]: (state, action) => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_SERVICES_SUCCESS]: (state, action) => ({
    ...state,
    serviceTypes: action.payload,
    isFetching: false,
  }),
  [FETCH_SERVICES_ERROR]: (state, action) => ({
    ...state,
    error: action.error
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  request: {
    firstName: '',
    lastName: '',
    email: '',
    body: '',
    serviceType: '',
  },
  isFetching: false,
  serviceTypes: [],
};
export default function assistanceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export const selectRequest = state => state.assistanceRequest.request;
export const selectServiceTypes = state => state.assistanceRequest.serviceTypes;
