# SCSS<!-- omit in toc -->

- [Getting started](#getting-started)
  - [Open pages](#open-pages)
  - [Build experiements](#build-experiements)
- [Resources](#resources)
  - [CSS Methodology](#css-methodology)

This folder contains:

- Various SCSS experimentation under [\_experiements/](./experiments/) folder.
- Various SCSS+HTML testing under [\_pages/](./pages/). Some JavaScript code requires utility from [_utils/_](./utils) but is completely irrelevant from a styling point of view

## Getting started

### Open pages

```sh
npm install
npm start
```

Check out `http://localhost:8080` if not already opened in your browser.

Alternatively, if you only want to check the SCSS generated for pages, run

```sh
npm sass:pages
```

And check out _pages_output/_ folder

### Build experiements

```sh
npm install
npm sass:exp
```

Check out the folder _experiments_output_

## Resources

### CSS Methodology

- **BEM**:
  - http://getbem.com/
  - https://css-tricks.com/bem-101/
  - https://en.bem.info/methodology/quick-start/
- **OOCSS**:
  - https://www.keycdn.com/blog/oocss
  - https://www.benmarshall.me/oocss-object-oriented-css/
  - https://github.com/stubbornella/oocss
  - http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/
- **SMACSS**:
  - http://smacss.com/
  - https://vanseodesign.com/css/smacss-introduction/
- _Others_:
  - BEM + SMACSS + OOCSS: https://medium.com/free-code-camp/how-to-better-organize-your-css-architecture-with-oocss-bem-smacss-65e8a5c207c0
  - CSS Lint: http://csslint.net/
