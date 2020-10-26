const contacts = require("./contacts.json");
const Joi = require("joi");

class UserController {
  get createUser() {
    return this._createUser.bind(this);
  }
  get updateUser() {
    return this._updateUser.bind(this);
  }
  get deleteUser() {
    return this._deleteUser.bind(this);
  }

  listContacts(req, res, next) {
    return res.status(200).json(contacts);
  }

  _createUser(req, res, next) {
    const newUser = {
      ...req.body,
      id: contacts.length + 1
    };
    contacts.push(newUser);
    return res.send();
  }

  async _updateUser(req, res, next) {
    try {
      const targetUserIndex = this.findContactIndexById(res, req.params.id);

      contacts[targetUserIndex] = {
        ...contacts[targetUserIndex],
        ...req.body,
      };

      console.log("contacts", contacts);
      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  _deleteUser(req, res, next) {
    const targetContactIndex = this.findContactIndexById(res, req.params.id);
    if (targetContactIndex === undefined) {
      res.status(404).send("Contact does not exist");
      return;
    }
    contacts.splice(targetContactIndex, 1);
    console.log("contacts", contacts);
    return res.status(200).send();
  }

  findContactIndexById(res, contactId) {
    const id = parseInt(contactId);

    const targetContactIndex = contacts.findIndex(
      (contact) => contact.id === id
    );
    if (targetContactIndex === undefined) {
      throw new NotFoundError();
    }
    return targetContactIndex;
  }

  validateCreateUser(req, res, next) {
    const createUserRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const result = Joi.validate(req.body, createUserRules);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    next();
  }

  validateUpdateUser(req, res, next) {
    const updateUserRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
    });
    const result = Joi.validate(req.body, updateUserRules);
    if (result.error) {
      return res.status(400).send(result.error);
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

module.exports = new UserController();
