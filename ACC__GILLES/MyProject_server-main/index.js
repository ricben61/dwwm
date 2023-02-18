require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
mongoose
.set('strictQuery', false)
.connect(MONGO_URI)
.then(()=>console.log("La connexion à la BDD est établie"))
.catch((error) => console.log(error))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);
const postRoute = require("./routes/postRoute");
app.use("/post", postRoute);
const categoryRoute = require("./routes/categoryRoute");
app.use("/category", categoryRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Le serveur est à l'écoute sur le port ${PORT}`));
