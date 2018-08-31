import * as api from '../../../api';
import { renameObjectKeys } from '../../../utils';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SERVICES_REQUEST = 'FETCH_SERVICES_REQUEST';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';

export const SUBMIT_FORM_REQUEST = 'SUBMIT_FORM_REQUEST';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

export const fetchServiceTypes = () => {
  return (dispatch, getState) => {
    dispatch(fetchRequest());
    return api.fetchServiceTypes()
      .then(data => processServices(data))
      .then(processed => dispatch(fetchSuccess(processed)))
      .catch(error => dispatch(fetchError(error)));
  };
};

export const postAssistanceRequest = (data) => {
  return (dispatch) => {
    dispatch(submitRequest());
    return api.postAssistanceRequest(data)
      .then(response => {
        if (response.status !== 201) {
          throw response;
        }
        return response.json();
      })
      .then(data => dispatch(submitSuccess(data)))
      .catch(err => {
        err.json().then(errorData => {
          return dispatch(submitError(errorData));
        });
      });
  };
};

export const processServices = (data) => {
  let processed;

  const keysMap = {
    display_name: 'displayName',
  };

  if (!data.data) {
    return Promise.reject(
      new Error('No data from services')
    );
  }

  processed = data.data.map((item) => {
    return renameObjectKeys(keysMap, item);
  });

  return processed;
};

export const mapFormDataToRequest = (data) => {
  const body = {
    assistance_request: {
      contact: {
        first_name: data.firstName && data.firstName.trim(),
        last_name: data.lastName && data.lastName.trim(),
        email: data.email,
      },
      service_type: data.serviceType,
      description: data.description && data.description.trim(),
    },
  };

  return body;
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

export const submitRequest = (data) => (
  {
    type: SUBMIT_FORM_REQUEST,
  }
);

export const submitSuccess = (data) => {
  return {
    type: SUBMIT_FORM_SUCCESS,
    payload: data,
  };
};

export const submitError = (error) => {
  return {
    type: SUBMIT_FORM_ERROR,
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
  }),
  [SUBMIT_FORM_REQUEST]: (state, action) => ({
    ...state,
    isSubmitting: true,
  }),
  [SUBMIT_FORM_SUCCESS]: (state, action) => ({
    ...state,
    isSubmitting: false,
    submissionData: action.payload,
    hasSubmissionError: false,
    submissionError: {},
  }),
  [SUBMIT_FORM_ERROR]: (state, action) => ({
    ...state,
    hasSubmissionError: true,
    isSubmitting: false,
    submissionError: action.error,
    submissionData: {}
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
    requestText: '',
    serviceType: '',
  },
  isFetching: false,
  isSubmitting: false,
  lastFormData: {},
  serviceTypes: [],
  hasSubmissionError: false,
};

export default function assistanceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export const selectServiceTypes = state => state.assistanceRequest.serviceTypes;
export const selectSubmissionData = state => state.assistanceRequest.submissionData;
export const selectHasSubmissionError = state => state.assistanceRequest.hasSubmissionError;
export const selectSubmissionError = state => state.assistanceRequest.submissionError;
export const selectIsSubmitting = state => state.assistanceRequest.isSubmitting;
