import './styles/lib.scss';
import * as bwBeer from '@bw/components/beers';
import * as bwUi from '@bw/components/ui';
import * as bwUsers from '@bw/components/users';
import * as bwLayouts from '@bw/layouts';

customElements.define('bw-beer-display', bwBeer.BwBeerDisplay);
customElements.define('bw-beer-grid', bwBeer.BwBeerGrid);
customElements.define('bw-beer-grid-item', bwBeer.BwBeerGridItem);

customElements.define('bw-button-group', bwUi.BwButtonGroup);
customElements.define('bw-button', bwUi.BwButton);
customElements.define('bw-card', bwUi.BwCard);
customElements.define('bw-flex-spacer', bwUi.BwFlexSpacer);
customElements.define('bw-hamburger', bwUi.BwHamburger);
customElements.define('bw-input', bwUi.BwInput);

customElements.define('bw-login-form', bwUsers.BwLoginForm);

customElements.define('bw-app', bwLayouts.BwApp);
customElements.define('bw-nav-drawer', bwLayouts.BwNavDrawer);
