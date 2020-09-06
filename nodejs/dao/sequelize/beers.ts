import { BeerDAO, Beer } from "../models";

export const SequelizeBeerDAO: (beerModel: any) => BeerDAO = (beerModel) => {
  const dao: BeerDAO = {
    create: async (beer: Beer) => {
      const createdBeer = (await beerModel.create(beer)) as Beer;
      return createdBeer;
    },

    delete: async (beerId: string) => {
      const parsedId = parseInt(beerId);
      if (isNaN(parsedId)) {
        return 0;
      }

      const deleteCount = await beerModel.destroy({
        where: { id: parsedId },
      });
      return deleteCount as number;
    },

    get: async (beerId: string) => {
      const parsedId = parseInt(beerId);
      if (isNaN(parsedId)) {
        return undefined;
      }

      const beers = (await beerModel.findAll({
        where: { id: parsedId },
      })) as Beer[];

      return beers.length ? beers[0] : undefined;
    },

    list: async () => {
      const beers = beerModel.findAll() as Beer[];
      return beers;
    },

    update: async (beer: Beer, beerId: string) => {
      const parsedId = parseInt(beerId);
      if (isNaN(parsedId)) {
        return undefined;
      }

      const updatedBeerCount = (await beerModel.update(beer, {
        where: { id: parsedId },
      })) as Beer;

      return dao.get(beerId);
    },
  };

  return dao;
};
