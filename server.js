const express = require("express")
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send(`Port ${port} is listening`)
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})