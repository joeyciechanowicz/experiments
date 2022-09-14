console.log("c.js");

const { shared } = require("./shared");
const { nodeDependency } = require("node_dependency");

module.exports = {
  c: {
    c: `c-${Math.random()}`,
    shared,
    nodeDependency,
  },
};
