const express = require("express");
const ContactController = require("../contacts/controller");

const ContactRouter = express.Router();

ContactRouter.get("/", ContactController.listContacts);

ContactRouter.get("/:contactId", ContactController.getById);

ContactRouter.post(
  "/",
  ContactController.validateCreateContact,
  ContactController._addContact
);

ContactRouter.delete("/:contactId", ContactController._removeContact);

ContactRouter.patch(
  "/:contactId",
  ContactController.validateUpdateContact,
  ContactController._updateContact
);

console.log("ContactRouter", ContactRouter);

module.exports = ContactRouter;
