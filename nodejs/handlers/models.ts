import { DAO } from "../dao";
/* ========================================================================= */
//    Utilities
/* ========================================================================= */
export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface Endpoint<H> {
  path: string;
  method: HttpMethod;
  handler: H;
}

/* ========================================================================= */
//    Handler layer
/* ========================================================================= */
export type HandlerBuilder<H> = (dao: DAO) => H;

export interface AllHandlers {
  beer: BeerHandler;
}

export interface BeerHandler {
  create: any;
  delete: any;
  get: any;
  list: any;
  update: any;
}

/* ========================================================================= */
//    Non data-model response format
/* ========================================================================= */
export interface DeleteResponse {
  deleteCount: number;
}
