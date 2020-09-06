import { AllHandlers, Endpoint } from "../handlers";

export const PARAM = {
  BEERS: {
    ID: ":beerId",
  },
};

export const ROUTES = {
  BEERS: {
    LIST: `/beers`,
    CREATE: `/beers`,
    GET: `/beers/detail/${PARAM.BEERS.ID}`,
    UPDATE: `/beers/detail/${PARAM.BEERS.ID}`,
    DELETE: `/beers/detail/${PARAM.BEERS.ID}`,
  },
};

export const ENDPOINTS = <H>(handler: AllHandlers): Endpoint<H>[] => [
  {
    path: ROUTES.BEERS.LIST,
    method: "GET",
    handler: handler.beer.list,
  },
  {
    path: ROUTES.BEERS.CREATE,
    method: "POST",
    handler: handler.beer.create,
  },
  {
    path: ROUTES.BEERS.GET,
    method: "GET",
    handler: handler.beer.get,
  },
  {
    path: ROUTES.BEERS.UPDATE,
    method: "PUT",
    handler: handler.beer.update,
  },
  {
    path: ROUTES.BEERS.DELETE,
    method: "DELETE",
    handler: handler.beer.delete,
  },
];
