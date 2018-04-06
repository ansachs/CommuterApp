//1 - get lyft user token
//2 - getDriverEtaToOrigin with user token and lat/lng
//3 - getRideDetails

const getLyftUserToken = () => {
  return fetch('https://quiet-retreat-95283.herokuapp.com/client_key/lyft')
  .then((response) => response.json()
  )
  .catch((err) => {
      console.log(err)
  })
  .catch((err) => {
      throw "error in getLyftUserToken"
    });
}

const getDriverEtaToOrigin = (user_token, orig_lat, orig_lng) => {

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
      throw "error in getDriverEtaToOrigin"
    });
}

const getRideDetails = (user_token, orig_lat, orig_lng, dest_lat, dest_lng) => {

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
      throw "error in getDriverEtaToOrigin"
  });
}


export default {
  getLyftUserToken: getLyftUserToken,
  getDriverEtaToOrigin: getDriverEtaToOrigin,
  getRideDetails: getRideDetails
}
