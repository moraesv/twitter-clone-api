import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./app/routes";

import "./database";

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
  }

  private midlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan(":method :url :status :response-time"));
  }

  private routes(): void {
    this.app.use(routes);
  }

  public init() {
    this.midlewares();
    this.routes();
    return this.app;
  }
}

export default new App();
