const serverToken = 'GWld7Zyxm1P2_7XEXl4y48aSy7OlWg0_E9CSKOdm'
const accessToken = 'KA.eyJ2ZXJzaW9uIjoyLCJpZCI6IkJjT09DTFRKUjgrSWtScGorSXRUTmc9PSIsImV4cGlyZXNfYXQiOjE1MjU4ODE3MjcsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.y85BjRfGhLdIVyNqlAEA-xc6Nl_UwnqTsguMhQlcE0Q'

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

const getFareId = (productId, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch('https://sandbox-api.uber.com/v1.2/requests/estimate',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      method: "POST",
      body: JSON.stringify({
        'product_id': productId,
        'start_latitude': startDestinationLat,
        'start_longitude': startDestinationLng,
        'end_latitude': endDestinationLat,
        'end_longitude': endDestinationLng
      })
    })
}

const requestRide = (productId, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch('https://sandbox-api.uber.com/v1.2/requests',
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Bearer ${accessToken}`
      },
      method: 'POST',
      body: JSON.stringify({
        'fare_id': null,
        'product_id': productId,
        'start_latitude': startDestinationLat,
        'start_longitude': startDestinationLng,
        'end_latitude': endDestinationLat,
        'end_longitude': endDestinationLng
      })
    })
}

const cancelRide = () => {
  return fetch('https://sandbox-api.uber.com/v1.2/requests/current',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US'
      },
      method: 'DELETE'
    })
  // .then(response => {
  //   console.log(response)
  //   response.json()
  // })
  // .then(json => {
  //   console.log(json);
  // })
  // .catch(error => {
  //   console.error(error)
  // });
}

export default {
  serverToken: serverToken,
  getDriverEta: getDriverEta,
  getDriverEtaToLocation: getDriverEtaToLocation,
  getFareId: getFareId,
  requestRide: requestRide,
  cancelRide: cancelRide
}
