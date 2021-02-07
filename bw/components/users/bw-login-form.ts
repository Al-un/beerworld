import { BaseCustomElement } from '../base';
import { BwInput } from '../ui';

interface LoginData {
  login: string;
  password: string;
}

export class BwLoginForm extends BaseCustomElement {
  _loginInput?: BwInput;
  _passwordInput?: BwInput;

  // --------------------------------------------------------------------------
  //  Lifecycle
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }

  // --------------------------------------------------------------------------
  //  Getters / Setters
  // --------------------------------------------------------------------------
  get styleFilePath() {
    return 'components/users/_bw-login-form.scss';
  }

  // --------------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------------
  buildChildren() {
    const loginCard = document.createElement('bw-card');
    loginCard.setAttribute('padded', '');
    loginCard.setAttribute(
      'style-header',
      'background-color: var(--bw-primary);'
    );

    const header = document.createElement('div');
    header.classList.add('login-header');
    header.textContent = 'Login';
    header.slot = 'header';

    const loginInput = document.createElement('bw-input') as BwInput;
    loginInput.setAttribute('label', 'Login');
    const passwordInput = document.createElement('bw-input') as BwInput;
    passwordInput.setAttribute('label', 'Password');
    passwordInput.setAttribute('type', 'password');

    this._loginInput = loginInput;
    this._passwordInput = passwordInput;

    const loginCardActions = document.createElement('bw-button-group');
    const loginBtn = document.createElement('bw-button');
    loginBtn.textContent = 'Login';
    loginBtn.addEventListener('click', (ev) => {
      const login = this._loginInput ? this._loginInput.value : undefined;
      const password = this._passwordInput
        ? this._passwordInput.value
        : undefined;

      if (login && password) {
        this.dispatchEvent(
          new CustomEvent<LoginData>('login', {
            detail: { login, password },
          })
        );
      }
    });
    loginCardActions.appendChild(loginBtn);
    loginCardActions.slot = 'footer';

    loginCard.appendChild(header);
    loginCard.appendChild(loginInput);
    loginCard.appendChild(passwordInput);
    loginCard.appendChild(loginCardActions);

    return loginCard;
  }
}
