import { connect } from 'react-redux';
import {
  increment,
  doubleAsync,
  fetchServiceTypes,
  selectServiceTypes,
 } from '../modules/assistanceRequest';

import AssistanceRequest from '../components/AssistanceRequest';

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  fetchServiceTypes,
};

const mapStateToProps = (state) => ({
  serviceTypes : selectServiceTypes(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceRequest);
