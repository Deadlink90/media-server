const jwt = require("./JWT");
const searchId = require("./searchId");
const dbValidators = require("./dbValidators")
const uploadFile = require("./uploadFile");

module.exports = {
  ...jwt,
  ...searchId,
  ...dbValidators,
  ...uploadFile,
}