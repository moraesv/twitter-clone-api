import "reflect-metadata";
import app from "./app";
import "reflect-metadata";
import "./database";

const server = app.init();

server.listen(3001, async () => {
  console.log("Listening");
});
