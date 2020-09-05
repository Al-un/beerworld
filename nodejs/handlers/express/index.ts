import express from "express";

import { Handler } from "../models";
import { Beer, DAO } from "../../dao";

interface ParamBeerId {
  beerId: string;
}

export class ExpressHandler implements Handler {
  private _dao: DAO;

  constructor(dao: DAO) {
    this._dao = dao;
  }

  createBeer = async (
    req: express.Request<{}, Beer, Beer>,
    res: express.Response
  ) => {
    try {
      let newBeer = req.body;
      newBeer = await this._dao.createBeer(newBeer);

      res.json(newBeer);
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  };

  deleteBeer = async (req: express.Request, res: express.Response) => {
    try {
      const beerId = req.params["beerId"];
      const deleteCount = await this._dao.deleteBeer(beerId);

      res.json({ deleteCount });
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  };

  getBeer = async (req: express.Request, res: express.Response) => {
    try {
      const beerId = req.params["beerId"];
      const beer = await this._dao.getBeer(beerId);

      if (beer) {
        res.json(beer);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  };

  listBeers = async (req: express.Request, res: express.Response) => {
    try {
      const beers = await this._dao.listBeers();

      res.json(beers);
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  };

  updateBeer = async (req: express.Request, res: express.Response) => {
    try {
      const beerId = req.params["beerId"];
      let beer = req.body;
      beer = await this._dao.updateBeer(beer, beerId);

      if (beer) {
        res.json(beer);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.status(500);
      res.json({ error });
    }
  };
}
