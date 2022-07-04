import express from "express";
import cors from "cors";
import route from "./routes/Route.js";
import EventEmitter from "events";
EventEmitter.defaultMaxListeners = 15;

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(route);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
