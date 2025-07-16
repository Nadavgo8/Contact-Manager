const { isValidEmail, isValidPhone, isDuplicateEmail } = require('../utils/validation');
const { loadContacts, saveContacts } = require('../utils/fileUtils');

function addContact({name, email, phone}) {
  const {contacts, fileExisted } = loadContacts();

  if (!isValidEmail(email)) {
    throw new Error('Email must contain @ symbol');
  }

  if (!isValidPhone(phone)) {
    throw new Error('Phone must be in format 123-456-7890');
  }

  if (isDuplicateEmail(contacts, email)) {
    throw new Error('Contact with this email already exists');
  }

  const newContact = { name, email, phone };
  contacts.push(newContact);
  saveContacts(contacts);
  return { newContact, fileExisted };
}

function listContacts() {
  const { contacts } = loadContacts(); 
  return contacts;
}


function searchContacts(query) {
  const { contacts } = loadContacts();
  const results = contacts.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  );
  return { results, total: contacts.length };
}

function removeContact(email) {
  const { contacts } = loadContacts();
  const index = contacts.findIndex(c => c.email === email);

  if (index === -1) {
    throw new Error(`No contact found with email: ${email}`);
  }

  const removed = contacts.splice(index, 1)[0];
  saveContacts(contacts);
  return removed; 
}

module.exports = {
  addContact,
  listContacts,
  searchContacts,
  removeContact,
};
