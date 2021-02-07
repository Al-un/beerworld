import { BwInput } from './components';

declare interface BwDocument {
  createElement<K extends keyof BwHTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions
  ): BwHTMLElementTagNameMap[K];
}

interface BwHTMLElementTagNameMap {
  'bw-input': BwInput;
}

declare var document: BwDocument & Document;
