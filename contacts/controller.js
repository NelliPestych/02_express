const contacts = require("../db/contacts.json");
const Joi = require("joi");

class ContactController {
  get addContact() {
    return this._addContact.bind(this);
  }
  get updateContact() {
    return this._updateContact.bind(this);
  }
  get removeContact() {
    return this._removeContact.bind(this);
  }

  listContacts(req, res, next) {
    return res.status(200).json(contacts);
  }

  _addContact(req, res, next) {
    const newContact = {
      ...req.body,
      id: contacts.length + 1,
    };
    contacts.push(newContact);
    return res.status(201).json(newContact);
  }

  async _updateContact(req, res, next) {
    try {
      const id = Number(req.params.contactId);
      const targetContactIndex = contacts.findIndex(
        (contact) => contact.id === id
      );

      contacts[targetContactIndex] = {
        ...contacts[targetContactIndex],
        ...req.body,
      };

      return res.status(200).json(contacts[targetContactIndex]);
    } catch (err) {
      next(err);
    }
  }

  _removeContact(req, res, next) {
    const id = Number(req.params.contactId);
    const targetContactIndex = contacts.findIndex(
      (contact) => contact.id === id
    );
    if (targetContactIndex === -1) {
      throw new NotFoundError("Not found");
    }
    contacts.splice(targetContactIndex, 1);
    console.log(contacts);
    return res.status(200).json({ message: "contact deleted" });
  }

  getById(req, res, contactId) {
    const id = Number(req.params.contactId);
    const targetContact = contacts.find((contact) => contact.id === id);
    if (targetContact === undefined) {
      throw new NotFoundError("Not found");
    }
    return res.status(200).json(targetContact);
  }

  validateCreateContact(req, res, next) {
    const createContactRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const result = createContactRules.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    next();
  }

  validateUpdateContact(req, res, next) {
    const updateContactRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const result = updateContactRules.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: "missing fields" });
    }

    next();
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    delete this.stack;
  }
}

module.exports = new ContactController();
