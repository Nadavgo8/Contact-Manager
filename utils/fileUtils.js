const fs = require('fs');
const path = require('path');

const CONTACTS_PATH = path.join(__dirname, '..', 'contacts.json');

function loadContacts() {
    let fileExisted = true;
  try {
    const data = fs.readFileSync(CONTACTS_PATH, 'utf-8');
    return { contacts: JSON.parse(data), fileExisted: true };
  } catch (err) {
    if (err.code === 'ENOENT') {
      fileExisted = false;
      return { contacts: [], fileExisted };
    } else {
      throw new Error('Error loading contacts: ' + err.message);
    }
  }
}

function saveContacts(contacts) {
  try {
    fs.writeFileSync(CONTACTS_PATH, JSON.stringify(contacts, null, 2));
  } catch (err) {
    throw new Error('Error saving contacts: ' + err.message);
  }
}

module.exports = {
  loadContacts,
  saveContacts,
};
