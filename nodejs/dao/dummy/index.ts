import { DAO } from "../models";
import { DummyBeerDAO } from "./beers";

export const DummyDAO: DAO = {
  beer: DummyBeerDAO,
};
