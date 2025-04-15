const express = require("express");
const app = express();

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

// hZKpLEtybKpK8jkD

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Server is Running!");
  });
}

main().then(() => console.log("MongoDB connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
