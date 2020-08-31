import express from "express";

import { Handler } from "./models";
import { Beer, DAO } from "../dao";

interface ParamBeerId {
  beerId: string;
}

export class ExpressHandler implements Handler {
  private _dao: DAO;

  constructor(dao: DAO) {
    this._dao = dao;
  }

  createBeer = (
    req: express.Request<{}, Beer, Beer>,
    res: express.Response
  ) => {
    let newBeer = req.body;
    newBeer = this._dao.createBeer(newBeer);

    res.json(newBeer);
  };

  deleteBeer = (req: express.Request, res: express.Response) => {
    const beerId = req.params["beerId"];
    const deleteCount = this._dao.deleteBeer(beerId);

    res.json({ deleteCount });
  };

  getBeer = (req: express.Request, res: express.Response) => {
    const beerId = req.params["beerId"];
    const beer = this._dao.getBeer(beerId);

    if (beer) {
      res.json(beer);
    } else {
      res.sendStatus(404);
    }
  };

  listBeers = (req: express.Request, res: express.Response) => {
    const beers = this._dao.listBeers();

    res.json(beers);
  };

  updateBeer = (req: express.Request, res: express.Response) => {
    const beerId = req.params["beerId"];
    let beer = req.body;
    beer = this._dao.updateBeer(beer, beerId);

    if (beer) {
      res.json(beer);
    } else {
      res.sendStatus(404);
    }
  };
}
