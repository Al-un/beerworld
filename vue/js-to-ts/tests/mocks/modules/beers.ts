import { Beer } from "@/models/beers";
import * as vuexModules from "@/store/module-definitions";
import BeerModule from "@/store/beers";

export type MockedBeerModule = {
  // In a real world, I would have a BeerModuleState interface
  beers: Beer[];
  loading: boolean;
  // In a real world, I would have a BeerModuleAction interface and do some
  //  { [ActionName in keyof BeerModuleAction]: jest.Mock }
  fetchBeers: jest.Mock;
};

export default (): MockedBeerModule => {
  /** Build mock module */
  const mockModule: MockedBeerModule = {
    // State
    beers: [],
    loading: false,
    // Actions
    fetchBeers: jest.fn(),
  };

  // Use Jest Spy to mock the channel module
  jest.spyOn(vuexModules, "beerModule").mockImplementation(() => {
    return mockModule as unknown as BeerModule;
  });

  // Return the mocked module for convenience
  return mockModule;
};
