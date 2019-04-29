module.exports = {
  help: {
    valid: ["-h", "-?", "--help"],
    description: "Prints help information"
  },
  config: {
    valid: ["--config-add"],
    description: "Add directory to config"
  },
  init: {
    valid: ["--init"],
    description: "Create empty config file"
  }
};
