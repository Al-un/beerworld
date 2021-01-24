export const addMenu = () => {
  const menu = document.createElement("nav");
  menu.id = "bw-css-menu";
  menu.classList.add("bw-css-menu");
  menu.innerHTML = `
  <a href="/">Home</a>
  <a href="/methodology/bem.html">Method: BEM</a>
  <a href="/methodology/oocss.html">Method: OOCSS</a>
  <a href="/methodology/smacss.html">Method: SMACSS</a>
`;

  const body = document.querySelector("body");
  body.prepend(menu);
};

/**
 * @typedef Beer
 * @property {String} id
 * @property {Number} cheersCount
 * @property {String} mainPicture
 * @property {String} name
 *
 * @returns {Beer[]} beers
 */
export const loadBeers = async () => {
  const data = await fetch(
    "https://raw.githubusercontent.com/Al-un/beerworld/media/mocks/beers.json"
  );
  const beers = await data.json();

  return beers;
};
