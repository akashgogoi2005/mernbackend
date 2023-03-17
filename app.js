require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");

const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");


// Allow requests from your Netlify domain
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://main--glittery-starlight-75f270.netlify.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://main--glittery-starlight-75f270.netlify.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);





//const port = process.env.REACT_APP_BACKEND_URL || 8005;
// const port = 8005;

const PORT = process.env.PORT || 8005;

app.listen(PORT, () => {
  console.log(`server is running at port number ${PORT}`);
});


DefaultData();
// const port = process.env.PORT || 8005;
// const port = "mernbackend-tpat.onrender.com";