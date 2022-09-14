console.log("a.js");

const b = require("./b");
const b2 = require("./b2");
const { shared } = require("./shared");
const { nodeDependency } = require("node_dependency");

module.exports = {
  ...b,
  ...b2,
  a: {
    a: `a-${Math.random()}`,
    shared,
    nodeDependency,
  },
};
