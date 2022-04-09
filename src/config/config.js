// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: 8081,
  mongoose: {
    url: "mongodb://127.0.0.1:27017/xharktank",
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    },
  },
};
