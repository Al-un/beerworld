import { BeerDAO, Beer } from "../models";

export const SequelizeBeerDAO: (beerModel: any) => BeerDAO = (beerModel) => {
  const dao: BeerDAO = {
    create: async (beer: Beer) => {
      console.log("ToCreate", beer);
      const createdBeer = (await beerModel.create(beer)) as Beer;
      return createdBeer;
    },

    delete: async (beerId: string) => {
      const deleteCount = await beerModel.destroy({
        where: { id: parseInt(beerId) },
      });
      return deleteCount as number;
    },

    get: async (beerId: string) => {
      const beers = (await beerModel.findAll({
        where: { id: parseInt(beerId) },
      })) as Beer[];

      return beers.length ? beers[0] : undefined;
    },

    list: async () => {
      const beers = beerModel.findAll() as Beer[];
      return beers;
    },

    update: async (beer: Beer, beerId: string) => {
      const updatedBeerCount = (await beerModel.update(beer, {
        where: { id: parseInt(beerId) },
      })) as Beer;

      return dao.get(beerId);
    },
  };

  return dao;
};
