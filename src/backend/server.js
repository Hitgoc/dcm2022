const express = require("express");
const path = require("path");
const { router } = require("./routes/routes");
const app = express();
const cors = require("cors");
require("./database");

app.use(cors());

const staticPath = path.resolve(__dirname, "../../build");

app.use(express.static(staticPath));

app.use(express.json({ limit: "100mb" }));
app.use("/", router);

app.use((req, res, next) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

const PORT = process.env.PORT || 4000;

app.use("/", (req, res) => {
  res.send("DCM app server running.../ ");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
