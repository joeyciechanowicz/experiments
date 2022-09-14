console.log("b.js");

const c = require("./c");

module.exports = {
  ...c,
};
