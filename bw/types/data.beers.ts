import { Count, PrimaryKey, UrlLink } from "./aliases";

export interface Beer extends BeerShortInfo {
  brewer?: BrewerInfo;
  description: string[]; // one item = one paragraph
  pictures?: UrlLink[];
}

export interface BeerShortInfo {
  id: PrimaryKey;
  name: string;
  mainPicture: UrlLink; // Arbitrarily chosen among the picture gallery
  cheersCount: Count; // Cheers can be given by anybody
  drunkCount: Count; // Only registered users can drink a beer
}

export interface Brewer extends BrewerInfo {
  country: string;
}

export interface BrewerInfo {
  id: PrimaryKey;
  name: string;
}
