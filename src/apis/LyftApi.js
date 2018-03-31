

const getLyftUserToken = () => {

}

const getDriverEta = (user_token, orig_lat, orig_lng) => {

  return fetch('https://api.lyft.com/v1/eta?lat=' + orig_lat + '&lng=' + orig_lng,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + user_token
      }
    })
  .then((response) => {return response.json()
  })
  .catch((err) => {
      console.log(err)
  });
}

const getDriverEtaToLocation = (user_token, orig_lat, orig_lng, dest_lat, dest_lng) => {

  return fetch('https://api.lyft.com/v1/cost?start_lat=' + orig_lat + '&start_lng=' + orig_lng + '&end_lat=' + dest_lat + '&end_lng=' + dest_lng,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + user_token
      }
    })
  .then((response) => {return response.json()
  })
  .catch((err) => {
      console.log(err)
  });
}


export default {
  getLyftUserToken: getLyftUserToken,
  getDriverEta: getDriverEta,
  getDriverEtaToLocation: getDriverEtaToLocation
}