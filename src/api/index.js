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
