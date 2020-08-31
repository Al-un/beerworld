import { Handler, Endpoint } from "../handlers";

export const ROUTES = {
  BEERS: {
    LIST: "/beers",
    CREATE: "/beers",
    GET: "/beers/detail/:beerId",
    UPDATE: "/beers/detail/:beerId",
    DELETE: "/beers/detail/:beerId",
  },
};

export const ENDPOINTS = <H>(handler: Handler): Endpoint<H>[] => [
  {
    path: ROUTES.BEERS.LIST,
    method: "GET",
    handler: handler.listBeers,
  },
  {
    path: ROUTES.BEERS.CREATE,
    method: "POST",
    handler: handler.createBeer,
  },
  {
    path: ROUTES.BEERS.GET,
    method: "GET",
    handler: handler.getBeer,
  },
  {
    path: ROUTES.BEERS.UPDATE,
    method: "PUT",
    handler: handler.updateBeer,
  },
  {
    path: ROUTES.BEERS.DELETE,
    method: "DELETE",
    handler: handler.deleteBeer,
  },
];
