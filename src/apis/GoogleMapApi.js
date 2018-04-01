const fetchModeByDrive = (startDestination, endDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestination}&destination=${endDestination}&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}

const fetchModeByBicycling = (startDestination, endDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestination}&destination=${endDestination}&mode=bicycling&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}

const fetchModeByWalking = (startDestination, endDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestination}&destination=${endDestination}&mode=walking&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}


const fetchModeByTransit = (startDestination, endDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestination}&destination=${endDestination}&mode=transit&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}


export default {
  fetchModeByDrive: fetchModeByDrive,
  fetchModeByBicycling: fetchModeByBicycling,
  fetchModeByWalking: fetchModeByWalking,
  fetchModeByTransit: fetchModeByTransit
}