const mongoose = require("mongoose");


const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => console.log("data base connected")).catch((error) => console.log("error" + error.message))



// const uri = process.env.MONGO_URI;

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log("Failed to connect to MongoDB", err));




// const mongoose = require("mongoose");
// require("dotenv").config();

// const uri = process.env.MONGO_URI;

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log("Failed to connect to MongoDB", err));
