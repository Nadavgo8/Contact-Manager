const {
  addContact,
  removeContact,
  listContacts,
  searchContacts,
} = require("../services/contactServices");

jest.mock("../utils/fileUtils", () => {
  let mockContacts = [];

  return {
    loadContacts: () => ({ contacts: mockContacts, fileExisted: true }),
    saveContacts: (data) => {
      mockContacts = data;
    },
  };
});

jest.mock("../utils/validation", () => ({
  isValidEmail: jest.fn((email) => email.includes("@")),
  isValidPhone: jest.fn((phone) => /^\d{3}-\d{3}-\d{4}$/.test(phone)),
  isDuplicateEmail: jest.fn((contacts, email) =>
    contacts.some((c) => c.email === email)
  ),
}));

const {
  isValidEmail,
  isValidPhone,
  isDuplicateEmail,
} = require("../utils/validation");
const { saveContacts } = require("../utils/fileUtils");

describe("contactServices", () => {
  beforeEach(() => {
    saveContacts([]); // reset data
    jest.clearAllMocks();
  });

  test("should add a valid contact", () => {
    isValidEmail.mockReturnValue(true);
    isValidPhone.mockReturnValue(true);
    isDuplicateEmail.mockReturnValue(false);

    const { newContact } = addContact({
      name: "Alice",
      email: "alice@mail.com",
      phone: "123-456-7890",
    });

    expect(newContact.name).toBe("Alice");
  });
  

  test("should throw on invalid email", () => {
    isValidEmail.mockReturnValue(false);
    expect(() => {
      addContact("Bob", "bobmail.com", "123-456-7890");
    }).toThrow("Email must contain @ symbol");
  });

  test("should throw on invalid phone", () => {
    isValidEmail.mockReturnValue(true);
    isValidPhone.mockReturnValue(false);
    expect(() => {
      addContact("Charlie", "charlie@mail.com", "invalid");
    }).toThrow("Phone must be in format 123-456-7890");
  });

  test("should throw on duplicate email", () => {
    isValidEmail.mockReturnValue(true);
    isValidPhone.mockReturnValue(true);
    isDuplicateEmail.mockReturnValue(true);

    expect(() => {
      addContact("Dana", "dana@mail.com", "123-456-7890");
    }).toThrow("Contact with this email already exists");
  });

  test("should return all contacts", () => {
    saveContacts([
      { name: "Eve", email: "eve@mail.com", phone: "123-456-7890" },
    ]);
    const result = listContacts();
    expect(result).toHaveLength(1);
  });

  test("should delete existing contact", () => {
    saveContacts([
      { name: "Frank", email: "frank@mail.com", phone: "123-456-7890" },
    ]);
    const removed = removeContact("frank@mail.com");
    expect(removed.name).toBe("Frank");
  });

  test("should throw when contact not found", () => {
    saveContacts([]);
    expect(() => {
      removeContact("notfound@mail.com");
    }).toThrow("No contact found with email: notfound@mail.com");
  });

  test("should search contacts by name or email", () => {
    saveContacts([
      { name: "Grace", email: "grace@mail.com", phone: "123-456-7890" },
      { name: "Grady", email: "grady@mail.com", phone: "123-456-7890" },
    ]);
    const { results } = searchContacts("gra");
    expect(results).toHaveLength(2);
  });
});
