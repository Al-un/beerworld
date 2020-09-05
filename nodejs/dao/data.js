"use strict";

const uuid = require("uuid");

const beers = [
  { id: uuid.v4(), name: "Kilkenny", country: "ie" }, // https://www.beeradvocate.com/beer/profile/665/3628/
  { id: uuid.v4(), name: "Grimbergen", country: "be" }, // https://www.beeradvocate.com/beer/profile/436/7864/
  { id: uuid.v4(), name: "Tripel Karmeliet", country: "be" }, // https://www.beeradvocate.com/beer/profile/202/656/
  { id: uuid.v4(), name: "Goose IPA", country: "us" }, // https://www.beeradvocate.com/beer/profile/1146/3968/,
  { id: uuid.v4(), name: "Murphy's Irish Red", country: "ie" }, // https://www.beeradvocate.com/beer/profile/240/913/
];

const countries = [
  { code: "be" },
  { code: "de" },
  { code: "fr" },
  { code: "ie" },
  { code: "jp" },
  { code: "us" },
];

module.exports = {
  beers,
  countries,
};
