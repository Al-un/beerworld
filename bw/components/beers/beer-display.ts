import { BeerShortInfo } from '@bw/types';
import { BaseCustomElement } from '../base';
import { BwBeerGrid } from './beer-grid';

export interface BwBeerDisplayAttrs {
  description?: string;
  loading?: boolean;
  title?: string;
}

export class BwBeerDisplay extends BaseCustomElement {
  _beers: BeerShortInfo[];

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();

    this._beers = [];
  }

  get styleFilePath() {
    return 'components/beers/_bw-beer-display.scss';
  }

  attributeChangedCallback(a: any, b: any) {
    console.log('>>>>>>', a);
    console.log('>>>>>>', b);
  }
  static get observedAttributes() {
    return ['isLoading', 'beers'];
  }

  get beers() {
    return this._beers;
  }

  set beers(beers: BeerShortInfo[]) {
    this._beers = beers;

    const oldContent = this.querySelect('#content');
    const newContent = new BwBeerGrid(beers);
    newContent.setAttribute('id', 'content');
    if (this.shadowRoot) {
      this.shadowRoot.replaceChild(newContent, oldContent);
    }
  }

  get isLoading(): boolean {
    return this.hasAttribute('loading');
  }

  set isLoading(loading: boolean) {
    if (loading) {
      this.setAttribute('loading', '');

      const oldContent = this.querySelect('#content');
      const newContent = this.buildFromString(
        `<div id="content">LOADING....</div>`
      ) as HTMLElement;
      if (this.shadowRoot) {
        this.shadowRoot.replaceChild(newContent, oldContent);
      }
    } else {
      this.removeAttribute('loading');

      const oldContent = this.querySelect('#content');
      const newContent = new BwBeerGrid(this.beers);
      newContent.setAttribute('id', 'content');
      if (this.shadowRoot) {
        this.shadowRoot.replaceChild(newContent, oldContent);
      }
    }
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildChildren() {
    let elements: HTMLElement[] = [];

    if (this.hasAttribute('title')) {
      elements = [
        ...elements,
        this.buildFromString(
          `<div class="title">${this.getAttribute('title')}<div>`
        ) as HTMLElement,
      ];
    }
    if (this.hasAttribute('description')) {
      elements = [
        ...elements,
        this.buildFromString(
          `<div class="desc">${this.getAttribute('description')}<div>`
        ) as HTMLElement,
      ];
    }

    let content: HTMLElement;

    if (this.isLoading) {
      content = this.buildFromString(
        `<div id="content">LOADING.....<div>`
      ) as HTMLElement;
    } else if (this._beers.length) {
      content = new BwBeerGrid(this._beers);
      content.setAttribute('id', 'content');
    } else {
      content = this.buildFromString(
        `<div id="content">NO BEERS T_T<div>`
      ) as HTMLElement;
    }

    elements = [...elements, content];

    return elements;
  }
}
