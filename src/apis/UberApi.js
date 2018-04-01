const getUberUserToken = () => {

}

const getDriverEta = (user_token, start_latitude, start_longitude) => {
  return fetch(`https://api.uber.com/v1.2/estimates/time?start_latitude=${start_latitude}&start_longitude=${start_longitude}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
      }
    })
  .then((response) => {return response.json()
  })
  .catch((err) => {
      console.log(err)
  });
}

const getDriverEtaToLocation = (user_token, start_latitude, start_longitude, end_latitude, end_longitude) => {

  return fetch(`https://api.uber.com/v1.2/estimates/price?start_latitude=${start_latitude}&start_longitude=${start_longitude}&end_latitude=${end_latitude}&end_longitude=${end_longitude}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
      }
    })
  .then((response) => {return response.json()
  })
  .catch((err) => {
      console.log(err)
  });
}

export default {
  getUberToken: getUberUserToken,
  getDriverEta: getDriverEta,
  getDriverEtaToLocation: getDriverEtaToLocation
}
