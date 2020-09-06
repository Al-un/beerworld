import express from "express";
import bodyParser from "body-parser";

import { ExpressHandler, Endpoint, AllHandlers } from "../../handlers";
import { DAO } from "../../dao";
import { AbstApplication } from "../models";

export class ExpressApp extends AbstApplication<any> {
  _app: express.Application;
  _handler: AllHandlers;

  constructor(dao: DAO) {
    super(dao);
    this._handler = ExpressHandler(dao);

    this._app = express();
    this._app.use(bodyParser.json());

    this.loadEndpoints(this._handler);
  }

  get app(): express.Application {
    return this._app;
  }

  bindEndpoint(endpoint: Endpoint<any>) {
    switch (endpoint.method) {
      case "GET":
        this._app.get(endpoint.path, endpoint.handler);
        break;
      case "POST":
        this._app.post(endpoint.path, endpoint.handler);
        break;
      case "PUT":
        this._app.put(endpoint.path, endpoint.handler);
        break;
      case "PATCH":
        this._app.patch(endpoint.path, endpoint.handler);
        break;
      case "DELETE":
        this._app.delete(endpoint.path, endpoint.handler);
        break;
    }
  }

  start() {
    const PORT = 8000;

    this._app.listen(PORT, () => {
      console.log(`⚡️Server is running at https://localhost:${PORT}`);
    });
  }
}
