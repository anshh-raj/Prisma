import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("Hello, World!");
});

//. Route Files
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
