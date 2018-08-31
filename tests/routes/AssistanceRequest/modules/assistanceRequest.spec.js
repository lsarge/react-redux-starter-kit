import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  fetchServiceTypes,
  postAssistanceRequest,
  default as assistanceReducer
} from 'routes/AssistanceRequest/modules/assistanceRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('(Redux Module) AssistanceRequest', () => {
  describe('(Action Creator) doubleAsync', () => {
    let _globalState;
    let _dispatchSpy;

    beforeEach(() => {
      _globalState = {
        assistanceRequest : assistanceReducer(undefined, {})
      };
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          assistanceRequest : assistanceReducer(_globalState.assistanceRequest, action)
        };
      });
    });

    it('Should be exported as a function.', () => {
      expect(fetchServiceTypes).to.be.a('function');
    });

    it('Should return a function (is a thunk).', () => {
      expect(fetchServiceTypes()).to.be.a('function');
    });

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return fetchServiceTypes()(_dispatchSpy).should.eventually.be.fulfilled;
    });

    it('Should call dispatch twice, for request and failure.', () => {
      return fetchServiceTypes()(_dispatchSpy)
        .then(() => {
          _dispatchSpy.should.have.been.called(2);
        });
    });
  });
});

describe('fetchServiceTypes async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_SERVICES_SUCCESS', () => {
    const store = mockStore();
    fetchMock.getOnce('http://localhost:49567/api/service-types', {
      data: [
        {
          display_name: 'foo',
          id: 'bar',
        }
      ],
    });

    const expectedActions = [
      {
        type: FETCH_SERVICES_REQUEST
      },
      {
        type: FETCH_SERVICES_SUCCESS,
        payload: [
          {
            displayName: 'foo',
            id: 'bar',
          }
        ]
      }
    ];

    return store.dispatch(fetchServiceTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('creates FETCH_SERVICES_ERROR', () => {
    const store = mockStore();
    fetchMock.getOnce('http://localhost:49567/api/service-types', {
      status: 401,
      body: new Error()
    });

    const expectedActions = [
      {
        type: FETCH_SERVICES_REQUEST
      },
      {
        type: FETCH_SERVICES_ERROR,
        error: new Error()
      }
    ];

    return store.dispatch(fetchServiceTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});

describe('postAssistanceRequest async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates SUBMIT_FORM_SUCCESS', () => {
    const store = mockStore();
    const responseBody = {
      echo: {
        assistance_request: {
          service_type: 'benefits',
          description: 'The friend in my adversity I shall always cherish \
          most. I can better trust those who have helped to relieve the \
          gloom of my dark hours than those who are so ready to enjoy with \
          me the sunshine of my prosperity.',
          contact: {
            first_name: 'Ulysses',
            last_name: 'Grant',
            email: 'ulysses@union.mil'
          }
        }
      },
      message: 'Your assistance request has been successfully submitted.'
    };

    fetchMock.postOnce('http://localhost:49567/api/assistance-requests', {
      status: 201,
      body: responseBody,
    });

    const expectedActions = [
      {
        type: SUBMIT_FORM_REQUEST
      },
      {
        type: SUBMIT_FORM_SUCCESS,
        payload: responseBody,
      }
    ];

    return store.dispatch(postAssistanceRequest()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});

describe('assistanceReducer', () => {
  it('handles FETCH_SERVICES_REQUEST', () => {
    expect(
      assistanceReducer(
        {},
        {
          type: FETCH_SERVICES_REQUEST,
        }
      )
    ).to.deep.equal({
      isFetching: true,
    });
  });

  it('handles FETCH_SERVICES_SUCCESS', () => {
    expect(
      assistanceReducer(
        {},
        {
          type: FETCH_SERVICES_SUCCESS,
          payload: [{ id: 'a', displayName: 'b' }]
        }
      )
    ).to.deep.equal({
      isFetching: false,
      serviceTypes: [{ id: 'a', displayName: 'b' }]
    });
  });

  it('handles FETCH_SERVICES_ERROR', () => {
    expect(
      assistanceReducer(
        {},
        {
          type: FETCH_SERVICES_ERROR,
          error: 'some error'
        }
      )
    ).to.deep.equal({
      error: 'some error'
    });
  });

  it('handles SUBMIT_FORM_REQUEST', () => {
    expect(
      assistanceReducer(
        {},
        {
          type: SUBMIT_FORM_REQUEST,
        }
      )
    ).to.deep.equal({
      isSubmitting: true,
    });
  });

  it('handles SUBMIT_FORM_SUCCESS', () => {
    expect(
      assistanceReducer(
        {},
        {
          type: SUBMIT_FORM_SUCCESS,
          payload: { data: 'some data' }
        }
      )
    ).to.deep.equal({
      isSubmitting: false,
      hasSubmissionError: false,
      submissionError: {},
      submissionData: { data: 'some data' },
    });
  });

  it('handles SUBMIT_FORM_ERROR', () => {
    expect(
      assistanceReducer(
        {},
        {
          type: SUBMIT_FORM_ERROR,
          error: 'some error'
        }
      )
    ).to.deep.equal({
      hasSubmissionError: true,
      isSubmitting: false,
      submissionError: 'some error',
      submissionData: {}
    });
  });
});
