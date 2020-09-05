import { Endpoint, AllHandlers } from "../handlers";
import { DAO } from "../dao";
import { ENDPOINTS } from "./routes";

export interface Application {
  start: () => void;
}

export abstract class AbstApplication<H> implements Application {
  protected _dao: DAO;

  constructor(dao: DAO) {
    this._dao = dao;
  }

  protected loadEndpoints(handler: AllHandlers) {
    const endpoints = ENDPOINTS<H>(handler);
    endpoints.forEach((e) => this.bindEndpoint(e));
  }

  protected abstract bindEndpoint(endpoint: Endpoint<H>): void;

  abstract start(): void;
}
