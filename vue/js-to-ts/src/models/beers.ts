export interface Beer extends BeerShortInfo {
  brewer?: BrewerInfo;
  description: string[]; // one item = one paragraph
  pictures?: string[];
}

export interface BeerShortInfo {
  id: string | number;
  name: string;
  mainPicture: string; // Arbitrarily chosen among the picture gallery
  cheersCount: number; // Cheers can be given by anybody
  drunkCount: number; // Only registered users can drink a beer
}

export interface Brewer extends BrewerInfo {
  country: string;
}

export interface BrewerInfo {
  id: string | number;
  name: string;
}
