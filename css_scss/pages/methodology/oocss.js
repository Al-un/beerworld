import "./oocss.scss";
import { loadBeers } from "../../utils";

const printBeers = async () => {
  const beers = await loadBeers();

  // Generate beer items
  const beerItems = beers.map(
    (beer) => `
  <figure id="beer-item-${beer.id}" class="beer-item" onclick="toggleBeerItem(event, this)">
    <figcaption class="beer-item__name-area">
      <span class="beer-item__name-text">${beer.name}</span>
    </figcaption>
    <img class="beer-item__picture" src="${beer.mainPicture}" />
  </figure>
  `
  );

  // Concatenate all beer items and appends
  const beersGrid = document.querySelector("#beers-grid");
  beersGrid.classList.add("beers-grid");
  beersGrid.classList.add("bw-panel");
  beersGrid.classList.add("beers-grid--standard");
  beersGrid.innerHTML = beerItems.join("");
};

/**
 *
 * @param {Event} evt click event
 * @param {HTMLElement} self parent node triggering the event
 * @see https://www.codegrepper.com/search.php?answer_removed=1&q=get%20onclick%20target
 */
const toggleBeerItem = (evt, self) => {
  evt.preventDefault();
  self.classList.toggle("beer-item--selected");
};

// init
printBeers();
window.toggleBeerItem = toggleBeerItem;
document.querySelector("#beers-grid-toggler").onclick = () => {
  const beersGrid = document.querySelector("#beers-grid");
  beersGrid.classList.toggle("beers-grid--standard");
  beersGrid.classList.toggle("beers-grid--large");
};
