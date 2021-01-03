import { APP_NAV_BACKDROP, APP_NAV_DRAWER } from "../utils";

/**
 * Toggle the drawer and the backdrop. Backdrop being displayed only on mobile
 * has to be guaranteed by CSS
 */
export const toggleBwMenu = () => {
  APP_NAV_BACKDROP.classList.toggle("opened");
  APP_NAV_DRAWER.classList.toggle("opened");
};

const onInit = () => {
  // --- Attach menu toggling event listener
  const toggler = document.querySelector("#bw-nav-menu-toggler");
  if (toggler) {
    toggler.addEventListener("click", toggleBwMenu);
  }

  APP_NAV_BACKDROP.addEventListener("click", toggleBwMenu);
};

onInit();
