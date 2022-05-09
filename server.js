const express = require("express");
const path = require("path");
const app = express();

const { getCards, duel, getRecord } = require("./controller");

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/player/one", getCards);
app.post("/duel", duel);
app.get("/player", getRecord);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
