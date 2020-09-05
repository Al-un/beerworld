import express from "express";

import { BeerHandler, HandlerBuilder } from "../models";
import { Beer } from "../../dao";

interface ParamBeerId {
  beerId: string;
}

export const ExpressBeerHandler: HandlerBuilder<BeerHandler> = (dao) => ({
  create: async (
    req: express.Request<{}, Beer, Beer>,
    res: express.Response
  ) => {
    try {
      let newBeer = req.body;
      newBeer = await dao.beer.create(newBeer);

      res.json(newBeer);
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  },

  delete: async (req: express.Request, res: express.Response) => {
    try {
      const beerId = req.params["beerId"];
      const deleteCount = await dao.beer.delete(beerId);

      res.json({ deleteCount });
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  },

  get: async (req: express.Request, res: express.Response) => {
    try {
      const beerId = req.params["beerId"];
      const beer = await dao.beer.get(beerId);

      if (beer) {
        res.json(beer);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  },

  list: async (req: express.Request, res: express.Response) => {
    try {
      const beers = await dao.beer.list();

      res.json(beers);
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  },

  update: async (req: express.Request, res: express.Response) => {
    try {
      const beerId = req.params["beerId"];
      let beer = req.body;
      beer = await dao.beer.update(beer, beerId);

      if (beer) {
        res.json(beer);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  },
});
