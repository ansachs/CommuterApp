const getGoogleId = (userName, clientID) => {
   fetch('http://localhost:3000/users/:id.json', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({userName:userName, clientID:clientID})
  })
 
 
}

export default {
  getGoogleId: getGoogleId
 
}



