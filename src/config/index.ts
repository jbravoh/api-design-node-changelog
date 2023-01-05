import merge from "lodash.merge";

// set NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// treat environments in stages seperately
const stage = process.env.STAGE || "local";
let envConfig;

// dynamically require each config depending on the stage we're in
if (stage === "production") {
  // use .default as config prod file will use ES6 import/export
  envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = require("./staging");
} else {
  envConfig = require("./local").default;
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: 3001,
  secrets: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

export default merge(defaultConfig, envConfig);
