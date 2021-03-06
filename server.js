require('dotenv').config();
const express = require("express");
const app = express();
var router = require('./src/routes/Routes')

app.use(express.json())
app.use('/', router)
app.listen(process.env.PORT, () => console.log("Servidor iniciado na porta", process.env.PORT))