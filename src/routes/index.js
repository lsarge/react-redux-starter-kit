import CoreLayout from '../layouts/PageLayout/PageLayout';
import AssistanceRequest from './AssistanceRequest';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : AssistanceRequest(store),
});

export default createRoutes
