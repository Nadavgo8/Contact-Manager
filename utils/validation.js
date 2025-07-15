function isValidEmail(email) {
  let isValidEmail = typeof email === 'string' && email.includes('@');
  return isValidEmail;
}

function isValidPhone(phone) {
  let isValidPhone = typeof phone === 'string' && /^\d{3}-\d{3}-\d{4}$/.test(phone);
  return isValidPhone;
}

function isDuplicateEmail(contacts, email) {
  let isDuplicateEmail = contacts.some(c => c.email === email);
  return isDuplicateEmail;
}

module.exports = {
  isValidEmail,
  isValidPhone,
  isDuplicateEmail,
};

