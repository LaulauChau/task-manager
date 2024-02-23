const config = {
  "src/**/*.ts": [
    "prettier --ignore-unknown --write",
    "eslint --fix --max-warnings 0 --report-unused-disable-directives",
  ],
};

module.exports = config;
