const convertToLatLong = (startDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${startDestination}&key=AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU`)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "ZERO_RESULTS") {
        throw "address not found"
      } else {
        return json
      }
    })
    .catch((err) => {
      console.log(err)
      throw "error not a valid address"
    });
}

const fetchModeByDrive = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "ZERO_RESULTS") {
        throw "error in fetchModeByDrive"
      } else {
        return json
      }
    })
    .catch((err) => {
      console.log(err)
      throw "error in fetchModeByDrive"
    });
}

const fetchModeByBicycling = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&mode=bicycling&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "ZERO_RESULTS") {
        throw "error in fetchModeByBicycling"
      } else {
        return json
      }
    })
    .catch((err) => {
      console.log(err)
      throw "error in fetchModeByBicycling"
    });

}

const fetchModeByWalking = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&mode=walking&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "ZERO_RESULTS") {
        throw "error in fetchModeByWalking"
      } else {
        return json
      }
    })
    .catch((err) => {
      console.log(err)
      throw "error in fetchModeByWalking"
    });
}


const fetchModeByTransit = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&mode=transit&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === "ZERO_RESULTS") {
        throw "error in transit"
      } else {
        return json
      }
    })
    .catch((err) => {
      console.log(err)
      throw "error in transit"
    });
}


export default {
  fetchModeByDrive: fetchModeByDrive,
  fetchModeByBicycling: fetchModeByBicycling,
  fetchModeByWalking: fetchModeByWalking,
  fetchModeByTransit: fetchModeByTransit,
  convertToLatLong: convertToLatLong
}