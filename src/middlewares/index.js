/*
constantes que almacenan todo lo que exportan los archivos
*/
const validateJwt = require("../middlewares/validateJWT");
const validateFields  = require("../middlewares/validateFields.middleware");
const validateRoles = require("../middlewares/validateRole");
const includeFiles = require("./includeFiles");


module.exports = {
  ...validateJwt,
  ...validateFields,
  ...validateRoles,
  ...includeFiles
}