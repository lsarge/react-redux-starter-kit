import axios from 'axios';

export const fetchServiceTypes = () => axios
  .get('http://localhost:49567/api/service-types');
  // .then((response) => {
  //   console.log(response);
  //   return response;
  // })
  // .catch((error) => {
  //   console.log('error', error)
  // });

  export const postAssistanceRequest = (data) => axios
  .post('http://localhost:49567/api/assistance-requests', {
    body: JSON.stringify(data),
  })
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error);
  })
