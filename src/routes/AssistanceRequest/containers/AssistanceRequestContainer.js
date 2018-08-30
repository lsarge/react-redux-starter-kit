import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  fetchServiceTypes,
  postAssistanceRequest,
  selectRequest,
  selectServiceTypes,
 } from '../modules/assistanceRequest';

import AssistanceRequest from '../components/AssistanceRequest';

const mapDispatchToProps = {
  fetchServiceTypes,
  postAssistanceRequest,
};

// TODO these are the same thing. make them different things
const mapStateToProps = (state) => ({
  initialValues: state.assistanceRequest.request,
  request : selectRequest(state),
  serviceTypes: selectServiceTypes(state),
});

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const ConnectedForm = reduxForm({
  form: 'assistanceRequestForm',
  validate,
})(AssistanceRequest);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
