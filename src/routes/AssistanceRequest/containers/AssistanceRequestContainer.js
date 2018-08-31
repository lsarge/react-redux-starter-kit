import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from '../modules/validate';

import {
  fetchServiceTypes,
  postAssistanceRequest,
  selectServiceTypes,
  selectHasSubmissionError,
  selectIsSubmitting,
  selectSubmissionError,
  selectSubmissionData,
 } from '../modules/assistanceRequest';

import AssistanceRequest from '../components/AssistanceRequest';

const AssistanceRequestContainer = reduxForm({
  form: 'assistanceRequestForm',
  validate,
})(AssistanceRequest);

const mapStateToProps = (state) => ({
  initialValues: state.assistanceRequest.request,
  serviceTypes: selectServiceTypes(state),
  hasSubmissionError: selectHasSubmissionError(state),
  submissionError: selectSubmissionError(state),
  submissionData: selectSubmissionData(state),
  isSubmitting: selectIsSubmitting(state),
  values: getFormValues('assistanceRequestForm')(state),
});

const mapDispatchToProps = {
  fetchServiceTypes,
  postAssistanceRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceRequestContainer);
