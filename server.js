require('dotenv').config()
const express = require("express")
var app = express()

app.use(express.json())
app.listen(process.env.PORT, () => console.log("Servidor iniciado na porta", process.env.PORT))