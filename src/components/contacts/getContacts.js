
getContactsAsync = async ()=> {

    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      return;
    }
    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
      ],
      pageSize: 200,
      pageOffset: 0,
    })
    return contacts
}



export default {
  getContactsAsync: getContactsAsync
}