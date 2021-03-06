const checkGoogleIDWithServer = (userName, clientID) => {
   fetch('https://quiet-retreat-95283.herokuapp.com/users/:id.json', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({userName:userName, clientID:clientID})
  })
}
 
const saveFavoriteContacts = async (name, phoneNumber, relativeID, clientID) => {
  fetch(`https://quiet-retreat-95283.herokuapp.com/users/${clientID}/save`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({name:name, phoneNumber:phoneNumber, relativeID:relativeID})
  })
}


const getFavoriteContacts = async (clientID) => {
  
    return fetch(`https://quiet-retreat-95283.herokuapp.com/users/${clientID}/contacts`)
    .then((response) => response.json())
    .then((json) => {console.log(json);return (json)})

}

const deleteContact = (clientID, relativeID) => {
 fetch(`https://quiet-retreat-95283.herokuapp.com/users/${clientID}/contacts/${relativeID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

export default {
  checkGoogleIDWithServer: checkGoogleIDWithServer,
  getFavoriteContacts: getFavoriteContacts,
  saveFavoriteContacts: saveFavoriteContacts,
  deleteContact: deleteContact
 
}