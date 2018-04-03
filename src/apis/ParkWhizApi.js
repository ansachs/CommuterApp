const fetchModeByLatLong = (endDestinationLat, endDestinationLng) => {
  return fetch(`https://api.parkwhiz.com/search/?lat=${endDestinationLat}&lng=${endDestinationLng}&start=1522637722&end=1522648522&key=62d882d8cfe5680004fa849286b6ce20`)
    .then((response) => response.json())
}


export default {
  fetchModeByLatLong: fetchModeByLatLong
}




