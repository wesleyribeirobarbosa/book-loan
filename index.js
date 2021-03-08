require('dotenv').config();
const app = require('./App');

app.listen(process.env.PORT, () => console.log(app.constants.serverStartMsg, process.env.PORT))
