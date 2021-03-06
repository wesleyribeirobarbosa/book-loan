require('dotenv').config();
const app = require('./App');

app.listen(process.env.PORT, () => console.log("Server started at port", process.env.PORT))
