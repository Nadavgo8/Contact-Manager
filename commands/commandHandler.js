const contactService = require("../services/contactServices");

const commandHandler = {
  handle(command, args) {
    switch (command) {
      case "add":
        this.handleAdd(args);
        break;
      case "remove":
        this.handleRemove(args);
        break;
      case "list":
        this.handleList();
        break;
      case "search":
        this.handleSearch(args);
        break;
      case "help":
        this.handleHelp();
        break;

      default:
        console.log(`Unknown command: ${command}`);
        console.log(`Usage: node app.js [add|remove|list|search]`);
    }
  },

  handleAdd(args) {
    const [name, email, phone] = args;
    if (!name || !email || !phone) {
      return console.log("Usage: node app.js add <name> <email> <phone>");
    }

    try {
      const { newContact, fileExisted } = contactService.addContact({
        name,
        email,
        phone,
      });
      console.log(`Loading contacts from contacts.json...`);
      if (!fileExisted) {
        console.log(`✗ File not found - creating new contact list`);
      } else {
        console.log(`✓ Loaded 1 contacts`);
      }
      console.log(`✅ Contact added: ${newContact.name}`);
      console.log(`✅ Contacts saved to contacts.json`);
    } catch (err) {
      console.error("❌ Failed to add contact:", err.message);
    }
  },

  handleRemove(args) {
    const [email] = args;
    if (!email) {
      return console.log("Usage: node app.js remove <email>");
    }
    console.log("Loading contacts from contacts.json...");
    let contacts;
    try {
      contacts = contactService.listContacts();
    } catch (err) {
      return console.error("❌ Failed to load contacts:", err.message);
    }
    const countBefore = contacts.length;
    console.log(`✓ Loaded ${countBefore} contacts`);
    try {
      const removed = contactService.removeContact(email);
      console.log(`✅ Contact deleted: ${removed.name}`);
      console.log("✅ Contacts saved to contacts.json");
    } catch (err) {
      console.error("❌", err.message);
    }
  },

  handleList() {
    const contacts = contactService.listContacts();
    console.log("Loading contacts from contacts.json...");
    if (!contacts.length) {
      console.log("📭 No contacts found.");
    } else {
      console.log(`✓ Loaded ${contacts.length} contacts`);
      console.log("\n=== All Contacts ===");
      contacts.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
      });
    }
  },

  handleSearch(args) {
    const [query] = args;
    if (!query) {
      return console.log("Usage: node app.js search <query>");
    }
    console.log("Loading contacts from contacts.json...");
    const { results, total } = contactService.searchContacts(query);
    console.log(`✓ Loaded ${total} contacts`);
    console.log(`\n=== Search Results for "${query}" ===`);
    if (!results.length) {
      console.log(`No contacts found matching "${query}"`);
    } else {
      results.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
      });
    }
  },
  handleHelp() {
    console.log(`
        Usage: node contacts.js [command] [arguments]
        
        Commands:
          add "name" "email" "phone"  - Add a new contact
          list                        - List all contacts
          search "query"              - Search contacts by name or email
          delete "email"              - Delete contact by email
          help                        - Show this help message

        Examples:
          node contacts.js add "John Doe" "john@example.com" "555-123-4567"
          node contacts.js search "john"
          node contacts.js delete "john@example.com"
        `);
  },
};

module.exports = commandHandler;
