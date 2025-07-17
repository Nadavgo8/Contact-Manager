const {
  isValidEmail,
  isValidPhone,
  isDuplicateEmail,
} = require("../utils/validation");

describe("Validation Utils", () => {
  test("isValidEmail", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid.com")).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });

  test("isValidPhone", () => {
    expect(isValidPhone("123-456-7890")).toBe(true);
    expect(isValidPhone("1234567890")).toBe(false);
    expect(isValidPhone(null)).toBe(false);
  });

  test("isDuplicateEmail", () => {
    const contacts = [
      { name: "Alice", email: "alice@example.com", phone: "123-456-7890" },
    ];

    expect(isDuplicateEmail(contacts, "alice@example.com")).toBe(true);
    expect(isDuplicateEmail(contacts, "bob@example.com")).toBe(false);
  });
});
