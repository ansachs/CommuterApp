const serverToken = 'GWld7Zyxm1P2_7XEXl4y48aSy7OlWg0_E9CSKOdm'

const getDriverEta = (serverToken, startLatitude, startLongitude) => {
  return fetch(`https://sandbox-api.uber.com/v1.2/estimates/time?start_latitude=${startLatitude}&start_longitude=${startLongitude}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${serverToken}`
      }
    })
  .then((response) => {return response.json()
  })
  .catch((err) => {
      console.log(err)
  });
}

const getDriverEtaToLocation = (serverToken, startLatitude, startLongitude, endLatitude, endLongitude) => {

  return fetch(`https://sandbox-api.uber.com/v1.2/estimates/price?start_latitude=${startLatitude}&start_longitude=${startLongitude}&end_latitude=${endLatitude}&end_longitude=${endLongitude}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${serverToken}`
      }
    })
  .then((response) => {return response.json()
  })
  .catch((err) => {
      console.log(err)
  });
}

export default {
  serverToken: serverToken,
  getDriverEta: getDriverEta,
  getDriverEtaToLocation: getDriverEtaToLocation
}
