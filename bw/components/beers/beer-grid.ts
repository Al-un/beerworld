import { BeerShortInfo } from '@bw/types';
import { BaseCustomElement } from '../base';
import { BwBeerGridItem } from './beer-grid-item';

export class BwBeerGrid extends BaseCustomElement {
  _beers: BeerShortInfo[];

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor(beers: BeerShortInfo[] = []) {
    super();

    this._beers = beers;
  }

  get styleFilePath() {
    return 'components/beers/_bw-beer-grid.scss';
  }

  get beers(): BeerShortInfo[] {
    return this._beers;
  }

  set beers(beers: BeerShortInfo[]) {
    this._beers = beers;
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildChildren() {
    return this.beers ? this.beers.map((b) => new BwBeerGridItem(b)) : [];
  }
}
