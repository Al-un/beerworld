import { v4 } from "uuid";

import { Beer } from "../models";

export const generateMockBeerId = (beers: Beer[]): string => {
  const isIdExist = (id: string): boolean => beers.some((b) => b.id === id);

  let id = v4();
  while (isIdExist(id)) {
    id = v4();
  }

  return id;
};
