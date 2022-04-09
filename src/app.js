const bodyParser = require('body-parser');
const cors = require("cors");
const config = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/pitches");

const app = express();

app.use(express.json({extended:false}));

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log("Connected to MongoDB");
  
    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}`);
    });
});

app.use(cors());
app.use(bodyParser.json());


app.use("/pitches", routes);
