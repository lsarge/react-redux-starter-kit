import { injectReducer } from '../../store/reducers';

export default (store) => ({
  // path : 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AssistanceRequest = require('./containers/AssistanceRequestContainer').default;
      const reducer = require('./modules/assistanceRequest').default;

      /*  Add the reducer to the store on key 'assistanceRequest'  */
      injectReducer(store, { key: 'assistanceRequest', reducer });

      /*  Return getComponent   */
      cb(null, AssistanceRequest);

    /* Webpack named bundle   */
    }, 'assistanceRequest');
  }
});
