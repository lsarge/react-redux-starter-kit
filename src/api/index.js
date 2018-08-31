export const fetchServiceTypes = () => fetch('http://localhost:49567/api/service-types')
  .then(response => response.json());

export const postAssistanceRequest = (data) => fetch('http://localhost:49567/api/assistance-requests', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
