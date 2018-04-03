const convertToLatLong = (startDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${startDestination}&key=AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU`)
    .then((response) => response.json())
}

const fetchModeByDrive = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}

const fetchModeByBicycling = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&mode=bicycling&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}

const fetchModeByWalking = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&mode=walking&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}


const fetchModeByTransit = (startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestinationLat},${startDestinationLng}&destination=${endDestinationLat},${endDestinationLng}&mode=transit&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}


export default {
  fetchModeByDrive: fetchModeByDrive,
  fetchModeByBicycling: fetchModeByBicycling,
  fetchModeByWalking: fetchModeByWalking,
  fetchModeByTransit: fetchModeByTransit,
  convertToLatLong: convertToLatLong
}