const fetchModeByDrive = (startDestination, endDestination) => {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startDestination}&destination=${endDestination}&key=AIzaSyAgKeNtylo0q2-5FEXPFV1EoGfDqXUSofE`)
    .then((response) => response.json())
}

export default {
  fetchModeByDrive: fetchModeByDrive
}
