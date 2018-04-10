const getGoogleId = (userName, clientID) => {
   fetch('http://localhost:3000/users/:id.json', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({userName:userName, clientID:clientID})
  })
}
 
const saveFavoriteContacts = (name, phoneNumber, relativeID, clientID) => {
  fetch(`http://localhost:3000/users/${clientID}/save`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({name:name, phoneNumber:phoneNumber, relativeID:relativeID})
  })
}



const getFavoriteContacts = (clientID) => {
    fetch(`http://localhost:3000/users/${clientID}/contacts`)
    .then((response) => response.json())

}

const deleteContact = (clientID, relativeID) => {
 fetch(`users/${clientID}/contacts/${relativeID}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
}

export default {
  getGoogleId: getGoogleId,
  getFavoriteContacts: getFavoriteContacts,
  saveFavoriteContacts: saveFavoriteContacts,
  deleteContact: deleteContact
 
}
