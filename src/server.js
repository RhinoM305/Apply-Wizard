const { PORT = 5001 } = process.env;

const app = require("./app");

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}

app.listen(PORT, listener);