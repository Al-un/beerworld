import { v4 } from "uuid";

import { Beer, Country } from "../models";

export let mockBeers: Beer[] = [
  { id: "aa-aa", name: "Kilkenny", country: "ie" }, // https://www.beeradvocate.com/beer/profile/665/3628/
  { id: "aa-bb", name: "Grimbergen", country: "be" }, // https://www.beeradvocate.com/beer/profile/436/7864/
  { id: "aa-cc", name: "Tripel Karmeliet", country: "be" }, // https://www.beeradvocate.com/beer/profile/202/656/
  { id: "aa-dd", name: "Goose IPA", country: "us" }, // https://www.beeradvocate.com/beer/profile/1146/3968/,
  { id: "aa-ee", name: "Murphy's Irish Red", country: "ie" }, // https://www.beeradvocate.com/beer/profile/240/913/
];

export let mockCountries: Country[] = ["be", "ie", "us"];

export const generateMockBeerId = (beers: Beer[]): string => {
  const isIdExist = (id: string): boolean => beers.some((b) => b.id === id);

  let id = v4();
  while (isIdExist(id)) {
    id = v4();
  }

  return id;
};
