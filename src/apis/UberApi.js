const serverToken = 'GWld7Zyxm1P2_7XEXl4y48aSy7OlWg0_E9CSKOdm'

const getDriverEta = (serverToken, startLatitude, startLongitude) => {
  return fetch(`https://sandbox-api.uber.com/v1.2/estimates/time?start_latitude=${startLatitude}&start_longitude=${startLongitude}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${serverToken}`
      }
    })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    if (json.code === "distance_exceeded" ) {
      throw "distance exceeded"
    } else {
    return json;
  }})
  .catch((err) => {
      console.log(err)
      throw "error in uberapi"
    });
}

const getDriverEtaToLocation = (serverToken, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {

  return fetch(`https://sandbox-api.uber.com/v1.2/estimates/price?start_latitude=${startDestinationLat}&start_longitude=${startDestinationLng}&end_latitude=${endDestinationLat}&end_longitude=${endDestinationLng}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${serverToken}`
      }
    })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    if (json.code === "distance_exceeded" ) {
      throw "distance exceeded"
    } else {
    return json;
  }})
  .catch((err) => {
      console.log(err)
      throw "error in uberapi"
    });
}

export default {
  serverToken: serverToken,
  getDriverEta: getDriverEta,
  getDriverEtaToLocation: getDriverEtaToLocation
}
