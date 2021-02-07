import { BeerShortInfo } from '@bw/types';
import { routes } from '../../constants';
import { BaseCustomElement } from '../base';
import { BwButton, BwButtonGroup } from '@bw/components/ui';

/**
 *
 * @param {Event} e
 */
const onCheer = (e: MouseEvent, beer: BeerShortInfo) => {
  e.preventDefault();
  console.log('Cheer!!!', beer);
};

/**
 *
 * @param {Event} e
 */
const onDrink = (e: MouseEvent, _: BeerShortInfo) => {
  e.preventDefault();
  console.log('Drink!!!');
};

const BW_BEER_GRID_ITEM = {
  ATTRS: {
    BEER_CHEERS: 'beer-cheers',
    BEER_DRUNK: 'beer-drunk',
    BEER_ID: 'beer-id',
    BEER_IMG: 'beer-img',
    BEER_NAME: 'beer-name',
  },
};

const { ATTRS } = BW_BEER_GRID_ITEM;

export interface BwBeerGridItemAttr {
  'beer-cheers'?: number;
  'beer-drunk'?: number;
  'beer-id'?: string;
  'beer-img'?: string;
  'beer-name'?: string;
}

export class BwBeerGridItem extends BaseCustomElement {
  _beer?: BeerShortInfo;

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor(beer?: BeerShortInfo) {
    super();

    this._beer = beer;
  }

  get styleFilePath() {
    return 'components/beers/_bw-beer-grid-item.scss';
  }

  // --------------------------------------------------------------------------
  //  Getters / Setters
  // --------------------------------------------------------------------------
  get beer(): BeerShortInfo | undefined {
    return this._beer;
  }

  set beer(beer: BeerShortInfo | undefined) {
    this._beer = beer;
  }

  get beerCheersCount(): string {
    return this._beer
      ? this._beer.cheersCount.toString()
      : this.getAttribute(ATTRS.BEER_CHEERS);
  }
  get beerDrunkCount(): string {
    return this._beer
      ? this._beer.drunkCount.toString()
      : this.getAttribute(ATTRS.BEER_DRUNK);
  }

  get beerId(): string {
    return this._beer
      ? this._beer.id.toString()
      : this.getAttribute(ATTRS.BEER_ID);
  }
  get beerImage(): string {
    return this._beer
      ? this._beer.mainPicture
      : this.getAttribute(ATTRS.BEER_NAME);
  }

  get beerName(): string {
    return this._beer ? this._beer.name : this.getAttribute(ATTRS.BEER_NAME);
  }
  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildChildren() {
    const root = document.createElement('bw-card');

    // --- Beers main info
    const img = document.createElement('img');
    img.alt = this.beerName;
    img.classList.add('beer-main-picture');
    img.src = this.beerImage;
    img.title = this.beerName;

    const name = document.createElement('div');
    name.classList.add('beer-name');
    name.textContent = this.beerName;

    // --- Beers actions
    const cheerBtn = new BwButton();
    cheerBtn.innerHTML = `${this.beerCheersCount}<br />Cheers`;
    const drinkBtn = new BwButton();
    drinkBtn.innerHTML = `${this.beerDrunkCount}<br />Drunk`;

    const actions = new BwButtonGroup();
    actions.appendChild(cheerBtn);
    actions.appendChild(drinkBtn);

    // --- Assemble
    const pouet = document.createElement('div');
    pouet.setAttribute(
      'style',
      'background-color: purple; height:100%; width: 100%; position:relative; overflow: hidden;'
    );
    pouet.appendChild(img);
    // name.setAttribute('slot', 'header');
    root.appendChild(pouet);
    root.appendChild(name);
    actions.setAttribute('slot', 'footer');
    root.appendChild(actions);

    return root;
  }
}
